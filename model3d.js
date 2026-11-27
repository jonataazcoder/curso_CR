// Modelo 3D ilustrativo (sem escala) para estudo de nomenclatura.
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const MAT = {
  metal: () => new THREE.MeshStandardMaterial({ color: 0x3a3d42, metalness: 0.75, roughness: 0.38 }),
  dark: () => new THREE.MeshStandardMaterial({ color: 0x1c1d20, metalness: 0.6, roughness: 0.5 }),
  grip: () => new THREE.MeshStandardMaterial({ color: 0x4a2f1f, metalness: 0.1, roughness: 0.75 }),
  poly: () => new THREE.MeshStandardMaterial({ color: 0x23252a, metalness: 0.15, roughness: 0.8 }),
  sight: () => new THREE.MeshStandardMaterial({ color: 0xf5a623, metalness: 0.2, roughness: 0.5 }),
};

const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
const cylX = (r, len, m, seg = 32) => { const g = new THREE.CylinderGeometry(r, r, len, seg); g.rotateZ(Math.PI / 2); return new THREE.Mesh(g, m); };
const arc = (r, tube, a, m) => new THREE.Mesh(new THREE.TorusGeometry(r, tube, 12, 40, a), m);
const extrude = (pts, depth, m, bevel = 0.04) => {
  const s = new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y)));
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3 });
  g.translate(0, 0, -depth / 2);
  return new THREE.Mesh(g, m);
};
const curved = (draw, depth, mat, bevel = 0.06) => {
  const s = new THREE.Shape(); draw(s);
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 5, curveSegments: 24 });
  g.translate(0, 0, -depth / 2);
  return new THREE.Mesh(g, mat);
};
let checkerTex = null;
const checker = (base) => {
  if (!checkerTex) {
    const c = document.createElement("canvas"); c.width = c.height = 64;
    const x = c.getContext("2d"); x.fillStyle = "#808080"; x.fillRect(0, 0, 64, 64);
    x.strokeStyle = "#ffffff"; x.lineWidth = 3;
    for (let i = -64; i < 128; i += 10) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + 64, 64); x.stroke(); x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); }
    checkerTex = new THREE.CanvasTexture(c); checkerTex.wrapS = checkerTex.wrapT = THREE.RepeatWrapping; checkerTex.repeat.set(3, 3);
  }
  return new THREE.MeshStandardMaterial({ color: base, roughness: 0.9, metalness: 0.05, bumpMap: checkerTex, bumpScale: 2.5, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2 });
};
// painel lateral (uma face de cada lado) para dar textura à empunhadura
const panels = (draw, z, mat) => [-1, 1].map((sgn) => {
  const s = new THREE.Shape(); draw(s);
  const g = new THREE.ShapeGeometry(s, 24);
  const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 1.2, uv.getY(i) * 1.2);
  const mesh = new THREE.Mesh(g, mat); mesh.position.z = sgn * z; if (sgn < 0) mesh.scale.z = -1;
  return mesh;
});
const at = (mesh, x, y, z = 0, rz = 0) => { mesh.position.set(x, y, z); mesh.rotation.z = rz; return mesh; };

