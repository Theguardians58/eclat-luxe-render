import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Simple 3D fabric/cloth representation
function FabricMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
      <planeGeometry args={[2, 2.5, 20, 25]} />
      <meshPhysicalMaterial
        color="#1a1a1e"
        metalness={0.1}
        roughness={0.8}
        transmission={0.05}
        thickness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
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
      
      {/* Fog for depth */}
      <fog attach="fog" args={['white', 5, 15]} />
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