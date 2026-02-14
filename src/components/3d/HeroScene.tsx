'use client';

import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

export function HeroScene() {
    return (
        <ErrorBoundary
            fallback={
                <div className="h-full w-full absolute inset-0 z-0 bg-linear-to-br from-slate-950 via-[#1e1b4b] to-slate-950" />
            }
        >
            <Canvas
                className="h-full w-full absolute inset-0 z-0"
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                camera={{ position: [0, 0, 5], fov: 45 }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[3, 2, 1]} />
                <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                    <Sphere args={[1, 100, 200]} scale={2.4}>
                        <MeshDistortMaterial
                            color="#4c1d95"
                            attach="material"
                            distort={0.5}
                            speed={2}
                            wireframe
                        />
                    </Sphere>
                </Float>
            </Canvas>
        </ErrorBoundary>
    );
}