function revolver() {
  const P = [];
  const add = (key, name, desc, explode, ...meshes) => { const g = new THREE.Group(); meshes.forEach((m) => g.add(m)); P.push({ key, name, desc, explode, group: g }); };

  const cyl = new THREE.Group();
  cyl.add(cylX(0.56, 1.1, MAT.metal(), 48));
  for (let k = 0; k < 6; k++) {
    const a = (k / 6) * Math.PI * 2;
    const ch = cylX(0.12, 1.12, MAT.dark(), 16); ch.position.set(0, Math.cos(a) * 0.32, Math.sin(a) * 0.32); cyl.add(ch);
    const fl = cylX(0.07, 0.8, MAT.dark(), 10); fl.position.set(0, Math.cos(a + Math.PI / 6) * 0.55, Math.sin(a + Math.PI / 6) * 0.55); cyl.add(fl);
  }
  cyl.position.set(0.55, 0.92, 0);

  add("cano", "Cano", "Tubo por onde o projétil sai. No revólver, fica à frente do tambor; a folga entre os dois solta gases e resíduos de chumbo.", [0.9, 0, 0],
    at(cylX(0.19, 2.9, MAT.metal()), 2.75, 1.24), at(box(2.9, 0.12, 0.16, MAT.metal()), 2.75, 1.45));
  add("tambor", "Tambor (cilindro)", "Cilindro giratório que serve de carregador. Cada furo recebe um cartucho e funciona como câmara.", [0, 0, 1.1], cyl);
  add("armacao", "Armação", "A estrutura que une todas as peças: segura o tambor, o cano e o cabo.", [0, 0, 0],
    at(box(1.75, 0.16, 0.5, MAT.metal()), 0.45, 1.56), at(box(0.38, 0.8, 0.5, MAT.metal()), 1.32, 1.18),
    at(box(1.9, 0.22, 0.5, MAT.metal()), 0.5, 0.3), at(box(0.32, 1.38, 0.5, MAT.metal()), -0.3, 0.93));
  const revGrip = (s) => {
    s.moveTo(-0.15, 0.32);
    s.quadraticCurveTo(-0.22, -0.3, -0.42, -0.95);
    s.quadraticCurveTo(-0.52, -1.27, -0.82, -1.27);
    s.quadraticCurveTo(-1.06, -1.24, -1.02, -0.97);
    s.quadraticCurveTo(-0.9, -0.25, -0.72, 0.5);
    s.quadraticCurveTo(-0.62, 0.95, -0.46, 1.1);
    s.lineTo(-0.46, 0.32);
    s.lineTo(-0.15, 0.32);
  };
  const revPanel = (s) => {
    s.moveTo(-0.3, 0.2); s.quadraticCurveTo(-0.36, -0.4, -0.52, -0.95); s.quadraticCurveTo(-0.64, -1.12, -0.82, -1.12);
    s.quadraticCurveTo(-0.94, -1.1, -0.92, -0.92); s.quadraticCurveTo(-0.82, -0.25, -0.64, 0.42); s.quadraticCurveTo(-0.54, 0.66, -0.46, 0.72); s.lineTo(-0.3, 0.2);
  };
  add("cabo", "Cabo (empunhadura)", "Onde a mão forte segura, com os dedos atrás do tambor. O formato curvo encaixa na palma.", [-0.5, -0.7, 0],
    curved(revGrip, 0.3, MAT.grip(), 0.05), ...panels(revPanel, 0.202, checker(0x3b2416)));
  add("cao", "Cão", "Peça que, liberada pelo gatilho, bate no percussor. Pode ser armado com o polegar (ação simples).", [-0.6, 0.5, 0],
    at(box(0.24, 0.42, 0.16, MAT.dark()), -0.55, 1.42, 0, 0.35), at(box(0.3, 0.1, 0.2, MAT.dark()), -0.72, 1.65, 0, 0.5));
  add("gatilho", "Gatilho", "Tecla acionada pelo dedo. No revólver, costuma ficar mais perto da primeira dobra da falange.", [0, -0.6, 0.6],
    at(arc(0.26, 0.055, Math.PI * 0.55, MAT.dark()), 0.42, 0.1, 0, Math.PI * 0.62));
  add("guardamato", "Guarda-mato", "Arco que protege o gatilho contra acionamento acidental.", [0.2, -0.8, 0],
    at(arc(0.44, 0.055, Math.PI, MAT.metal()), 0.38, 0.22, 0, Math.PI));
  add("massa", "Massa de mira", "Elemento de pontaria na frente do cano. Deve ficar centralizada na alça.", [0.6, 0.6, 0],
    at(box(0.2, 0.22, 0.07, MAT.sight()), 4.05, 1.6));
  add("alca", "Alça de mira", "Entalhe na parte de trás da arma. A massa aparece no meio dela na visada.", [-0.4, 0.6, 0],
    at(box(0.12, 0.14, 0.09, MAT.sight()), -0.2, 1.7, 0.12), at(box(0.12, 0.14, 0.09, MAT.sight()), -0.2, 1.7, -0.12));
  add("vareta", "Vareta do extrator", "Empurrada para trás com o tambor aberto, expulsa os estojos vazios.", [0.4, -0.6, 0],
    at(cylX(0.065, 1.35, MAT.metal()), 1.95, 0.92));
  add("pedal", "Pedal (trava) do tambor", "Botão que libera o tambor para abrir de lado e carregar ou descarregar.", [-0.2, 0, 0.7],
    at(box(0.24, 0.14, 0.08, MAT.dark()), 0.02, 1.18, 0.29));
  return P;
}

