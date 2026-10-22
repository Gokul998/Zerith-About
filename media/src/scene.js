/* Zerith 3D mark — shared scene for the video, LinkedIn cover and profile logo.
   Same geometry and shader as the website (see README §9). Everything is driven by
   set(state) so frames are deterministic and can be rendered one by one. */
(function () {
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const R = [56, 40, 24, 10].map(r => r / 56 * 1.2);   // logo radii, outer → point
  const Z = [0, 0.62, 1.12, 1.5];                       // depth offsets × spread
  const COL = [0x5B3FD6, 0x7C5CF0, 0xB7A5FF, 0xFFFFFF];
  const RIM = [0x9C86FF, 0xC9BBFF, 0xFFFFFF, 0xB7A5FF];

  const vs = `varying vec3 vN;varying vec3 vV;
    void main(){vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}`;
  const fs = `uniform vec3 uColor;uniform vec3 uRim;uniform float uEmph;uniform float uOp;
    varying vec3 vN;varying vec3 vV;
    void main(){vec3 n=normalize(vN);vec3 v=normalize(vV);vec3 L=normalize(vec3(-.35,.8,.55));
      float d=max(dot(n,L),0.);vec3 c=uColor*(.74+.38*d);
      float fr=pow(1.-max(dot(n,v),0.),2.4);c=mix(c,uRim,fr*.6);
      float sp=pow(max(dot(reflect(-L,n),v),0.),36.);c+=vec3(sp*.32);
      c*=mix(.28,1.,uEmph);
      gl_FragColor=vec4(c,uOp*mix(.5,1.,uEmph));}`;

  function radial(stops, size) {
    const c = document.createElement('canvas'); c.width = c.height = size;
    const g = c.getContext('2d'); const h = size / 2;
    const grd = g.createRadialGradient(h, h, 0, h, h, h);
    stops.forEach(([o, col]) => grd.addColorStop(o, col));
    g.fillStyle = grd; g.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }

  window.ZerithScene = function (canvas, W, H, o) {
    o = o || {};
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(o.dpr || 1);
    renderer.setSize(W, H, false);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(24, W / H, 0.1, 100);
    camera.position.z = 13;
    const vh = 2 * Math.tan(12 * Math.PI / 180) * 13;
    const u = vh / H; // world units per CSS pixel at z = 0

    const root = new THREE.Group(); scene.add(root);

    const spheres = R.map((r, i) => {
      const m = new THREE.ShaderMaterial({
        vertexShader: vs, fragmentShader: fs, transparent: true, depthTest: false, depthWrite: false,
        uniforms: { uColor: { value: new THREE.Color(COL[i]) }, uRim: { value: new THREE.Color(RIM[i]) }, uEmph: { value: 1 }, uOp: { value: 1 } }
      });
      const s = new THREE.Mesh(new THREE.SphereGeometry(r, 128, 96), m);
      s.renderOrder = 10 + i; root.add(s); return s;
    });

    const halo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radial([[0, 'rgba(124,92,240,.55)'], [.45, 'rgba(91,63,214,.18)'], [1, 'rgba(91,63,214,0)']], 256),
      transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending
    }));
    halo.scale.set(7, 7, 1); halo.renderOrder = 2; root.add(halo);

    function ring(rad, op) {
      const pts = [];
      for (let i = 0; i <= 256; i++) { const a = i / 256 * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * rad, 0, Math.sin(a) * rad)); }
      const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: 0xB7A5FF, transparent: true, opacity: op, depthTest: false }));
      l.renderOrder = 3; l.userData.op = op; return l;
    }
    const ringA = ring(1.9, .38); ringA.rotation.set(1.18, 0, .22); root.add(ringA);
    const ringB = ring(2.35, .16); ringB.rotation.set(1.32, 0, -.3); root.add(ringB);
    const sat = new THREE.Mesh(new THREE.SphereGeometry(.05, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, depthTest: false }));
    sat.renderOrder = 4; ringA.add(sat);

    const rand = rng(o.seed || 7);
    const N = o.dust ?? 1600, pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 5 + rand() * 16, t = rand() * Math.PI * 2, p = Math.acos(2 * rand() - 1);
      pos[i * 3] = r * Math.sin(p) * Math.cos(t) * (W / H > 2 ? 1.8 : 1);
      pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * .7;
      pos[i * 3 + 2] = r * Math.cos(p) - 6;
    }
    const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(dg, new THREE.PointsMaterial({
      size: o.dustSize ?? .09,
      map: radial([[0, 'rgba(255,255,255,1)'], [.3, 'rgba(183,165,255,.6)'], [1, 'rgba(183,165,255,0)']], 64),
      transparent: true, opacity: .75, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending
    }));
    dust.renderOrder = 0; scene.add(dust);

    // Optional Zerith Core network: services orbiting the mark, wired to it (same layout as the website)
    let netG = null; const nodes = [], cross = [];
    if (o.net) {
      netG = new THREE.Group(); scene.add(netG);
      const haloTex = halo.material.map, dotTex = dust.material.map, NS = o.net.length;
      const add = (ob, ord) => { ob.renderOrder = ord; netG.add(ob); return ob; };
      o.net.forEach((col, i) => {
        const th = i / NS * Math.PI * 2 + .3, hgt = [.45, -.3, .15, -.45, .35, -.1][i % 6];
        const p = new THREE.Vector3(Math.cos(th) * 4.1, hgt, Math.sin(th) * 4.1);
        const c = new THREE.Color(col);
        const mesh = add(new THREE.Mesh(new THREE.SphereGeometry(.12, 24, 16), new THREE.MeshBasicMaterial({ color: c, transparent: true, depthTest: false, depthWrite: false })), 22);
        mesh.position.copy(p);
        const glowS = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex, color: c, transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending }));
        glowS.scale.set(1.3, 1.3, 1); mesh.add(glowS);
        const mid = p.clone().multiplyScalar(.5).add(new THREE.Vector3(0, .55, 0));
        const curve = new THREE.QuadraticBezierCurve3(p.clone(), mid, new THREE.Vector3(0, 0, 0));
        const line = add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)), new THREE.LineBasicMaterial({ color: 0xB7A5FF, transparent: true, opacity: 0, depthTest: false })), 4);
        const pulse = add(new THREE.Sprite(new THREE.SpriteMaterial({ map: dotTex, color: 0xffffff, transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending })), 22);
        pulse.scale.set(.32, .32, 1);
        nodes.push({ p, mesh, glowS, line, curve, pulse, phase: i * .37 % 1, dir: i % 2 });
      });
      (o.links || []).forEach(([a, b]) => {
        const A = nodes[a].p, B = nodes[b].p, mid = A.clone().add(B).multiplyScalar(.5).multiplyScalar(1.18);
        const c = new THREE.QuadraticBezierCurve3(A.clone(), mid, B.clone());
        cross.push(add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(c.getPoints(32)), new THREE.LineBasicMaterial({ color: 0x7C5CF0, transparent: true, opacity: 0, depthTest: false })), 3));
      });
      netG.visible = false;
    }
    const toScreen = v => { const q = v.clone().project(camera); return { x: (q.x * .5 + .5) * W, y: (-q.y * .5 + .5) * H }; };

    function set(s) {
      const t = s.t || 0, op = s.op ?? 1, sp = s.spread ?? 0;
      const g = s.grow || [1, 1, 1, 1], e = s.emph || [1, 1, 1, 1];
      // Keep the mark on the camera axis and shift the frame instead (off-axis projection),
      // so wide formats don't stretch the spheres near the edges.
      camera.setViewOffset(W, H, W / 2 - s.cx, H / 2 - s.cy, W, H);
      root.scale.setScalar(Math.max(s.radius * u / 1.2, 1e-4));
      root.rotation.set(s.rx || 0, s.ry || 0, 0);
      spheres.forEach((m, i) => {
        const k = Math.max(g[i], 1e-4);
        m.visible = g[i] > 1e-3;
        m.scale.setScalar(k);
        m.position.y = 1.2 - R[i] * k;          // keep the shared top tangent while growing
        m.position.z = Z[i] * sp;
        m.material.uniforms.uEmph.value = e[i];
        m.material.uniforms.uOp.value = op;
      });
      halo.material.opacity = (s.halo ?? 1) * op * .9;
      const rv = (s.rings ?? 1) * op;
      ringA.material.opacity = ringA.userData.op * rv;
      ringB.material.opacity = ringB.userData.op * rv;
      sat.material.opacity = rv * (s.sat ?? 1);
      ringA.rotation.y = t * .25; ringB.rotation.y = -t * .12;
      const a = t * .6; sat.position.set(Math.cos(a) * 1.9, 0, Math.sin(a) * 1.9);
      dust.rotation.y = t * .02 + (s.dustRot || 0);
      dust.material.opacity = (s.dust ?? .75);

      if (netG) {
        const nv = Math.min(1, Math.max(0, s.net || 0));
        netG.visible = nv > .01;
        const sc = Math.max(s.radius * u / 1.2, 1e-4) * (.35 + .65 * nv);
        netG.scale.setScalar(sc);
        netG.rotation.set(s.netTilt ?? .32, s.netRot || 0, 0);
        scene.updateMatrixWorld(); camera.updateMatrixWorld();
        const inv = camera.matrixWorldInverse;
        nodes.forEach((n, i) => {
          const on = s.active === i, wp = n.p.clone().applyMatrix4(netG.matrixWorld);
          const behind = wp.clone().applyMatrix4(inv).z < 0;
          n.behind = behind; n.world = wp;
          const f = behind ? .5 : 1;
          n.mesh.renderOrder = n.pulse.renderOrder = behind ? 5 : 22;
          n.mesh.material.opacity = nv * f;
          n.glowS.material.opacity = nv * f * (on ? 1 : .5);
          n.mesh.scale.setScalar(on ? 1.9 : 1);
          n.line.material.opacity = nv * (on ? .95 : .24);
          const u2 = (t * (on ? .9 : .32) + n.phase) % 1;
          n.pulse.position.copy(n.curve.getPoint(n.dir && !on ? u2 : 1 - u2));
          n.pulse.material.opacity = nv * Math.sin(u2 * Math.PI) * (on ? 1 : .6);
          n.pulse.scale.setScalar(on ? .5 : .32);
        });
        cross.forEach(l => l.material.opacity = nv * .18);
      }
    }
    // screen position (CSS px) of service i, and of a point in the mark's own units
    function node(i) { const n = nodes[i]; const sp = toScreen(n.world || new THREE.Vector3()); return { x: sp.x, y: sp.y, behind: !!n.behind }; }
    function point(x, y, z) { root.updateMatrixWorld(); return toScreen(new THREE.Vector3(x, y, z).applyMatrix4(root.matrixWorld)); }

    return { set, node, point, render: () => renderer.render(scene, camera) };
  };
})();
