(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const views = { home: $("#home"), study: $("#study"), quiz: $("#quiz") };
  const store = {
    get(k, d) { try { const v = localStorage.getItem("tiro:" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("tiro:" + k, JSON.stringify(v)); } catch {} },
  };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const chap = (id) => CHAPTERS.find((c) => c.id === id);
  const chIdx = (id) => CHAPTERS.findIndex((c) => c.id === id);
  const TOTAL = CHAPTERS.reduce((s, c) => s + c.slides.length, 0);
  const seenSet = () => new Set(store.get("seen2", []));
  const chapterQs = (id) => QUESTIONS.filter((q) => q.m === id);

  // ---------- roteamento ----------
  function route() {
    const [page, a, b] = location.hash.replace(/^#\/?/, "").split("/");
    Object.values(views).forEach((v) => (v.hidden = true));
    clearInterval(timerId); stopBreath();
    if (page === "estudar") {
      views.study.hidden = false;
      if (a && chap(a)) b === "checkpoint" ? showCheckpoint(a) : showSlide(a, Math.max(1, +b || 1) - 1);
      else showGrid();
    } else if (page === "simulado") { views.quiz.hidden = false; quizIntro(a); }
    else { views.home.hidden = false; renderHome(); }
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (a && a.getAttribute("href") === location.hash) { e.preventDefault(); route(); }
  });

  // ---------- home ----------
  function renderHome() {
    const pct = Math.round((seenSet().size / TOTAL) * 100);
    $("#studyBar").style.width = pct + "%";
    $("#studyMeta").textContent = pct ? `${pct}% concluído · continuar` : `${CHAPTERS.length} capítulos interativos`;
    const best = store.get("best", null);
    $("#quizMeta").textContent = best != null ? `Melhor nota: ${best}/20 · tentar de novo` : `20 questões no formato da PF`;
  }

  // ---------- estudar: capítulos ----------
  function setTop(title, count, prog) {
    $("#modName").textContent = title;
    $("#slideCount").textContent = count || "";
    $("#slideProg").style.width = (prog || 0) + "%";
  }

  function showGrid() {
    const seen = seenSet(), checks = store.get("checks", {});
    setTop("Capítulos", `${Math.round((seen.size / TOTAL) * 100)}%`, (seen.size / TOTAL) * 100);
    $("#backBtn").href = "#/";
    $("#pager").hidden = true;
    const cards = CHAPTERS.map((c, i) => {
      const done = c.slides.filter((_, k) => seen.has(`${c.id}:${k}`)).length;
      const pct = done / c.slides.length;
      const nq = chapterQs(c.id).length;
      const ck = checks[c.id];
      return `<a class="ch-card ${pct === 1 ? "done" : ""}" href="#/estudar/${c.id}/1" style="--p:${pct}">
        <span class="ch-ring"><span>${c.icon}</span></span>
        <span class="ch-txt"><small>Capítulo ${pad(i)}</small><b>${c.title}</b><em>${c.sub}</em></span>
        <span class="ch-meta">${c.slides.length} aulas${nq ? ` · ${nq} questões` : ""}${ck != null ? ` · checkpoint ${ck}/3` : ""}</span>
      </a>`;
    }).join("");
    $("#stage").innerHTML = `<div class="grid-head"><p class="kicker">Estudar</p><h2>Escolha o capítulo</h2>
      <p>Siga em ordem ou vá direto ao que precisa revisar. O anel mostra quanto você já viu.</p></div>
      <div class="ch-grid">${cards}</div>`;
  }

  let cur = { id: null, i: 0 };
  function showSlide(id, i) {
    const c = chap(id); i = Math.min(i, c.slides.length - 1);
    const back = cur.id === id && i < cur.i;
    cur = { id, i };
    $("#stage").onclick = null;
    const s = c.slides[i];
    const seen = seenSet(); seen.add(`${id}:${i}`); store.set("seen2", [...seen]);
    const n = chIdx(id);
    setTop(`${pad(n)} · ${c.title}`, `${i + 1} / ${c.slides.length}`, ((i + 1) / c.slides.length) * 100);
    $("#backBtn").href = "#/estudar";
    $("#pager").hidden = false;

    const imgs = [s.img, s.imgB].filter(Boolean).map((src) => `<figure class="media ${s.imgClass || ""}"><img src="${src}" alt="" loading="lazy"></figure>`).join("");
    const tip = s.tip ? `<div class="tip"><img src="img/logo.webp" alt=""><div><b>Dica do Léo</b><p>${s.tip}</p></div></div>` : "";
    const end = s.end ? `<div class="mod-cta"><a class="btn primary" href="#/simulado">Fazer o simulado agora →</a></div>` : "";
    const w = s.widget ? `<div class="widget">${renderWidget(s.widget)}</div>` : "";
    $("#stage").innerHTML = `<div class="slide ${imgs ? "has-img" : ""} ${back ? "back" : ""}">
      <div class="slide-main"><p class="kicker">${s.kicker}</p><h2>${s.title}</h2>${s.body}${w}${tip}${end}</div>
      ${imgs ? `<div class="slide-media">${imgs}</div>` : ""}</div>`;
    bindWidget(s.widget);

    const last = i === c.slides.length - 1, hasCk = chapterQs(id).length >= 3;
    const next = CHAPTERS[n + 1];
    $("#prevBtn").disabled = n === 0 && i === 0;
    $("#nextBtn").textContent = !last ? "Próximo →" : hasCk ? "Checkpoint 🎯" : next ? `Cap. ${pad(n + 1)} →` : "Ir para o simulado →";
  }

  function nextHref() {
    const c = chap(cur.id), n = chIdx(cur.id);
    if (location.hash.endsWith("/checkpoint")) return CHAPTERS[n + 1] ? `#/estudar/${CHAPTERS[n + 1].id}/1` : "#/simulado";
    if (cur.i < c.slides.length - 1) return `#/estudar/${cur.id}/${cur.i + 2}`;
    if (chapterQs(cur.id).length >= 3) return `#/estudar/${cur.id}/checkpoint`;
    return CHAPTERS[n + 1] ? `#/estudar/${CHAPTERS[n + 1].id}/1` : "#/simulado";
  }
  function prevHref() {
    const n = chIdx(cur.id);
    if (location.hash.endsWith("/checkpoint")) return `#/estudar/${cur.id}/${chap(cur.id).slides.length}`;
    if (cur.i > 0) return `#/estudar/${cur.id}/${cur.i}`;
    const p = CHAPTERS[n - 1];
    return p ? `#/estudar/${p.id}/${p.slides.length}` : "#/estudar";
  }
  $("#prevBtn").onclick = () => (location.hash = prevHref());
  $("#nextBtn").onclick = () => (location.hash = nextHref());
  document.addEventListener("keydown", (e) => {
    if (views.study.hidden || $("#pager").hidden || e.target.closest("input,textarea,button")) return;
    if (e.key === "ArrowRight") $("#nextBtn").click();
    if (e.key === "ArrowLeft" && !$("#prevBtn").disabled) $("#prevBtn").click();
  });
  let tx = null;
  $("#stage").addEventListener("touchstart", (e) => { tx = e.target.closest(".widget, input") ? null : e.touches[0].clientX; }, { passive: true });
  $("#stage").addEventListener("touchend", (e) => {
    if (tx == null || $("#pager").hidden) return; const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 70) (dx < 0 ? $("#nextBtn") : $("#prevBtn")).click();
  });

  // ---------- widgets ----------
  function renderWidget(w) {
    switch (w.type) {
      case "flip":
        return `<div class="flips">${w.cards.map(([f, b]) => `<button class="flip"><span class="face front"><span>${f}<i>toque para virar</i></span></span><span class="face back"><span>${b}</span></span></button>`).join("")}</div>`;
      case "tf":
        return `<div class="tfs">${w.items.map(([t], k) => `<div class="tf" data-k="${k}"><p>${t}</p>
          <div class="tf-btns"><button data-v="1">${w.yes || "Certo"}</button><button data-v="0">${w.no || "Errado"}</button></div><div class="tf-fb"></div></div>`).join("")}</div>`;
      case "choice":
        return `<div class="mini"><p class="mini-q">${w.q}</p><div class="opts">${shuffle(w.o.map((t, k) => [t, k === 0])).map(([t, ok]) => `<button class="opt" data-ok="${ok ? 1 : 0}">${esc(t)}</button>`).join("")}</div><div class="mini-fb"></div></div>`;
      case "order":
        return `<div class="order"><p class="mini-q">${w.prompt || "Toque na ordem certa:"}</p>
          <ol class="order-done"></ol><div class="order-pool">${shuffle(w.items.map((t, k) => [t, k])).map(([t, k]) => `<button data-k="${k}">${t}</button>`).join("")}</div>
          <div class="mini-fb"></div><button class="link-btn order-reset" hidden>↺ Recomeçar</button></div>`;
      case "steps":
        return `<div class="steps"><div class="step-dots">${w.steps.map((_, k) => `<span data-k="${k}"></span>`).join("")}</div>
          <div class="step-card"></div><div class="step-nav"><button class="btn" data-d="-1">←</button><button class="btn primary" data-d="1">Próxima etapa →</button></div></div>`;
      case "sight":
        return `<div class="sight"><svg viewBox="0 0 300 170" aria-label="Simulador de visada">
            <circle cx="150" cy="62" r="46" class="tgt"/><circle cx="150" cy="62" r="28" class="tgt"/><circle cx="150" cy="62" r="10" class="tgt c"/>
            <rect class="post" id="sFront" x="143" y="60" width="14" height="110" rx="2"/>
            <path class="rear" d="M20 70 H126 V170 H20 Z M174 70 H280 V170 H174 Z"/>
          </svg>
          <label>Massa ↔ <input type="range" id="sX" min="-40" max="40" value="22"></label>
          <label>Massa ↕ <input type="range" id="sY" min="-30" max="30" value="-18"></label>
          <p class="sight-msg">Desalinhado: ajuste a massa.</p></div>`;
      case "breath":
        return `<div class="breath"><div class="lung"><span id="bLabel">Pronto?</span></div><button class="btn primary" id="bGo">Iniciar treino</button></div>`;
    }
    return "";
  }

  function bindWidget(w) {
    if (!w) return;
    const root = $(".widget");
    if (w.type === "flip") $$(".flip", root).forEach((b) => (b.onclick = () => b.classList.toggle("on")));
    if (w.type === "tf") root.onclick = (e) => {
      const b = e.target.closest("[data-v]"); if (!b) return;
      const box = b.closest(".tf"), [, ans, ex] = w.items[+box.dataset.k], ok = (b.dataset.v === "1") === ans;
      $$("button", box).forEach((x) => (x.disabled = true));
      b.classList.add(ok ? "ok" : "no"); box.classList.add(ok ? "good" : "bad");
      $(".tf-fb", box).innerHTML = `<b>${ok ? pick(JOKES.right) : pick(JOKES.wrong)}</b> ${ex}`;
    };
    if (w.type === "choice") root.onclick = (e) => {
      const b = e.target.closest(".opt"); if (!b || b.disabled) return;
      const ok = b.dataset.ok === "1";
      $$(".opt", root).forEach((x) => { x.disabled = true; if (x.dataset.ok === "1") x.classList.add("ok"); });
      if (!ok) b.classList.add("no");
      $(".mini-fb", root).innerHTML = `<div class="fb ${ok ? "good" : "bad"}"><b>${pick(ok ? JOKES.right : JOKES.wrong)}</b><p>${w.e}</p></div>`;
    };
    if (w.type === "order") {
      let next = 0;
      root.onclick = (e) => {
        if (e.target.closest(".order-reset")) { $(".widget").innerHTML = renderWidget(w); return bindWidget(w); }
        const b = e.target.closest(".order-pool button"); if (!b) return;
        if (+b.dataset.k === next) {
          $(".order-done", root).insertAdjacentHTML("beforeend", `<li>${b.textContent}</li>`); b.remove(); next++;
          if (next === w.items.length) $(".mini-fb", root).innerHTML = `<div class="fb good"><b>${pick(JOKES.right)}</b><p>Sequência perfeita.</p></div>`;
        } else {
          b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake");
          $(".mini-fb", root).innerHTML = `<p class="hint">Ainda não é esse. Pense no que vem antes.</p>`;
          $(".order-reset", root).hidden = false;
        }
      };
    }
    if (w.type === "steps") {
      let k = 0;
      const draw = () => {
        $(".step-card", root).innerHTML = `<small>Etapa ${k + 1} de ${w.steps.length}</small><b>${w.steps[k][0]}</b><p>${w.steps[k][1]}</p>`;
        $$(".step-dots span", root).forEach((d, j) => d.classList.toggle("on", j <= k));
        $('[data-d="-1"]', root).disabled = k === 0;
        $('[data-d="1"]', root).textContent = k === w.steps.length - 1 ? "Recomeçar ↺" : "Próxima etapa →";
      };
      root.onclick = (e) => {
        const b = e.target.closest("[data-d]"); if (!b) return;
        k = k === w.steps.length - 1 && b.dataset.d === "1" ? 0 : Math.max(0, k + +b.dataset.d); draw();
      };
      draw();
    }
    if (w.type === "sight") {
      const upd = () => {
        const x = +$("#sX").value, y = +$("#sY").value;
        $("#sFront").setAttribute("transform", `translate(${x} ${y})`);
        const okX = Math.abs(x) <= 3, okY = Math.abs(y) <= 3;
        const msg = okX && okY ? "✅ Visada perfeita! Massa centralizada e topos nivelados."
          : !okX ? "Massa fora do centro da alça: o tiro vai para o lado." : y < 0 ? "Massa acima da alça: o tiro sobe." : "Massa abaixo da alça: o tiro cai.";
        const m = $(".sight-msg", root); m.textContent = msg; m.classList.toggle("ok", okX && okY);
      };
      $("#sX").oninput = $("#sY").oninput = upd; upd();
    }
    if (w.type === "breath") $("#bGo").onclick = startBreath;
  }

  let breathT = null;
  function stopBreath() { clearTimeout(breathT); breathT = null; }
  function startBreath() {
    const lung = $(".lung"), label = $("#bLabel");
    const seq = [["Inspira…", "in", 3000], ["Expira…", "out", 3000], ["Inspira…", "in", 3000], ["Solta metade…", "half", 2000], ["Pausa (apneia)", "hold", 1500], ["Aciona o gatilho 🎯", "fire", 1500]];
    let k = 0; stopBreath(); $("#bGo").textContent = "Repetir";
    const step = () => {
      if (!lung.isConnected) return;
      const [t, cls, ms] = seq[k];
      lung.className = "lung " + cls; label.textContent = t;
      if (++k < seq.length) breathT = setTimeout(step, ms);
      else breathT = setTimeout(() => { label.textContent = "Isso! Treine até ficar natural."; lung.className = "lung"; }, ms);
    };
    step();
  }

  // ---------- checkpoint por capítulo ----------
  function showCheckpoint(id) {
    const c = chap(id), n = chIdx(id);
    cur = { id, i: c.slides.length };
    setTop(`${pad(n)} · ${c.title}`, "Checkpoint", 100);
    $("#backBtn").href = "#/estudar";
    $("#pager").hidden = false;
    $("#prevBtn").disabled = false;
    $("#nextBtn").textContent = CHAPTERS[n + 1] ? `Cap. ${pad(n + 1)} →` : "Ir para o simulado →";
    const qs = shuffle(chapterQs(id)).slice(0, 3).map((q) => ({ ...q, opts: shuffle(q.o.map((t, k) => ({ t, ok: k === 0 }))) }));
    let hits = 0, answered = 0;
    $("#stage").innerHTML = `<div class="checkpoint"><p class="kicker">Checkpoint · ${c.title}</p><h2>3 perguntas no estilo da prova</h2>
      ${qs.map((q, i) => `<div class="mini ck" data-i="${i}"><span class="q-tag">${CATS[q.c].name}</span><p class="mini-q">${i + 1}. ${esc(q.q)}</p>
        <div class="opts">${q.opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(o.t)}</button>`).join("")}</div><div class="mini-fb"></div></div>`).join("")}
      <div class="ck-result"></div></div>`;
    $("#stage").onclick = (e) => {
      const b = e.target.closest(".ck .opt"); if (!b || b.disabled) return;
      const box = b.closest(".ck"), q = qs[+box.dataset.i], ok = q.opts[+b.dataset.k].ok;
      $$(".opt", box).forEach((x, k) => { x.disabled = true; if (q.opts[k].ok) x.classList.add("ok"); });
      if (!ok) b.classList.add("no");
      $(".mini-fb", box).innerHTML = `<div class="fb ${ok ? "good" : "bad"}"><b>${pick(ok ? JOKES.right : JOKES.wrong)}</b><p>${esc(q.e)}</p></div>`;
      hits += ok; answered++;
      if (answered === qs.length) {
        const checks = store.get("checks", {}); checks[id] = Math.max(checks[id] || 0, hits); store.set("checks", checks);
        $(".ck-result").innerHTML = `<div class="ck-score"><b>${hits}/3</b><span>${hits === 3 ? "Capítulo dominado! 🏆" : hits === 2 ? "Bom! Revise o que errou." : "Vale reler o capítulo."}</span>
          <a class="btn" href="#/estudar/${id}/checkpoint">Outras 3 perguntas ↺</a></div>`;
      }
    };
  }

  // ---------- simulado ----------
  let Q = null, timerId = null;
  const L = "ABCD";

  function quizIntro(cat) {
    $("#quizTitle").textContent = "Simulado";
    $("#quizCount").textContent = "";
    $("#quizProg").style.width = "0";
    if (cat && CATS[cat]) return startQuiz("treino", cat);
    const best = store.get("best", null);
    $("#quizBody").innerHTML = `<div class="q-intro">
      <p class="kicker">Hora da verdade</p>
      <h2>Pronto pra linha de tiro?</h2>
      <p>${QUESTIONS.length} questões tiradas de todos os capítulos do curso, montadas no formato da prova teórica da Polícia Federal. Escolha como quer treinar:</p>
      <div class="modes">
        <button class="mode" data-mode="prova"><span class="big">20</span><span><b>Prova oficial</b><small>6 de segurança · 6 de nomenclatura · 3 de estande · 5 de legislação. Correção só no final, como na prova. Precisa de 60%.</small></span></button>
        <button class="mode" data-mode="treino"><span class="big">⚡</span><span><b>Treino rápido</b><small>10 questões sortidas com correção na hora, explicação e uma piadinha do Léo.</small></span></button>
      </div>
      <p class="kicker" style="margin:26px 0 12px">Ou treine por tema</p>
      <div class="chips">${Object.entries(CATS).map(([k, c]) => `<button class="chip" data-cat="${k}">${c.name} (${QUESTIONS.filter((q) => q.c === k).length})</button>`).join("")}</div>
      ${best != null ? `<p class="best">Sua melhor nota na prova oficial: <b>${best}/20</b></p>` : ""}
    </div>`;
    $("#quizBody").onclick = (e) => {
      const m = e.target.closest("[data-mode]"), c = e.target.closest("[data-cat]");
      if (m) startQuiz(m.dataset.mode);
      if (c) location.hash = `#/simulado/${c.dataset.cat}`;
    };
  }

  function startQuiz(mode, cat) {
    let list;
    if (mode === "prova") list = shuffle(Object.entries(CATS).flatMap(([k, c]) => shuffle(QUESTIONS.filter((q) => q.c === k)).slice(0, c.n)));
    else if (cat) list = shuffle(QUESTIONS.filter((q) => q.c === cat));
    else list = shuffle(QUESTIONS).slice(0, 10);
    Q = { mode, cat, i: 0, start: Date.now(), items: list.map((q) => ({ ...q, opts: shuffle(q.o.map((t, k) => ({ t, ok: k === 0 }))), ans: null })) };
    $("#quizTitle").textContent = mode === "prova" ? "Prova oficial" : cat ? `Treino · ${CATS[cat].name}` : "Treino rápido";
    clearInterval(timerId);
    timerId = setInterval(() => { const t = $(".timer"); if (t) t.textContent = "⏱ " + clock(); }, 1000);
    renderQ();
  }
  const clock = () => { const s = Math.floor((Date.now() - Q.start) / 1000); return `${Math.floor(s / 60)}:${pad(s % 60)}`; };

  function renderQ() {
    const it = Q.items[Q.i], n = Q.items.length, instant = Q.mode !== "prova", answered = it.ans != null;
    $("#quizCount").textContent = `${Q.i + 1} / ${n}`;
    $("#quizProg").style.width = (Q.i / n) * 100 + "%";
    const opts = it.opts.map((o, k) => {
      let cls = "";
      if (answered && instant) cls = o.ok ? "ok" : k === it.ans ? "no" : "";
      else if (k === it.ans) cls = "sel";
      return `<button class="opt ${cls}" data-k="${k}" ${answered && instant ? "disabled" : ""}><span class="l">${L[k]}</span>${esc(o.t)}</button>`;
    }).join("");
    const fb = answered && instant ? (() => { const g = it.opts[it.ans].ok; return `<div class="fb ${g ? "good" : "bad"}"><b>${pick(g ? JOKES.right : JOKES.wrong)}</b><p>${esc(it.e)}</p></div>`; })() : "";
    const lastQ = Q.i === n - 1;
    $("#quizBody").innerHTML = `<div class="q">
      <span class="q-tag">${CATS[it.c].name}</span>
      <p class="q-text">${esc(it.q)}</p>
      <div class="opts">${opts}</div>${fb}
      <div class="q-actions">
        <span class="timer">⏱ ${clock()}</span>
        <span>${Q.mode === "prova" && Q.i > 0 ? `<button class="btn" data-act="prev">← Voltar</button> ` : ""}
        <button class="btn primary" data-act="next" ${answered ? "" : "disabled"}>${lastQ ? "Ver resultado" : "Próxima →"}</button></span>
      </div></div>`;
    $("#quizBody").onclick = (e) => {
      const o = e.target.closest(".opt"), a = e.target.closest("[data-act]");
      if (o && !o.disabled) { it.ans = +o.dataset.k; renderQ(); }
      if (a && !a.disabled) {
        if (a.dataset.act === "prev") { Q.i--; renderQ(); }
        else if (it.ans != null) { if (lastQ) finish(); else { Q.i++; renderQ(); } }
      }
    };
  }

  function finish() {
    clearInterval(timerId);
    const n = Q.items.length, hits = Q.items.filter((q) => q.opts[q.ans].ok).length;
    const pct = hits / n, pass = pct >= 0.6, time = clock();
    if (Q.mode === "prova") store.set("best", Math.max(store.get("best", 0), hits));
    const C = 2 * Math.PI * 88, F = JOKES.result.fail;
    const joke = pct >= 0.9 ? pick(JOKES.result.great) : pass ? pick(JOKES.result.pass) : F[pct >= 0.45 ? 1 : 0];
    const byCat = Object.keys(CATS).map((k) => {
      const qs = Q.items.filter((q) => q.c === k); if (!qs.length) return "";
      return `<div><b>${qs.filter((q) => q.opts[q.ans].ok).length}/${qs.length}</b><span>${CATS[k].name}</span></div>`;
    }).join("");
    const wrong = Q.items.filter((q) => !q.opts[q.ans].ok);
    const review = wrong.length ? `<div class="review"><h3>Revise o que errou</h3>${wrong.map((q) => `<div class="item">
        <p class="q">${esc(q.q)}</p>
        <p class="yours">✗ Sua resposta: ${esc(q.opts[q.ans].t)}</p>
        <p class="right">✓ Correta: ${esc(q.o[0])}</p>
        <p>${esc(q.e)}</p>
        <a class="link-btn" href="#/estudar/${q.m}/1">Rever o capítulo: ${chap(q.m).title} →</a></div>`).join("")}</div>` : `<p class="joke">Nenhum erro. Respeito. 🫡</p>`;

    $("#quizProg").style.width = "100%";
    $("#quizCount").textContent = "";
    $("#quizBody").innerHTML = `<div class="result">
      <div class="score ${pass ? "pass" : "fail"}"><svg viewBox="0 0 200 200"><circle class="track" cx="100" cy="100" r="88"/><circle class="val" cx="100" cy="100" r="88" stroke-dasharray="${C}" stroke-dashoffset="${C}"/></svg>
        <div class="num"><b>${hits}/${n}</b><span>${Math.round(pct * 100)}% · ${time}</span></div></div>
      <p class="verdict ${pass ? "pass" : "fail"}">${pass ? "Aprovado(a)!" : "Reprovado(a)"}</p>
      <p class="joke">${joke}${Q.mode === "prova" ? "" : " (Mínimo para passar na prova: 60%.)"}</p>
      <div class="res-actions">
        <button class="btn primary" data-act="again">Refazer</button>
        <a class="btn" href="#/simulado">Outro simulado</a>
        <a class="btn" href="#/estudar">Revisar o curso</a>
      </div>
      ${Q.mode === "prova" || !Q.cat ? `<div class="breakdown">${byCat}</div>` : ""}
      ${review}</div>`;
    requestAnimationFrame(() => requestAnimationFrame(() => { $(".score .val").style.strokeDashoffset = C * (1 - pct); }));
    $("#quizBody").onclick = (e) => { if (e.target.closest("[data-act=again]")) startQuiz(Q.mode, Q.cat); };
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  route();
})();
