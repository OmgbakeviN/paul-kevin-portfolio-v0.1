import React, { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, useGLTF } from '@react-three/drei';

const MATERIALS = {
  shell: '#252337',
  metal: '#ded7ef',
  purple: '#9475e8',
  pink: '#eb98d8',
  muted: '#b1a9c6',
};

// Mouse interaction settings. Adjust these values to tune the strength without
// touching the scroll-driven animation in Hero.jsx.
const MOTION = {
  sceneTiltX: 0.12,
  sceneTiltY: 0.17,
  sceneMoveX: 0.12,
  sceneMoveY: 0.09,
  moduleMoveX: 0.42,
  moduleMoveY: 0.22,
  moduleTilt: 0.27,
  smoothing: 4.5,
};

// The pointer influence disappears during the dark reveal, preserving the
// scroll transition the user already likes.
const pointerWeight = (progress) => 1 - THREE.MathUtils.smoothstep(progress, 0.26, 0.75);

function useHoverFeedback() {
  const [hovered, setHovered] = useState(false);
  useEffect(() => () => { document.body.style.cursor = ''; }, []);
  return {
    hovered,
    handlers: {
      onPointerOver: (event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      },
      onPointerOut: (event) => {
        event.stopPropagation();
        setHovered(false);
        document.body.style.cursor = '';
      },
    },
  };
}

function ModuleLabel({ title, index, target, position, onNavigate }) {
  return (
    <Html position={position} center distanceFactor={8.5} zIndexRange={[9, 1]}>
      <button className="module-label" onClick={() => onNavigate(target)} title={`Explore ${title}`}>
        <span className="module-label-index">{index}</span>
        <span>{title}</span>
        <span className="module-label-arrow" aria-hidden="true">↗</span>
      </button>
    </Html>
  );
}

function CoreModel({ progressRef, pointerRef }) {
  const group = useRef();
  const { scene } = useGLTF('/models/connected-core.glb');
  useFrame((state, delta) => {
    if (!group.current) return;
    const p = progressRef.current;
    const mouse = pointerRef.current;
    const influence = pointerWeight(p);
    group.current.rotation.y += delta * (0.19 + p * 1.1);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, mouse.y * 0.23 * influence, MOTION.smoothing, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, p * -0.7 + mouse.x * 0.18 * influence, 3, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, mouse.x * 0.12 * influence, MOTION.smoothing, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, mouse.y * 0.09 * influence, MOTION.smoothing, delta);
    const s = 1 + p * 0.32;
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, s, 3, delta));
  });
  return (
    <group ref={group}>
      <primitive object={scene} scale={0.76} />
      <pointLight position={[0.3, 0.4, 1.4]} intensity={13} color="#b996ff" distance={3.8}/>
      <mesh scale={0.54}>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshPhysicalMaterial color="#a68bf6" emissive="#8a62e5" emissiveIntensity={0.85} roughness={0.12} metalness={0.32} transmission={0.28} thickness={0.65} />
      </mesh>
    </group>
  );
}