function pistola() {
  const P = [];
  const add = (key, name, desc, explode, ...meshes) => { const g = new THREE.Group(); meshes.forEach((m) => g.add(m)); P.push({ key, name, desc, explode, group: g }); };
  const SIDE = 0.26; // face lateral esquerda da armação (comandos)

  // Ferrolho: perfil com chanfro na frente e na traseira, serrilhas e janela de ejeção
  const slide = new THREE.Group();
  slide.add(extrude([[-1.62, 1.0], [2.02, 1.0], [2.02, 1.46], [1.9, 1.58], [-1.5, 1.58], [-1.62, 1.48]], 0.46, MAT.metal(), 0.03));
  for (let k = 0; k < 7; k++) {
    slide.add(at(box(0.035, 0.44, 0.535, MAT.dark()), -1.42 + k * 0.08, 1.29));
  }
  slide.add(at(box(0.8, 0.26, 0.06, MAT.dark()), 0.55, 1.34, -0.25));
  slide.add(at(cylX(0.11, 0.02, MAT.dark(), 24), 2.06, 1.29));
  add("ferrolho", "Ferrolho", "Parte de cima que corre para trás a cada disparo: extrai e ejeta o estojo e leva o próximo cartucho à câmara. Do lado direito fica a janela de ejeção.", [0, 1.1, 0], slide);

  add("cano", "Cano", "Na pistola, a câmara é única e faz parte do cano. Ele fica dentro do ferrolho; aqui aparece quando você separa as peças.", [0.2, 2.1, 0],
    at(cylX(0.15, 2.5, MAT.dark()), 0.8, 1.29), at(box(0.62, 0.34, 0.34, MAT.dark()), -0.6, 1.29));

  // Armação: parte superior do frame (trilho/guarda-pó) até a traseira
  add("armacao", "Armação", "Estrutura de baixo, onde se apoiam o ferrolho, o gatilho, o cabo e os comandos.", [0, 0, 0],
    extrude([[-1.66, 0.62], [-1.66, 1.0], [1.9, 1.0], [1.9, 0.7], [0.75, 0.62], [-0.42, 0.62]], 0.5, MAT.poly(), 0.025));

  // Cabo: começa exatamente sob a armação, sem fresta
  const pisGrip = (s) => {
    s.moveTo(-0.5, 0.64);
    s.lineTo(-1.56, 0.64);
    s.quadraticCurveTo(-1.66, 0.5, -1.64, 0.3);
    s.quadraticCurveTo(-1.74, -0.35, -1.84, -1.12);
    s.quadraticCurveTo(-1.86, -1.3, -1.7, -1.31);
    s.lineTo(-1.14, -1.34);
    s.quadraticCurveTo(-1.02, -1.34, -1.04, -1.2);
    s.quadraticCurveTo(-0.96, -0.98, -0.9, -0.84);
    s.quadraticCurveTo(-0.82, -0.66, -0.78, -0.5);
    s.quadraticCurveTo(-0.7, -0.34, -0.66, -0.2);
    s.quadraticCurveTo(-0.57, 0.2, -0.5, 0.64);
  };
  const pisPanel = (s) => {
    s.moveTo(-0.72, 0.4); s.lineTo(-1.5, 0.4); s.quadraticCurveTo(-1.58, -0.3, -1.7, -1.02);
    s.quadraticCurveTo(-1.7, -1.14, -1.6, -1.15); s.lineTo(-1.18, -1.18); s.quadraticCurveTo(-1.1, -0.6, -0.94, -0.2); s.quadraticCurveTo(-0.79, 0.15, -0.72, 0.4);
  };
  add("cabo", "Cabo (empunhadura)", "Onde a mão forte segura; a mão fraca apoia com o polegar estendido. O carregador entra por baixo dele.", [-0.15, -0.35, 0],
    curved(pisGrip, 0.34, MAT.poly(), 0.05), ...panels(pisPanel, 0.222, checker(0x1d1f23)));

  // Carregador: segue a inclinação do cabo; só a base aparece embaixo
  const ang = -Math.atan(0.4 / 1.95);
  const mag = new THREE.Group();
  mag.add(at(box(0.48, 2.0, 0.22, MAT.dark()), 0, 0));
  mag.add(at(box(0.6, 0.12, 0.32, MAT.poly()), -0.02, -1.04));
  mag.add(at(box(0.4, 0.06, 0.16, MAT.sight()), 0, 0.98));
  mag.position.set(-1.24, -0.4, 0); mag.rotation.z = ang;
  add("carregador", "Carregador", "Peça removível com corpo, mola, transportador e base. Guarda os cartuchos em fila e entra pelo cabo.", [-0.3, -1.8, 0], mag);

  add("gatilho", "Gatilho", "Na pistola, fica no meio da primeira falange do indicador.", [0, -0.4, 0.7],
    at(arc(0.26, 0.055, Math.PI * 0.55, MAT.dark()), 0.02, 0.36, 0, Math.PI * 0.62));
  add("guardamato", "Guarda-mato", "Arco que protege o gatilho contra acionamento acidental.", [0.2, -0.7, 0],
    at(arc(0.5, 0.065, Math.PI, MAT.poly()), 0.15, 0.64, 0, Math.PI), at(box(1.0, 0.1, 0.13, MAT.poly()), 0.15, 0.14));
  add("cao", "Cão", "Liberado pelo gatilho, bate no percussor, que atinge a espoleta.", [-0.6, 0.4, 0],
    at(box(0.18, 0.3, 0.2, MAT.dark()), -1.72, 1.12, 0, 0.35), at(box(0.14, 0.1, 0.2, MAT.dark()), -1.8, 1.28, 0, 0.35));
  add("massa", "Massa de mira", "Elemento de pontaria na frente do ferrolho.", [0.4, 0.5, 0], at(box(0.14, 0.14, 0.08, MAT.sight()), 1.78, 1.65));
  add("alca", "Alça de mira", "Entalhe na parte de trás do ferrolho; a massa aparece no meio dela.", [-0.4, 0.5, 0],
    at(box(0.16, 0.15, 0.11, MAT.sight()), -1.4, 1.65, 0.12), at(box(0.16, 0.15, 0.11, MAT.sight()), -1.4, 1.65, -0.12));
  add("retemcarregador", "Retém do carregador", "Botão logo atrás do guarda-mato que solta o carregador.", [0, 0, 0.7],
    at(new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 20).rotateX(Math.PI / 2), MAT.sight()), -0.5, 0.48, SIDE + 0.02));
  add("retemferrolho", "Retém do ferrolho", "Alavanca que trava o ferrolho aberto, por exemplo quando acaba a munição.", [0, 0.2, 0.7],
    at(box(0.5, 0.07, 0.05, MAT.dark()), -0.15, 0.93, SIDE + 0.02));
  add("alavanca", "Alavanca de desmontagem", "Usada para desmontar a pistola em 1º escalão, para limpeza.", [0.3, 0, 0.7],
    at(box(0.24, 0.09, 0.05, MAT.dark()), 0.6, 0.85, SIDE + 0.02));
  add("registro", "Registro de segurança", "Trava manual. É um dispositivo mecânico e não substitui o bom senso.", [-0.3, 0, 0.7],
    at(box(0.24, 0.12, 0.05, MAT.sight()), -1.38, 0.88, SIDE + 0.02));
  return P;
}

