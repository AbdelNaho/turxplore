"use client";

import {
  Suspense,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

const INTRO_MS = 7500;
const FADE_MS = 1200;

const C = {
  stone: "#B8956A",
  stoneLight: "#D4BC94",
  gold: "#C8A54A",
  goldBright: "#FFD700",
  teal: "#1A5E53",
  dark: "#0A0806",
};

/* ── zellige shader ─────────────────────────────── */
const zelligeVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const zelligeFrag = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uLine;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv * vec2(4.0, 18.0);
    vec2 g = fract(uv) * 2.0 - 1.0;
    g = abs(g);

    float diamond = g.x + g.y;
    float cross1 = min(abs(g.x), abs(g.y));
    float diag = abs(g.x - g.y) * 0.707;
    float ring = abs(diamond - 0.7);

    float d = min(ring - 0.06, min(cross1 - 0.03, diag - 0.025));
    float line = 1.0 - smoothstep(0.0, 0.025, d);
    float fill = smoothstep(0.32, 0.34, diamond);

    vec3 col = mix(uBase, uLine, line * 0.55 + (1.0 - fill) * 0.12);
    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ── Koutoubia Minaret ──────────────────────────── */
function Koutoubia() {
  const group = useRef<THREE.Group>(null!);

  useFrame((s) => {
    group.current.position.y = Math.sin(s.clock.elapsedTime * 0.25) * 0.08;
  });

  const mats = useMemo(() => {
    const stone = new THREE.MeshStandardMaterial({
      color: C.stoneLight,
      roughness: 0.78,
      metalness: 0.05,
    });
    const gold = new THREE.MeshStandardMaterial({
      color: C.gold,
      roughness: 0.22,
      metalness: 0.75,
      emissive: new THREE.Color(C.gold),
      emissiveIntensity: 0.12,
    });
    const goldBright = new THREE.MeshStandardMaterial({
      color: C.goldBright,
      roughness: 0.08,
      metalness: 0.92,
      emissive: new THREE.Color(C.goldBright),
      emissiveIntensity: 0.35,
    });
    const teal = new THREE.MeshStandardMaterial({
      color: C.teal,
      roughness: 0.45,
      metalness: 0.3,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: C.dark,
      roughness: 0.95,
    });
    const zellige = new THREE.ShaderMaterial({
      vertexShader: zelligeVert,
      fragmentShader: zelligeFrag,
      uniforms: {
        uBase: { value: new THREE.Color(C.stoneLight) },
        uLine: { value: new THREE.Color(C.gold) },
      },
    });
    return { stone, gold, goldBright, teal, dark, zellige };
  }, []);

  const merlons = useMemo(() => {
    const out: [number, number, number][] = [];
    const edge = 1.55;
    for (let i = -2; i <= 2; i++) {
      const o = i * 0.7;
      out.push([o, 13.35, edge], [o, 13.35, -edge]);
      out.push([edge, 13.35, o], [-edge, 13.35, o]);
    }
    return out;
  }, []);

  const arches = useMemo(() => {
    const out: { p: [number, number, number]; ry: number }[] = [];
    const offset = 1.42;
    for (const h of [3, 6, 9.5]) {
      out.push(
        { p: [0, h, offset], ry: 0 },
        { p: [0, h, -offset], ry: Math.PI },
        { p: [offset, h, 0], ry: Math.PI / 2 },
        { p: [-offset, h, 0], ry: -Math.PI / 2 },
      );
    }
    return out;
  }, []);

  return (
    <group ref={group}>
      {/* base */}
      <mesh position={[0, 0.2, 0]} material={mats.stone}>
        <boxGeometry args={[3.8, 0.4, 3.8]} />
      </mesh>
      <mesh position={[0, 0.55, 0]} material={mats.stone}>
        <boxGeometry args={[3.3, 0.3, 3.3]} />
      </mesh>

      {/* tower shaft — zellige shader */}
      <mesh position={[0, 6.8, 0]} material={mats.zellige}>
        <boxGeometry args={[2.8, 12.1, 2.8]} />
      </mesh>

      {/* gold bands */}
      {[1.5, 4.5, 7.5, 10.5].map((y) => (
        <mesh key={y} position={[0, y, 0]} material={mats.gold}>
          <boxGeometry args={[2.95, 0.12, 2.95]} />
        </mesh>
      ))}

      {/* horseshoe arch windows */}
      {arches.map((a, i) => (
        <group key={i} position={a.p} rotation={[0, a.ry, 0]}>
          <mesh position={[0, -0.1, 0.02]} material={mats.dark}>
            <boxGeometry args={[0.45, 0.9, 0.06]} />
          </mesh>
          <mesh position={[0, 0.35, 0.02]} material={mats.dark}>
            <circleGeometry args={[0.225, 16, 0, Math.PI]} />
          </mesh>
        </group>
      ))}

      {/* crown */}
      <mesh position={[0, 12.85, 0]} material={mats.gold}>
        <boxGeometry args={[3.1, 0.5, 3.1]} />
      </mesh>

      {/* merlons */}
      {merlons.map((p, i) => (
        <mesh key={i} position={p} material={mats.stone}>
          <boxGeometry args={[0.22, 0.5, 0.22]} />
        </mesh>
      ))}

      {/* lantern */}
      <mesh position={[0, 14.3, 0]} material={mats.stone}>
        <boxGeometry args={[1.4, 2.2, 1.4]} />
      </mesh>
      <mesh position={[0, 15.0, 0]} material={mats.gold}>
        <boxGeometry args={[1.55, 0.1, 1.55]} />
      </mesh>
      <mesh position={[0, 15.55, 0]} material={mats.gold}>
        <boxGeometry args={[1.6, 0.25, 1.6]} />
      </mesh>

      {/* teal dome */}
      <mesh position={[0, 15.85, 0]} material={mats.teal}>
        <sphereGeometry
          args={[0.85, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
      </mesh>

      {/* jamour — golden pole + spheres */}
      <mesh position={[0, 17.2, 0]} material={mats.goldBright}>
        <cylinderGeometry args={[0.04, 0.04, 2.7, 8]} />
      </mesh>
      <mesh position={[0, 16.9, 0]} material={mats.goldBright}>
        <sphereGeometry args={[0.22, 24, 24]} />
      </mesh>
      <mesh position={[0, 17.5, 0]} material={mats.goldBright}>
        <sphereGeometry args={[0.16, 24, 24]} />
      </mesh>
      <mesh position={[0, 17.9, 0]} material={mats.goldBright}>
        <sphereGeometry args={[0.11, 24, 24]} />
      </mesh>

      {/* ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#1A1510" roughness={0.95} />
      </mesh>
    </group>
  );
}

/* ── Camera rig — cinematic pullback ────────────── */
function CameraRig() {
  const t0 = useRef(0);

  useFrame((state) => {
    if (!t0.current) t0.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - t0.current;
    const t = Math.min(elapsed / 7, 1);
    const e = 1 - Math.pow(1 - t, 3);

    const r = THREE.MathUtils.lerp(3.5, 24, e);
    const h = THREE.MathUtils.lerp(19, 9, e);
    const a = THREE.MathUtils.lerp(0, Math.PI * 0.65, e);
    const ly = THREE.MathUtils.lerp(17.5, 8, e);

    state.camera.position.set(Math.sin(a) * r, h, Math.cos(a) * r);
    state.camera.lookAt(0, ly, 0);
  });

  return null;
}

/* ── Dust particles ─────────────────────────────── */
function Dust({ count = 350 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const [positions, velocities] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const v = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 50;
      p[i * 3 + 1] = Math.random() * 25;
      p[i * 3 + 2] = (Math.random() - 0.5) * 50;
      v[i * 3] = (Math.random() - 0.5) * 0.008;
      v[i * 3 + 1] = Math.random() * 0.003 + 0.001;
      v[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    return [p, v];
  }, [count]);

  useFrame(() => {
    const arr = ref.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      if (arr[i * 3 + 1] > 26) arr[i * 3 + 1] = 0;
      if (Math.abs(arr[i * 3]) > 25) arr[i * 3] *= -0.99;
      if (Math.abs(arr[i * 3 + 2]) > 25) arr[i * 3 + 2] *= -0.99;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#FFD080"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Stars ──────────────────────────────────────── */
function StarField() {
  const n = 1500;
  const positions = useMemo(() => {
    const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random());
      const r = 60 + Math.random() * 40;
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.cos(phi);
      p[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return p;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#FFFFFF"
        transparent
        opacity={0.55}
        sizeAttenuation={false}
      />
    </points>
  );
}

/* ── Scene ──────────────────────────────────────── */
function Scene() {
  return (
    <>
      <color attach="background" args={["#080604"]} />
      <fog attach="fog" args={["#080604", 28, 75]} />

      <ambientLight intensity={0.12} color="#A0B8D0" />
      <directionalLight
        position={[-10, 22, 8]}
        intensity={2.2}
        color="#FFE4B5"
      />
      <directionalLight
        position={[14, 16, -10]}
        intensity={1.0}
        color="#FFA040"
      />
      <pointLight
        position={[0, 18.5, 0]}
        intensity={12}
        color="#FFD700"
        distance={6}
        decay={2}
      />
      <pointLight
        position={[0, 0.5, 6]}
        intensity={2.5}
        color="#FF8C00"
        distance={10}
        decay={2}
      />

      <Environment preset="sunset" environmentIntensity={0.3} />

      <Koutoubia />
      <CameraRig />
      <Dust />
      <StarField />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.65}
          luminanceSmoothing={0.4}
          intensity={0.7}
          mipmapBlur
        />
        <Vignette offset={0.25} darkness={0.6} />
      </EffectComposer>
    </>
  );
}

/* ── Intro wrapper ──────────────────────────────── */
export function Intro3D() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"playing" | "fading" | "done">(
    reduceMotion ? "done" : "playing",
  );

  useEffect(() => {
    if (reduceMotion) return;
    const t1 = setTimeout(() => setPhase("fading"), INTRO_MS);
    return () => clearTimeout(t1);
  }, [reduceMotion]);

  useEffect(() => {
    if (phase === "fading") {
      const t = setTimeout(() => setPhase("done"), FADE_MS);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const skip = useCallback(() => setPhase("fading"), []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[150]"
      style={{
        background: "#080604",
        opacity: phase === "fading" ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease-in-out`,
      }}
    >
      <Canvas
        camera={{ position: [0, 19, 3.5], fov: 32, near: 0.1, far: 200 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* text overlay */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end"
        style={{ paddingBottom: "10%" }}
      >
        <span
          className="font-sans text-caps-label uppercase tracking-[0.35em]"
          style={{
            color: "rgba(240, 234, 216, 0.55)",
            opacity: 0,
            transform: "translateY(16px)",
            animation: "intro3d-fadein 1.2s ease forwards 3.8s",
          }}
        >
          Turxplore
        </span>
        <span
          className="mt-2 font-serif text-body-large italic"
          style={{
            color: "rgba(212, 180, 164, 0.4)",
            opacity: 0,
            transform: "translateY(16px)",
            animation: "intro3d-fadein 1.2s ease forwards 4.3s",
          }}
        >
          Le Maroc, composé pour vous.
        </span>
      </div>

      {/* CSS vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(8,6,4,0.55) 100%)",
        }}
      />

      {/* skip */}
      <button
        onClick={skip}
        className="absolute bottom-5 right-5 z-10 font-sans text-caption uppercase tracking-[0.18em] text-parchment/25 transition-colors duration-300 hover:text-parchment/60"
        style={{
          opacity: 0,
          animation: "intro3d-fadein 0.8s ease forwards 2.5s",
        }}
      >
        Passer →
      </button>

      <style>{`
        @keyframes intro3d-fadein {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