function LaptopModule({ position, progressRef, pointerRef, onNavigate }) {
  const group = useRef();
  const { hovered, handlers } = useHoverFeedback();
  useFrame((state, delta) => {
    if (!group.current) return;
    const p = progressRef.current;
    const mouse = pointerRef.current;
    const influence = pointerWeight(p);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -0.2 - p * 0.65 + mouse.x * MOTION.moduleTilt * influence, MOTION.smoothing, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.1 - mouse.y * 0.22 * influence, MOTION.smoothing, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, position[0] - p * 1.0 - mouse.x * MOTION.moduleMoveX * influence, MOTION.smoothing, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, position[1] + mouse.y * MOTION.moduleMoveY * influence, MOTION.smoothing, delta);
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, hovered ? 1.1 : 1, 6, delta));
  });
  return (
    <Float speed={1.3} rotationIntensity={0.11} floatIntensity={0.22}>
      <group ref={group} position={position} rotation={[0.1, -0.18, -0.13]} onClick={() => onNavigate('work')} {...handlers}>
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[1.2, 0.77, 0.055]} />
          <meshStandardMaterial color={MATERIALS.shell} metalness={0.55} roughness={0.28} />
        </mesh>
        <mesh position={[0, 0.12, 0.035]}>
          <planeGeometry args={[1.08, 0.65]} />
          <meshBasicMaterial color="#17142c" />
        </mesh>
        <mesh position={[-0.26, 0.32, 0.04]}>
          <planeGeometry args={[0.39, 0.035]} />
          <meshBasicMaterial color="#af8eff" />
        </mesh>
        <mesh position={[-0.22, 0.16, 0.041]}>
          <planeGeometry args={[0.47, 0.035]} />
          <meshBasicMaterial color="#d6cde9" />
        </mesh>
        <mesh position={[-0.32, 0.065, 0.041]}>
          <planeGeometry args={[0.28, 0.035]} />
          <meshBasicMaterial color="#6c5a97" />
        </mesh>
        <mesh position={[0.34, 0.025, 0.041]}>
          <planeGeometry args={[0.24, 0.26]} />
          <meshBasicMaterial color="#6c4eb3" />
        </mesh>
        <mesh position={[0, -0.32, 0.1]} rotation={[-0.7, 0, 0]}>
          <boxGeometry args={[1.35, 0.45, 0.035]} />
          <meshStandardMaterial color="#b9b2c9" metalness={0.75} roughness={0.27} />
        </mesh>
        <ModuleLabel index="01" title="WEB SYSTEMS" target="work" position={[0, 0.91, 0]} onNavigate={onNavigate}/>
      </group>
    </Float>
  );
}

function NetworkModule({ position, progressRef, pointerRef, onNavigate }) {
  const group = useRef();
  const { hovered, handlers } = useHoverFeedback();
  const nodes = [
    [-0.42, 0.18, 0.12], [0.08, 0.48, -0.12], [0.5, 0.16, 0.17],
    [-0.2, -0.36, 0.15], [0.36, -0.34, -0.12], [0.02, 0, 0.45],
  ];
  const edges = [[0,1],[1,2],[0,3],[3,4],[4,2],[5,0],[5,2],[5,4]];
  useFrame((state, delta) => {
    if (!group.current) return;
    const p = progressRef.current;
    const mouse = pointerRef.current;
    const influence = pointerWeight(p);
    group.current.rotation.y += delta * 0.19;
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, mouse.x * -0.25 * influence, MOTION.smoothing, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, mouse.y * 0.28 * influence, MOTION.smoothing, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, position[0] + p * 1.1 + mouse.x * MOTION.moduleMoveX * influence, MOTION.smoothing, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, position[1] + mouse.y * MOTION.moduleMoveY * influence, MOTION.smoothing, delta);
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, hovered ? 1.16 : 1, 6, delta));
  });
  return (
    <Float speed={1.5} rotationIntensity={0.13} floatIntensity={0.27}>
      <group ref={group} position={position} onClick={() => onNavigate('expertise')} {...handlers}>
        {edges.map(([a,b],index) => {
          const p1 = new THREE.Vector3(...nodes[a]);
          const p2 = new THREE.Vector3(...nodes[b]);
          const dir = new THREE.Vector3().subVectors(p2,p1);
          return (
            <mesh key={index} position={p1.clone().add(p2).multiplyScalar(0.5)} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),dir.clone().normalize())}>
              <cylinderGeometry args={[0.009, 0.009, dir.length(), 5]} />
              <meshBasicMaterial color="#c4a9f9" />
            </mesh>
          );
        })}
        {nodes.map((p, index) => (
          <mesh key={index} position={p}>
            <icosahedronGeometry args={[index===5 ? 0.15 : 0.11, 1]} />
            <meshPhysicalMaterial color={index===5 ? MATERIALS.pink : MATERIALS.purple} emissive="#7250c8" emissiveIntensity={0.6} metalness={0.36} roughness={0.15}/>
          </mesh>
        ))}
        <ModuleLabel index="02" title="AI & AUTOMATION" target="expertise" position={[0, 0.98, 0]} onNavigate={onNavigate}/>
      </group>
    </Float>
  );
}

