"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const COUNT = 90;
const CONNECT_DIST = 22;

export default function WebGLBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 500);
    camera.position.z = 95;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Particles ──────────────────────────────────────────
    const pPositions = new Float32Array(COUNT * 3);
    const pVelocities: Array<{ x: number; y: number }> = [];

    for (let i = 0; i < COUNT; i++) {
      pPositions[i * 3]     = (Math.random() - 0.5) * 200;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 110;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      pVelocities.push({
        x: (Math.random() - 0.5) * 0.014,
        y: (Math.random() - 0.5) * 0.01,
      });
    }

    const pGeo = new THREE.BufferGeometry();
    const pAttr = new THREE.BufferAttribute(pPositions, 3);
    pGeo.setAttribute("position", pAttr);
    const pMat = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 1.1,
      transparent: true,
      opacity: 0.55,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    // ── Connection lines (pre-allocated) ────────────────────
    const lPos = new Float32Array(COUNT * COUNT * 6);
    const lGeo = new THREE.BufferGeometry();
    const lAttr = new THREE.BufferAttribute(lPos, 3);
    lGeo.setAttribute("position", lAttr);
    const lMat = new THREE.LineBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.1,
    });
    scene.add(new THREE.LineSegments(lGeo, lMat));

    // ── Wireframe icosahedron (web3 shape) ──────────────────
    const icoGeo = new THREE.IcosahedronGeometry(13, 1);
    const icoEdges = new THREE.EdgesGeometry(icoGeo);
    const icoMat = new THREE.LineBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.13,
    });
    const ico = new THREE.LineSegments(icoEdges, icoMat);
    ico.position.set(38, 10, -18);
    scene.add(ico);

    // ── Wireframe torus ─────────────────────────────────────
    const torGeo = new THREE.TorusGeometry(10, 2, 8, 16);
    const torEdges = new THREE.EdgesGeometry(torGeo);
    const torMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.11,
    });
    const tor = new THREE.LineSegments(torEdges, torMat);
    tor.position.set(-45, -14, -28);
    scene.add(tor);

    // ── Second smaller octahedron ───────────────────────────
    const octGeo = new THREE.OctahedronGeometry(7, 0);
    const octEdges = new THREE.EdgesGeometry(octGeo);
    const octMat = new THREE.LineBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.1,
    });
    const oct = new THREE.LineSegments(octEdges, octMat);
    oct.position.set(-15, 30, -10);
    scene.add(oct);

    // ── Mouse parallax ──────────────────────────────────────
    const mouse = { cx: 0, cy: 0, tx: 0, ty: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 12;
      mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 7;
    };
    window.addEventListener("mousemove", onMouse);

    const onResize = () => {
      const nw = mount.clientWidth || window.innerWidth;
      const nh = mount.clientHeight || window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ──────────────────────────────────────
    let raf: number;

    const animate = () => {
      raf = requestAnimationFrame(animate);

      const p = pAttr.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        p[i * 3]     += pVelocities[i].x;
        p[i * 3 + 1] += pVelocities[i].y;
        if (p[i * 3] > 100)  p[i * 3] = -100;
        if (p[i * 3] < -100) p[i * 3] = 100;
        if (p[i * 3 + 1] > 55)  p[i * 3 + 1] = -55;
        if (p[i * 3 + 1] < -55) p[i * 3 + 1] = 55;
      }
      pAttr.needsUpdate = true;

      let li = 0;
      const l = lAttr.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = p[i * 3] - p[j * 3];
          const dy = p[i * 3 + 1] - p[j * 3 + 1];
          if (Math.sqrt(dx * dx + dy * dy) < CONNECT_DIST) {
            l[li++] = p[i * 3];     l[li++] = p[i * 3 + 1]; l[li++] = p[i * 3 + 2];
            l[li++] = p[j * 3];     l[li++] = p[j * 3 + 1]; l[li++] = p[j * 3 + 2];
          }
        }
      }
      lGeo.setDrawRange(0, li / 3);
      lAttr.needsUpdate = true;

      ico.rotation.x += 0.003;
      ico.rotation.y += 0.005;
      tor.rotation.y += 0.004;
      tor.rotation.z += 0.002;
      oct.rotation.x += 0.004;
      oct.rotation.z += 0.003;

      mouse.cx += (mouse.tx - mouse.cx) * 0.04;
      mouse.cy += (mouse.ty - mouse.cy) * 0.04;
      camera.position.x = mouse.cx;
      camera.position.y = mouse.cy;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      [pGeo, lGeo, icoGeo, icoEdges, torGeo, torEdges, octGeo, octEdges].forEach((g) => g.dispose());
      [pMat, lMat, icoMat, torMat, octMat].forEach((m) => m.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