export function mount(root, kind) {
  const parts = kind === "pistola" ? pistola() : revolver();
  root.innerHTML = `<div class="m3d-stage"><canvas></canvas><span class="m3d-label"></span><span class="m3d-hint">↻ arraste para girar · toque numa peça</span></div>
    <div class="m3d-info"><small class="m3d-n"></small><b class="m3d-name">Explore a arma</b><p class="m3d-desc">Gire o modelo e toque nas peças, ou use os botões para passar por cada uma.</p></div>
    <div class="m3d-nav"><button class="btn" data-m="-1">←</button><button class="btn primary" data-m="1">Próxima peça →</button>
      <label class="m3d-ex">Separar peças <input type="range" min="0" max="1" step="0.01" value="0"></label></div>
    <div class="m3d-chips">${parts.map((p, i) => `<button data-i="${i}">${p.name}</button>`).join("")}</div>
    <p class="m3d-note">Modelo ilustrativo, sem escala, só para estudo da nomenclatura.</p>`;

  const stage = root.querySelector(".m3d-stage"), canvas = root.querySelector("canvas"), label = root.querySelector(".m3d-label");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(1.8, 1.4, 6.6);
  scene.add(new THREE.HemisphereLight(0xfff4e0, 0x202020, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(4, 6, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0xf5a623, 1.2); rim.position.set(-6, 2, -4); scene.add(rim);

  const gun = new THREE.Group(); scene.add(gun);
  parts.forEach((p) => { gun.add(p.group); p.base = p.group.position.clone(); p.group.traverse((o) => { if (o.isMesh) { o.userData.part = p; o.userData.mat = o.material; } }); });
  const bb = new THREE.Box3().setFromObject(gun), center = bb.getCenter(new THREE.Vector3());
  gun.position.sub(center);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true; controls.enablePan = false; controls.minDistance = 4; controls.maxDistance = 12;
  controls.autoRotate = true; controls.autoRotateSpeed = 1.4;
  const goal = new THREE.Vector3();
  controls.addEventListener("start", () => (controls.autoRotate = false));

  let sel = -1, explode = 0;
  const select = (i) => {
    sel = i;
    parts.forEach((p, k) => p.group.traverse((o) => {
      if (!o.isMesh) return;
      if (i < 0 || k === i) { o.material = o.userData.mat; o.material.emissive?.setHex(k === i ? 0x7a4a00 : 0x000000); }
      else { if (!o.userData.ghost) { o.userData.ghost = o.userData.mat.clone(); o.userData.ghost.transparent = true; o.userData.ghost.opacity = 0.3; o.userData.ghost.depthWrite = false; } o.material = o.userData.ghost; }
    }));
    const p = parts[i];
    root.querySelector(".m3d-n").textContent = i < 0 ? "" : `Peça ${i + 1} de ${parts.length}`;
    root.querySelector(".m3d-name").textContent = i < 0 ? "Explore a arma" : p.name;
    root.querySelector(".m3d-desc").textContent = i < 0 ? "Gire o modelo e toque nas peças." : p.desc;
    root.querySelectorAll(".m3d-chips button").forEach((b, k) => b.classList.toggle("on", k === i));
    if (i >= 0) new THREE.Box3().setFromObject(p.group).getCenter(goal); else goal.set(0, 0, 0);
  };

  root.querySelector(".m3d-nav").addEventListener("click", (e) => {
    const b = e.target.closest("[data-m]"); if (!b) return;
    controls.autoRotate = false;
    select((sel + +b.dataset.m + parts.length) % parts.length);
  });
  root.querySelector(".m3d-chips").addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (b) { controls.autoRotate = false; select(+b.dataset.i); } });
  root.querySelector(".m3d-ex input").addEventListener("input", (e) => (explode = +e.target.value));

  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  let down = null;
  canvas.addEventListener("pointerdown", (e) => (down = [e.clientX, e.clientY]));
  canvas.addEventListener("pointerup", (e) => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
    const r = canvas.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const hit = ray.intersectObjects(gun.children, true).find((h) => h.object.userData.part && (sel < 0 || h.object.material.opacity !== 0.3 || h.object.userData.part === parts[sel]));
    if (hit) { controls.autoRotate = false; select(parts.indexOf(hit.object.userData.part)); } else select(-1);
  });

  const resize = () => {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(stage); resize();

  const tmp = new THREE.Vector3();
  const loop = () => {
    if (!root.isConnected) { renderer.dispose(); controls.dispose(); return; }
    parts.forEach((p) => p.group.position.set(p.base.x + p.explode[0] * explode, p.base.y + p.explode[1] * explode, p.base.z + p.explode[2] * explode));
    if (sel >= 0) new THREE.Box3().setFromObject(parts[sel].group).getCenter(goal);
    controls.target.lerp(goal, 0.08);
    controls.update();
    renderer.render(scene, camera);
    if (sel >= 0) {
      tmp.copy(goal).project(camera);
      label.style.transform = `translate(${(tmp.x * 0.5 + 0.5) * stage.clientWidth}px, ${(-tmp.y * 0.5 + 0.5) * stage.clientHeight}px)`;
      label.textContent = parts[sel].name; label.hidden = false;
    } else label.hidden = true;
    requestAnimationFrame(loop);
  };
  loop();
}