function MobileModule({ position, progressRef, pointerRef, onNavigate }) {
  const group = useRef();
  const { hovered, handlers } = useHoverFeedback();
  useFrame((state, delta) => {
    if (!group.current) return;
    const p = progressRef.current;
    const mouse = pointerRef.current;
    const influence = pointerWeight(p);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, -0.15 + p * 0.6 + mouse.x * 0.2 * influence, MOTION.smoothing, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -0.4 + mouse.x * MOTION.moduleTilt * influence, MOTION.smoothing, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.08 - mouse.y * 0.17 * influence, MOTION.smoothing, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, position[0] + p * 1.3 + mouse.x * MOTION.moduleMoveX * influence, MOTION.smoothing, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, position[1] + mouse.y * MOTION.moduleMoveY * influence, MOTION.smoothing, delta);
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, hovered ? 1.12 : 1, 6, delta));
  });
  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.23}>
      <group ref={group} position={position} rotation={[0.08, -0.4, -0.15]} onClick={() => onNavigate('work')} {...handlers}>
        <mesh><boxGeometry args={[0.62, 1.1, 0.095]} /><meshStandardMaterial color="#b4aac8" metalness={0.85} roughness={0.22} /></mesh>
        <mesh position={[0, 0, 0.051]}><planeGeometry args={[0.55, 1.0]} /><meshBasicMaterial color="#20132e" /></mesh>
        <mesh position={[0, 0.18, 0.053]}><circleGeometry args={[0.2, 36]} /><meshBasicMaterial color="#8f55cb" /></mesh>
        <mesh position={[0, 0.18, 0.054]}><torusGeometry args={[0.19, 0.012, 8, 36]} /><meshBasicMaterial color="#d5bafb" /></mesh>
        <mesh position={[0, -0.15, 0.054]}><planeGeometry args={[0.34, 0.037]} /><meshBasicMaterial color="#f8e7ff" /></mesh>
        <mesh position={[0, -0.25, 0.054]}><planeGeometry args={[0.26, 0.02]} /><meshBasicMaterial color="#9971c6" /></mesh>
        <mesh position={[0, -0.43, 0.054]}><planeGeometry args={[0.2, 0.018]} /><meshBasicMaterial color="#d2b8f5" /></mesh>
        <ModuleLabel index="03" title="MOBILE APPS" target="work" position={[0, -0.86, 0]} onNavigate={onNavigate}/>
      </group>
    </Float>
  );
}

function CreativeModule({ position, progressRef, pointerRef, onNavigate }) {
  const group = useRef();
  const { hovered, handlers } = useHoverFeedback();
  useFrame((state, delta) => {
    if (!group.current) return;
    const p = progressRef.current;
    const mouse = pointerRef.current;
    const influence = pointerWeight(p);
    group.current.rotation.x += delta * 0.12;
    group.current.rotation.z += delta * 0.18;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, mouse.x * 0.34 * influence, MOTION.smoothing, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, position[0] - p * 1.1 - mouse.x * MOTION.moduleMoveX * influence, MOTION.smoothing, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, position[1] + mouse.y * MOTION.moduleMoveY * influence, MOTION.smoothing, delta);
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, hovered ? 1.13 : 1, 6, delta));
  });
  return (
    <Float speed={1.1} rotationIntensity={0.19} floatIntensity={0.35}>
      <group ref={group} position={position} onClick={() => onNavigate('work')} {...handlers}>
        <mesh><torusKnotGeometry args={[0.34, 0.12, 110, 10, 2, 3]} /><meshPhysicalMaterial color="#dfc8f3" metalness={0.66} roughness={0.12} clearcoat={1} clearcoatRoughness={0.08} /></mesh>
        <mesh rotation={[1.1, 0.1, 0.3]}><torusGeometry args={[0.73, 0.012, 7, 70]} /><meshBasicMaterial color="#8e75c8" /></mesh>
        <ModuleLabel index="04" title="CREATIVE TECH" target="work" position={[0, -0.9, 0]} onNavigate={onNavigate}/>
      </group>
    </Float>
  );
}

