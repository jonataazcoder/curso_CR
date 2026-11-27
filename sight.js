// Jogo de visada em primeira pessoa: alinhar alça e massa e levar ao alvo.
export function mount(root) {
  root.innerHTML = `<div class="fp">
    <div class="fp-hud"><span>Tiros <b class="fp-shots">0/5</b></span><span>Pontos <b class="fp-pts">0</b></span><span class="fp-last"></span></div>
    <div class="fp-stage"><canvas></canvas><div class="fp-tip">👆 Arraste na tela para mover a arma</div></div>
    <div class="fp-status"></div>
    <div class="fp-btns">
      <button class="btn fp-breath">🫁 Segurar a respiração</button>
      <button class="btn primary fp-fire">Disparar 🎯</button>
    </div>
    <label class="fp-names"><input type="checkbox" checked> Mostrar nomes (alça, massa, alvo)</label>
  </div>`;
  const cv = root.querySelector("canvas"), ctx = cv.getContext("2d"), stage = root.querySelector(".fp-stage");
  const $ = (s) => root.querySelector(s);
  let W = 600, H = 420, s = 1, g = 1, dpr = Math.min(devicePixelRatio || 1, 2);
  const resize = () => {
    W = stage.clientWidth; H = Math.round(Math.min(Math.max(W * 0.75, 340), 460)); s = Math.max(W / 600, 0.62); g = s * (W < 500 ? 0.72 : 1);
    cv.width = W * dpr; cv.height = H * dpr; cv.style.height = H + "px"; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize(); new ResizeObserver(resize).observe(stage);

  // Estado: P = para onde a mão quer levar a arma; R = alça (segue a mão); O = desvio da massa em relação à alça.
  const T = () => ({ x: W / 2, y: H * 0.36 });
  let TR = { x: 0, y: 0 }, P, R, O, V, shots, pts, holes, breath = 0, breathT = 0, recoil = 0, names = true, t0 = performance.now(), done = false;
  const reset = () => {
    P = { x: W / 2 + 130 * s, y: H * 0.72 }; R = { ...P }; O = { x: 18 * s, y: -14 * s }; V = { x: 0, y: 0 };
    shots = 0; pts = 0; holes = []; done = false;
    $(".fp-shots").textContent = "0/5"; $(".fp-pts").textContent = "0"; $(".fp-last").textContent = "";
    $(".fp-fire").textContent = "Disparar 🎯";
  };
  reset();

  // Arrastar: movimento relativo (o dedo não cobre a mira).
  let drag = null;
  cv.addEventListener("pointerdown", (e) => { drag = [e.clientX, e.clientY]; cv.setPointerCapture(e.pointerId); $(".fp-tip").hidden = true; });
  cv.addEventListener("pointermove", (e) => {
    if (!drag) return;
    P.x = Math.max(40 * s, Math.min(W - 40 * s, P.x + (e.clientX - drag[0])));
    P.y = Math.max(60 * s, Math.min(H - 30 * s, P.y + (e.clientY - drag[1])));
    drag = [e.clientX, e.clientY];
  });
  const end = () => (drag = null);
  cv.addEventListener("pointerup", end); cv.addEventListener("pointercancel", end);

  // Respiração: segurar reduz o tremor; depois de 4 s falta ar e treme mais.
  const bBtn = $(".fp-breath");
  const bOn = (e) => { e.preventDefault(); breath = 1; breathT = performance.now(); bBtn.classList.add("on"); };
  const bOff = () => { breath = 0; bBtn.classList.remove("on"); };
  bBtn.addEventListener("pointerdown", bOn); ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => bBtn.addEventListener(ev, bOff));
  $(".fp-names input").onchange = (e) => (names = e.target.checked);

  const E = () => ({ x: O.x + TR.x, y: O.y + TR.y }); // desvio real da massa (com tremor)
  const tipPos = () => ({ x: R.x + E().x, y: R.y - 64 * g + E().y });
  const fire = () => {
    if (done) { reset(); return; }
    const tip = tipPos(), t = T();
    const e = E(), ix = tip.x + e.x * 3 + (Math.random() - 0.5) * 3 * s, iy = tip.y + e.y * 3 + (Math.random() - 0.5) * 3 * s;
    const d = Math.hypot(ix - t.x, iy - t.y) / s;
    const p = d < 12 ? 10 : d < 24 ? 9 : d < 36 ? 8 : d < 48 ? 7 : d < 60 ? 6 : 0;
    holes.push({ x: (ix - t.x) / s, y: (iy - t.y) / s });
    shots++; pts += p; recoil = 1;
    V.y -= 9 * s; V.x += (Math.random() - 0.5) * 6 * s; R.y -= 26 * s;
    $(".fp-shots").textContent = `${shots}/5`; $(".fp-pts").textContent = pts;
    $(".fp-last").textContent = p ? `último: ${p}` : "último: fora!";
    if (shots >= 5) { done = true; $(".fp-fire").textContent = "Nova série ↺"; }
  };
  $(".fp-fire").onclick = fire;
  root.addEventListener("keydown", (e) => { if (e.code === "Space") { e.preventDefault(); fire(); } });

  const status = $(".fp-status");
  const loop = (now) => {
    if (!root.isConnected) return;
    const t = (now - t0) / 1000;
    // a mão leva a alça até P; o movimento brusco desalinha a massa, que volta devagar
    const nx = R.x + (P.x - R.x) * 0.18, ny = R.y + (P.y - R.y) * 0.18;
    V.x += -(nx - R.x) * 0.35; V.y += -(ny - R.y) * 0.35;
    R.x = nx; R.y = ny;
    V.x += -O.x * 0.06; V.y += -O.y * 0.06; V.x *= 0.82; V.y *= 0.82;
    O.x += V.x; O.y += V.y;
    const held = breath && now - breathT < 4000, gasping = breath && !held;
    const amp = (held ? 0.6 : gasping ? 4.5 : 2.2) * s;
    TR = { x: amp * (Math.sin(t * 2.1) + 0.6 * Math.sin(t * 5.3)), y: amp * (Math.cos(t * 1.7) + 0.6 * Math.sin(t * 4.1)) };
    draw(t, held, gasping);
    // status
    const e = E(), tip = tipPos(), tt = T(), aligned = Math.hypot(e.x, e.y) < 3.2 * s, onT = Math.hypot(tip.x - tt.x, tip.y - tt.y) < 14 * s;
    status.className = "fp-status " + (aligned && onT ? "ok" : aligned ? "mid" : "");
    status.textContent = done ? `Série encerrada: ${pts}/50. ${pts >= 45 ? "Atirador(a) de elite! 🏆" : pts >= 35 ? "Bom agrupamento!" : "Lembre: primeiro alinha alça e massa, depois leva ao alvo."}`
      : !aligned ? (Math.abs(e.x) > Math.abs(e.y) ? (e.x > 0 ? "1. Massa à direita da alça: espere ela voltar ao centro" : "1. Massa à esquerda da alça: espere ela voltar ao centro")
        : e.y < 0 ? "1. Massa alta: o topo dela tem que ficar nivelado com a alça" : "1. Massa baixa: o topo dela tem que ficar nivelado com a alça")
      : !onT ? "2. Alinhado ✔ Agora leve o topo da massa ao centro do alvo"
      : held ? "3. Visada perfeita e respiração presa: DISPARE!" : "3. Visada perfeita! Segure a respiração e dispare";
    recoil = Math.max(0, recoil - 0.08);
    requestAnimationFrame(loop);
  };

  function draw(t, held, gasping) {
    const tt = T();
    // fundo: estande
    const sky = ctx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, "#3a3f36"); sky.addColorStop(0.55, "#59604d"); sky.addColorStop(0.56, "#6d5a3e"); sky.addColorStop(1, "#4a3c2a");
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(0,0,0,.18)"; for (let i = 0; i < 6; i++) ctx.fillRect(0, H * 0.56 + i * 22 * s, W, 1.5 * s);
    // alvo (levemente desfocado: o foco é na massa)
    ctx.save(); ctx.filter = "blur(1.2px)";
    ctx.fillStyle = "#6b5a45"; ctx.fillRect(tt.x - 3 * s, tt.y + 70 * s, 6 * s, H);
    ctx.fillStyle = "#efe9da"; ctx.fillRect(tt.x - 78 * s, tt.y - 78 * s, 156 * s, 156 * s);
    [60, 48, 36, 24, 12].forEach((r, i) => { ctx.beginPath(); ctx.arc(tt.x, tt.y, r * s, 0, 7); ctx.fillStyle = i >= 3 ? "#1b1b1b" : "#efe9da"; ctx.fill(); ctx.lineWidth = 1.5 * s; ctx.strokeStyle = i >= 3 ? "#efe9da" : "#1b1b1b"; ctx.stroke(); });
    ctx.restore();
    holes.forEach((h) => { ctx.beginPath(); ctx.arc(tt.x + h.x * s, tt.y + h.y * s, 3.2 * s, 0, 7); ctx.fillStyle = "#e5533d"; ctx.fill(); ctx.strokeStyle = "#fff"; ctx.lineWidth = 1; ctx.stroke(); });

    const tip = tipPos();
    const kick = recoil * 10 * g;
    // ferrolho em perspectiva: da alça (perto, largo) até a massa (longe, estreito)
    ctx.fillStyle = "#26282b";
    ctx.beginPath();
    ctx.moveTo(R.x - 70 * g, R.y + 30 * g - kick); ctx.lineTo(tip.x - 9 * g, tip.y + 14 * g); ctx.lineTo(tip.x + 9 * g, tip.y + 14 * g); ctx.lineTo(R.x + 70 * g, R.y + 30 * g - kick);
    ctx.closePath(); ctx.fill();
    // massa de mira (longe)
    ctx.fillStyle = "#121314"; ctx.fillRect(tip.x - 5 * g, tip.y, 10 * g, 16 * g);
    ctx.beginPath(); ctx.arc(tip.x, tip.y + 7 * g, 2.6 * g, 0, 7); ctx.fillStyle = "#fff"; ctx.fill();
    // traseira do ferrolho + alça (perto)
    const ry = R.y - 64 * g - kick;
    ctx.fillStyle = "#1a1b1d";
    ctx.beginPath(); ctx.moveTo(R.x - 78 * g, ry + 4 * g); ctx.lineTo(R.x - 16 * g, ry + 4 * g); ctx.lineTo(R.x - 16 * g, ry + 30 * g); ctx.lineTo(R.x + 16 * g, ry + 30 * g); ctx.lineTo(R.x + 16 * g, ry + 4 * g); ctx.lineTo(R.x + 78 * g, ry + 4 * g);
    ctx.lineTo(R.x + 86 * g, H + 10); ctx.lineTo(R.x - 86 * g, H + 10); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#fff"; [-1, 1].forEach((k) => { ctx.beginPath(); ctx.arc(R.x + k * 34 * g, ry + 14 * g, 3 * g, 0, 7); ctx.fill(); });
    ctx.fillStyle = "#2c2e31"; for (let i = 0; i < 7; i++) ctx.fillRect(R.x - 70 * g, ry + 40 * g + i * 7 * g, 140 * g, 2.5 * g);
    // nomes
    if (names) {
      label(R.x + 40 * s, ry - 18 * s, "ALÇA", R.x + 18 * s, ry + 6 * s);
      label(tip.x - 60 * s, tip.y - 26 * s, "MASSA", tip.x - 6 * s, tip.y);
      label(tt.x + 92 * s, tt.y - 70 * s, "ALVO", tt.x + 60 * s, tt.y - 50 * s);
    }
    // indicador de respiração
    if (held || gasping) { ctx.fillStyle = gasping ? "rgba(229,83,61,.9)" : "rgba(79,191,106,.9)"; ctx.font = `600 ${13 * s + 4}px Inter, sans-serif`; ctx.fillText(gasping ? "Falta ar! Solte e respire" : "Apneia: mão firme", 14, 24); }
  }
  function label(x, y, text, ax, ay) {
    ctx.font = `700 ${11 * s + 4}px Oswald, Inter, sans-serif`;
    const w = ctx.measureText(text).width + 14;
    ctx.strokeStyle = "#f5a623"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ax, ay); ctx.stroke();
    ctx.fillStyle = "#f5a623"; ctx.beginPath(); ctx.roundRect(x - w / 2, y - 11, w, 22, 11); ctx.fill();
    ctx.fillStyle = "#1a1205"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(text, x, y + 1); ctx.textAlign = "start"; ctx.textBaseline = "alphabetic";
  }
  requestAnimationFrame(loop);
}
