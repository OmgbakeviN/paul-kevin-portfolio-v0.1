import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { skillGroups } from '../data/skills.js';

function ShapeGeometry({ index }) {
  switch (index) {
    case 0: return <icosahedronGeometry args={[1.35, 1]} />;
    case 1: return <torusKnotGeometry args={[.91, .29, 180, 16, 2, 5]} />;
    case 2: return <octahedronGeometry args={[1.36, 0]} />;
    case 3: return <torusKnotGeometry args={[.91, .23, 180, 15, 3, 7]} />;
    case 4: return <dodecahedronGeometry args={[1.25, 0]} />;
    default: return <icosahedronGeometry args={[1.36, 2]} />;
  }
}

const POINTS = [
  [2.08, .08, .12], [-2.0, .24, -.06],
  [-.9, 1.83, -.56], [.9, -1.79, .45],
  [1.68, 1.18, -.36], [-1.65, -1.12, .31],
];

function AnimatedForm({ activeIndex }) {
  const groupRef = useRef(null);
  const meshes = useRef([]);
  const palette = useMemo(() => skillGroups.map((skill) => new THREE.Color(skill.accent)), []);

  useFrame(({ pointer }, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y += delta * .19;
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, -.22 + pointer.y * .16, 2.2, delta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, pointer.x * -.11, 2.1, delta);

    meshes.current.forEach((mesh, index) => {
      if (!mesh) return;
      const selected = index === activeIndex;
      mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x, selected ? 1 : .67, 3.3, delta));
      mesh.material.opacity = THREE.MathUtils.damp(mesh.material.opacity, selected ? .92 : 0, 4.2, delta);
      mesh.rotation.y += delta * (index % 2 ? .035 : -.025);
      mesh.material.color.lerp(palette[activeIndex], Math.min(1, delta * 2.5));
    });
  });

  return <group ref={groupRef} rotation={[-.22, .34, 0]}>
    {skillGroups.map((skill, index) => <mesh
      key={skill.id}
      ref={(element) => { meshes.current[index] = element; }}
      scale={index === 0 ? 1 : .67}
    >
      <ShapeGeometry index={index} />
      <meshPhysicalMaterial
        color={skill.accent}
        emissive={skill.accent}
        emissiveIntensity={.16}
        metalness={.39}
        roughness={.2}
        clearcoat={.75}
        clearcoatRoughness={.16}
        transparent
        opacity={index === 0 ? .92 : 0}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>)}

    <mesh rotation={[.48, .21, -.24]}>
      <torusGeometry args={[1.99, .011, 5, 150]} />
      <meshBasicMaterial color="#baa1ef" transparent opacity={.42} depthWrite={false} />
    </mesh>
    <mesh rotation={[-.69, .66, .15]}>
      <torusGeometry args={[2.23, .006, 5, 150]} />
      <meshBasicMaterial color="#8e7aab" transparent opacity={.27} depthWrite={false} />
    </mesh>
    {POINTS.map((point, index) => <mesh key={index} position={point}>
      <sphereGeometry args={[index % 3 === 0 ? .055 : .035, 10, 8]} />
      <meshBasicMaterial color={index % 2 === 0 ? '#d8c6fa' : '#eccc86'} />
    </mesh>)}
  </group>;
}

function SculptureScene({ activeIndex }) {
  return <>
    <ambientLight intensity={1.55} />
    <directionalLight color="#e4c7ff" intensity={4.5} position={[3, 4, 5]} />
    <pointLight color="#8f60e7" intensity={28} distance={9} position={[-2.7, -1.5, 3]} />
    <AnimatedForm activeIndex={activeIndex} />
  </>;
}

export default function SkillSculpture({ activeIndex, sectionVisible }) {
  const [webglSupported, setWebglSupported] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPreferenceChange = () => setReducedMotion(preference.matches);
    onPreferenceChange();
    preference.addEventListener?.('change', onPreferenceChange);

    try {
      const canvas = document.createElement('canvas');
      setWebglSupported(Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')));
    } catch {
      setWebglSupported(false);
    }
    return () => preference.removeEventListener?.('change', onPreferenceChange);
  }, []);

  return <div className="sk-sculpture" role="img" aria-label={`Interactive 3D illustration for ${skillGroups[activeIndex].title}`}>
    {webglSupported && !reducedMotion
      ? <Canvas camera={{ position: [0, 0, 6.1], fov: 49 }} dpr={[1, 1.6]} frameloop={sectionVisible ? 'always' : 'demand'} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}>
        <SculptureScene activeIndex={activeIndex} />
      </Canvas>
      : <div className="sk-sculpture-fallback" aria-hidden="true"><span /><span /><span /></div>}
  </div>;
}