function UniverseObjects({ progressRef, pointerRef, onNavigate, compact }) {
  const root = useRef();
  useFrame((state, delta) => {
    if (!root.current) return;
    const p = progressRef.current;
    const pointer = pointerRef.current;
    const influence = compact ? 0 : pointerWeight(p);
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.x * MOTION.sceneTiltY * influence + p * 1.4, MOTION.smoothing, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -pointer.y * MOTION.sceneTiltX * influence - p * 0.12, MOTION.smoothing, delta);
    root.current.position.x = THREE.MathUtils.damp(root.current.position.x, pointer.x * MOTION.sceneMoveX * influence, MOTION.smoothing, delta);
    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, pointer.y * MOTION.sceneMoveY * influence, MOTION.smoothing, delta);
    root.current.position.z = THREE.MathUtils.damp(root.current.position.z, p * 2.6, 2.0, delta);
    root.current.scale.setScalar(THREE.MathUtils.damp(root.current.scale.x, compact ? 0.8 : 1, 3, delta));
  });
  return (
    <group ref={root}>
      <CoreModel progressRef={progressRef} pointerRef={pointerRef}/>
      <LaptopModule position={[-2.02, 1.12, 0]} progressRef={progressRef} pointerRef={pointerRef} onNavigate={onNavigate}/>
      <NetworkModule position={[1.99, 0.92, 0]} progressRef={progressRef} pointerRef={pointerRef} onNavigate={onNavigate}/>
      <MobileModule position={[2.11, -1.33, 0.2]} progressRef={progressRef} pointerRef={pointerRef} onNavigate={onNavigate}/>
      <CreativeModule position={[-2, -1.31, 0.2]} progressRef={progressRef} pointerRef={pointerRef} onNavigate={onNavigate}/>
    </group>
  );
}

function SceneErrorBoundary({ children }) {
  // Function wrapper, error boundary below keeps WebGL failures from hiding the portfolio.
  return <WebGLBoundary>{children}</WebGLBoundary>;
}
class WebGLBoundary extends React.Component {
  constructor(props) { super(props); this.state={failed:false}; }
  static getDerivedStateFromError() { return {failed:true}; }
  render() {
    if (this.state.failed) return <div className="scene-fallback" role="img" aria-label="Abstract violet technology sculpture"><span>◉</span><span>CREATIVE ENGINEERING</span></div>;
    return this.props.children;
  }
}

export default function Universe({ progressRef, onNavigate }) {
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 800px)').matches);
  const pointerRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const media = window.matchMedia('(max-width: 800px)');
    const update = (event) => {
      setCompact(event.matches);
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
    };
    media.addEventListener('change',update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    // Listen across the entire viewport. In V0.1 R3F only updated its pointer
    // while the cursor was above the Canvas, which covers the right half.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactViewport = window.matchMedia('(max-width: 800px)');
    const update = (event) => {
      if (event.pointerType === 'touch' || reducedMotion.matches || compactViewport.matches) return;
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = 1 - (event.clientY / window.innerHeight) * 2;
    };
    const reset = () => {
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
    };
    window.addEventListener('pointermove', update, { passive: true });
    window.addEventListener('blur', reset);
    document.addEventListener('mouseleave', reset);
    return () => {
      window.removeEventListener('pointermove', update);
      window.removeEventListener('blur', reset);
      document.removeEventListener('mouseleave', reset);
    };
  }, []);
  return (
    <SceneErrorBoundary>
      <Canvas camera={{position:[0,0,8.4], fov:35}} dpr={[1,1.6]} gl={{antialias:true, alpha:true, powerPreference:'high-performance'}} style={{background:'transparent'}}>
        <ambientLight intensity={1.25}/>
        <directionalLight position={[4,6,8]} intensity={2.1} color="#fff7ff"/>
        <directionalLight position={[-4,-2,2]} intensity={1.15} color="#8658d9"/>
        <pointLight position={[0,1,-2]} color="#ba91ff" intensity={24} distance={9}/>
        <Suspense fallback={null}>
          <UniverseObjects progressRef={progressRef} pointerRef={pointerRef} onNavigate={onNavigate} compact={compact}/>
        </Suspense>
      </Canvas>
    </SceneErrorBoundary>
  );
}

useGLTF.preload('/models/connected-core.glb');
