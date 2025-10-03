import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// Animated fabric mesh with wave effects
function FabricMesh() {
  const prefersReducedMotion = useReducedMotion();
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current && !prefersReducedMotion) {
      const time = state.clock.elapsedTime;
      
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.15;
      meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.15 + (hovered ? 0.2 : 0);
      
      // Wave effect on geometry
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const positions = geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const wave = Math.sin(x * 2 + time) * Math.cos(y * 2 + time) * 0.1;
        positions.setZ(i, wave);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={[0, 0, 0]} 
      castShadow 
      receiveShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[2, 2.5, 32, 40]} />
      <meshPhysicalMaterial
        color={hovered ? "#2a2a3e" : "#1a1a1e"}
        metalness={0.2}
        roughness={0.7}
        transmission={0.1}
        thickness={0.2}
        clearcoat={0.3}
        clearcoatRoughness={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Floating particle system
function Particles() {
  const prefersReducedMotion = useReducedMotion();
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
  }
  
  useFrame((state) => {
    if (pointsRef.current && !prefersReducedMotion) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={8}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-3, 3, -3]} intensity={0.3} />
      
      {/* Environment */}
      <Environment preset="studio" />
      
      {/* 3D Content */}
      <FabricMesh />
      <Particles />
      
      {/* Background sphere for ambiance */}
      <mesh position={[0, 0, -2]} scale={[8, 8, 8]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#f0f0f0" side={THREE.BackSide} />
      </mesh>
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#f8f9fa', 5, 15]} />
    </>
  );
}

interface ProductViewer3DProps {
  className?: string;
}

export default function ProductViewer3D({ className = "" }: ProductViewer3DProps) {
  return (
    <div className={`w-full h-full bg-subtle rounded-lg overflow-hidden ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      
      {/* Fallback content for accessibility */}
      <div className="sr-only">
        Interactive 3D product viewer. Use mouse or touch to rotate and zoom the product model.
      </div>
    </div>
  );
}