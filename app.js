(() => {
  const $ = (s) => document.querySelector(s);
  const views = { home: $("#home"), study: $("#study"), quiz: $("#quiz") };
  const store = {
    get(k, d) { try { const v = localStorage.getItem("tiro:" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("tiro:" + k, JSON.stringify(v)); } catch {} },
  };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- roteamento ----------
  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    const [page, arg] = h.split("/");
    Object.values(views).forEach((v) => (v.hidden = true));
    $("#drawer").hidden = true;
    if (page === "estudar") { views.study.hidden = false; showSlide(arg ? +arg - 1 : store.get("slide", 0), 0); }
    else if (page === "simulado") { views.quiz.hidden = false; quizIntro(arg); }
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
    const seen = store.get("seen", []);
    const pct = Math.round((seen.length / SLIDES.length) * 100);
    $("#studyBar").style.width = pct + "%";
    $("#studyMeta").textContent = pct ? `${pct}% concluído · continuar` : `${MODULES.length} módulos · ${SLIDES.length} aulas`;
    const best = store.get("best", null);
    $("#quizMeta").textContent = best != null ? `Melhor nota: ${best}/20 · tentar de novo` : "20 questões no formato da PF";
  }

  // ---------- estudar ----------
  let cur = 0;
  const modIndex = (id) => MODULES.findIndex((m) => m.id === id);
  const firstSlideOf = (id) => SLIDES.findIndex((s) => s.mod === id);

  function buildDrawer() {
    const seen = new Set(store.get("seen", []));
    $("#modList").innerHTML = MODULES.map((m, i) => {
      const idx = SLIDES.map((s, k) => (s.mod === m.id ? k : -1)).filter((k) => k >= 0);
      const done = idx.every((k) => seen.has(k));
      const on = SLIDES[cur].mod === m.id;
      return `<li><button data-mod="${m.id}" class="${on ? "on" : ""} ${done ? "done" : ""}"><span class="n">${String(i + 1).padStart(2, "0")}</span>${m.name}</button></li>`;
    }).join("");
  }
  $("#modToggle").onclick = () => {
    const d = $("#drawer"); d.hidden = !d.hidden;
    $("#modToggle").setAttribute("aria-expanded", String(!d.hidden));
    if (!d.hidden) buildDrawer();
  };
  $("#modList").onclick = (e) => {
    const b = e.target.closest("button[data-mod]"); if (!b) return;
    $("#drawer").hidden = true; go(firstSlideOf(b.dataset.mod));
  };
  document.addEventListener("click", (e) => {
    if (!$("#drawer").hidden && !e.target.closest("#drawer,#modToggle")) $("#drawer").hidden = true;
  });

  function go(i) { location.hash = `#/estudar/${i + 1}`; }

  function showSlide(i, dir = 1) {
    i = Math.max(0, Math.min(SLIDES.length - 1, i || 0));
    dir = i < cur ? -1 : dir; cur = i;
    const s = SLIDES[i], m = MODULES[modIndex(s.mod)];
    const seen = new Set(store.get("seen", [])); seen.add(i); store.set("seen", [...seen]); store.set("slide", i);

    const last = i === SLIDES.length - 1 || SLIDES[i + 1].mod !== s.mod;
    const cta = last && m.cat
      ? `<div class="mod-cta"><a class="btn primary" href="#/simulado/${m.cat}">🎯 Treinar: ${CATS[m.cat].name}</a></div>` : "";
    const end = s.end ? `<div class="mod-cta"><a class="btn primary" href="#/simulado">Fazer o simulado agora →</a></div>` : "";
    const img = s.img ? `<figure class="media ${s.imgClass || ""}"><img src="${s.img}" alt="" loading="lazy"></figure>` : "";
    const tip = s.tip ? `<div class="tip"><img src="img/logo.webp" alt=""><div><b>Dica do Léo</b><p>${s.tip}</p></div></div>` : "";

    $("#stage").innerHTML = `<div class="slide ${s.img ? "has-img" : ""} ${dir < 0 ? "back" : ""}">
      <div><p class="kicker">${s.kicker}</p><h2>${s.title}</h2>${s.body}${tip}${cta}${end}</div>${img}</div>`;
    $("#modName").textContent = `${String(modIndex(s.mod) + 1).padStart(2, "0")} · ${m.name}`;
    $("#slideCount").textContent = `${i + 1} / ${SLIDES.length}`;
    $("#slideProg").style.width = ((i + 1) / SLIDES.length) * 100 + "%";
    $("#prevBtn").disabled = i === 0;
    $("#nextBtn").textContent = i === SLIDES.length - 1 ? "Ir para o simulado →" : "Próximo →";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  $("#prevBtn").onclick = () => cur > 0 && go(cur - 1);
  $("#nextBtn").onclick = () => (cur < SLIDES.length - 1 ? go(cur + 1) : (location.hash = "#/simulado"));

  document.addEventListener("keydown", (e) => {
    if (views.study.hidden || e.target.closest("input,textarea")) return;
    if (e.key === "ArrowRight") $("#nextBtn").click();
    if (e.key === "ArrowLeft") $("#prevBtn").click();
    if (e.key === "Escape") $("#drawer").hidden = true;
  });
  let tx = null;
  $("#stage").addEventListener("touchstart", (e) => (tx = e.touches[0].clientX), { passive: true });
  $("#stage").addEventListener("touchend", (e) => {
    if (tx == null) return; const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 70) (dx < 0 ? $("#nextBtn") : $("#prevBtn")).click();
  });

  // ---------- simulado ----------
  let Q = null, timerId = null;
  const L = "ABCD";

  function quizIntro(cat) {
    clearInterval(timerId);
    $("#quizTitle").textContent = "Simulado";
    $("#quizCount").textContent = "";
    $("#quizProg").style.width = "0";
    if (cat && CATS[cat]) return startQuiz("treino", cat);
    const best = store.get("best", null);
    $("#quizBody").innerHTML = `<div class="q-intro">
      <p class="kicker">Hora da verdade</p>
      <h2>Pronto pra linha de tiro?</h2>
      <p>Questões tiradas do curso e montadas no formato da prova teórica da Polícia Federal. Escolha como quer treinar:</p>
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
    if (mode === "prova") list = Object.entries(CATS).flatMap(([k, c]) => shuffle(QUESTIONS.filter((q) => q.c === k)).slice(0, c.n));
    else if (cat) list = shuffle(QUESTIONS.filter((q) => q.c === cat));
    else list = shuffle(QUESTIONS).slice(0, 10);
    if (mode === "prova") list = shuffle(list);
    Q = {
      mode, cat, i: 0, start: Date.now(),
      items: list.map((q) => { const opts = shuffle(q.o.map((t, k) => ({ t, ok: k === 0 }))); return { ...q, opts, ans: null }; }),
    };
    $("#quizTitle").textContent = mode === "prova" ? "Prova oficial" : cat ? `Treino · ${CATS[cat].name}` : "Treino rápido";
    clearInterval(timerId);
    timerId = setInterval(() => { const t = $(".timer"); if (t) t.textContent = "⏱ " + clock(); }, 1000);
    renderQ();
  }
  const clock = () => { const s = Math.floor((Date.now() - Q.start) / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };

  function renderQ() {
    const it = Q.items[Q.i], n = Q.items.length, instant = Q.mode !== "prova";
    $("#quizCount").textContent = `${Q.i + 1} / ${n}`;
    $("#quizProg").style.width = (Q.i / n) * 100 + "%";
    const answered = it.ans != null;
    const opts = it.opts.map((o, k) => {
      let cls = "";
      if (answered && instant) cls = o.ok ? "ok" : k === it.ans ? "no" : "";
      else if (k === it.ans) cls = "sel";
      return `<button class="opt ${cls}" data-k="${k}" ${answered && instant ? "disabled" : ""}><span class="l">${L[k]}</span>${esc(o.t)}</button>`;
    }).join("");
    let fb = "";
    if (answered && instant) {
      const good = it.opts[it.ans].ok;
      fb = `<div class="fb ${good ? "good" : "bad"}"><b>${pick(good ? JOKES.right : JOKES.wrong)}</b><p>${esc(it.e)}</p></div>`;
    }
    const lastQ = Q.i === n - 1;
    $("#quizBody").innerHTML = `<div class="q">
      <span class="q-tag">${CATS[it.c].name}</span>
      <p class="q-text">${esc(it.q)}</p>
      <div class="opts">${opts}</div>${fb}
      <div class="q-actions">
        <span class="timer">⏱ ${clock()}</span>
        <span>${Q.mode === "prova" && Q.i > 0 ? `<button class="btn" data-act="prev">← Voltar</button> ` : ""}
        <button class="btn primary" data-act="next" ${answered ? "" : "disabled style='opacity:.4;cursor:default'"}>${lastQ ? "Ver resultado" : "Próxima →"}</button></span>
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
    const C = 2 * Math.PI * 88;
    const fails = JOKES.result.fail;
    const joke = pct >= 0.9 ? pick(JOKES.result.great) : pass ? pick(JOKES.result.pass) : fails[pct >= 0.45 ? 1 : 0];
    const byCat = Object.keys(CATS).map((k) => {
      const qs = Q.items.filter((q) => q.c === k); if (!qs.length) return "";
      return `<div><b>${qs.filter((q) => q.opts[q.ans].ok).length}/${qs.length}</b><span>${CATS[k].name}</span></div>`;
    }).join("");
    const wrong = Q.items.filter((q) => !q.opts[q.ans].ok);
    const review = wrong.length ? `<div class="review"><h3>Revise o que errou</h3>${wrong.map((q) => `<div class="item">
        <p class="q">${esc(q.q)}</p>
        <p class="yours">✗ Sua resposta: ${esc(q.opts[q.ans].t)}</p>
        <p class="right">✓ Correta: ${esc(q.o[0])}</p>
        <p>${esc(q.e)}</p></div>`).join("")}</div>` : `<p class="joke">Nenhum erro. Respeito. 🫡</p>`;

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
