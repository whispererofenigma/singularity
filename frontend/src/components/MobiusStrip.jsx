import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry";

const MobiusStrip = () => {
  const stripRef = useRef();

  // Rotation animation
  useFrame(() => {
    if (stripRef.current) {
      stripRef.current.rotation.z += 0.01; // Rotate around Z-axis
     
    }
  });

  // Generate Möbius strip geometry with gradient colors
  const geometry = useMemo(() => {
    const mobiusFunc = (u, v, target) => {
      u *= Math.PI * 2;
      v = v * 2 - 1;
      const a = 8;

      const x = (a + v * Math.cos(u / 2)) * Math.cos(u);
      const y = (a + v * Math.cos(u / 2)) * Math.sin(u);
      const z = v * Math.sin(u / 2);

      target.set(x, y, z);
    };

    const geom = new ParametricGeometry(mobiusFunc, 80, 20);
    const colors = [];

    // Assign a color gradient based on the u parameter
    const colorA = new THREE.Color("gray");
    const colorB = new THREE.Color("gray");

    for (let i = 0; i < geom.attributes.position.count; i++) {
      const u = geom.attributes.uv.getX(i);
      const smoothFactor = (Math.sin(u * Math.PI * 2) + 1) / 2; // Smooth oscillation
      const color = colorA.clone().lerp(colorB, smoothFactor);

      colors.push(color.r, color.g, color.b);
    }

    geom.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    return geom;
  }, []);

  return (
    <mesh ref={stripRef} geometry={geometry} scale={0.5}>
      {/* Gradient effect using vertex colors */}
      <meshStandardMaterial vertexColors side={THREE.DoubleSide} />
    </mesh>
  );
};


const MobiusScene = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "black" }}>
      <Canvas camera={{ position: [0, 3, 5], fov: 100 }}>
        <ambientLight intensity={0.7} />
        {/* Main directional light for highlights */}
        <directionalLight position={[5, 5, 5]} intensity={4} />

        {/* Fill light from the opposite side to balance shadows */}
        <directionalLight position={[-5, -2, 3]} intensity={4} />

        {/* Back light for subtle rim lighting (optional) */}
        <directionalLight position={[0, -5, 5]} intensity={4} />
        <MobiusStrip />
      </Canvas>
    </div>
  );
};

export default MobiusScene;
