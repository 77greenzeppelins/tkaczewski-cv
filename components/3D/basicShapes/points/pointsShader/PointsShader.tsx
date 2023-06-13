import { useFrame } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
/**THREE Staff*/
import * as THREE from 'three';
/**R3F staff*/
// import { BufferAttribute, PointsMaterial } from 'three';
/**Shaders**/
import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';
// import someFake100 from './someFake100';
// import vertexShader from '@/components/3D/shaders/planes/movingPlane/vertexShader';
// import fragmentShader from '@/components/3D/shaders/planes/movingPlane/fragmentShader';

/**TS**/
interface Props {
  verticesNumber: number;
  shape: 'box' | 'sphere';
  radius?: number;
}
const PointsShader = ({ verticesNumber, radius = 1, shape }: Props) => {
  /**References**/
  const pointsRef = useRef<THREE.Points>(null!);
  //   const pointsRef = useRef(null!);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null!);

  /*
  Section Layout
  */
  //___attributes array
  const particlesPosition = useMemo(() => {
    //___all x,y,z values for each vertex
    const positions = new Float32Array(verticesNumber * 3);

    //___
    if (shape === 'box') {
      for (let i = 0; i < verticesNumber; i++) {
        //__Generate random values for x, y, and z on every loop
        let x = (Math.random() - 0.5) * 2;
        let y = (Math.random() - 0.5) * 2;
        let z = (Math.random() - 0.5) * 2;
        //__We add the 3 values to the attribute array for every loop
        positions.set([x, y, z], i * 3);
      }
    }

    if (shape === 'sphere') {
      for (let i = 0; i < verticesNumber; i++) {
        // const distance = 1;
        const distance = Math.sqrt(Math.random()) * radius;
        const theta = THREE.MathUtils.randFloatSpread(360);
        const phi = THREE.MathUtils.randFloatSpread(360);

        let x = distance * Math.sin(theta) * Math.cos(phi);
        let y = distance * Math.sin(theta) * Math.sin(phi);
        let z = distance * Math.cos(theta);

        positions.set([x, y, z], i * 3);
      }
    }
    //__return section
    return positions;
  }, [verticesNumber, shape, radius]);

  /*
  Section Animate / Manipulate / make shaders
  */
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_radius: {
        value: radius,
      },
      u_colorA: { value: new THREE.Color('#FFE486') },
      u_colorB: { value: new THREE.Color('#FEB3D9') },
    }),
    [radius]
  );

  useFrame(state => {
    const { clock } = state;
    shaderMaterialRef.current.uniforms.u_time.value = clock.getElapsedTime();
  });

  //   useFrame(state => {
  //     // (pointsRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
  //     //   state.clock.elapsedTime;
  //     shaderMaterialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
  //   });

  //   useEffect(() => {
  //     console.log(
  //       'pointsRef',
  //       //__this is a type casting
  //       (pointsRef.current.material as THREE.ShaderMaterial).uniforms
  //     );
  //     console.log(
  //       'shaderMaterialRef',
  //       //__this is a type casting
  //       shaderMaterialRef.current.uniforms
  //     );
  //   }, []);

  /**JSX**/
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          //__attach is how we specify the name of our attribute
          attach="attributes-position"
          //__ count is the total number of vertex our geometry will have. In our case, it is the number of particles we will end up rendering
          count={particlesPosition.length / 3}
          array={particlesPosition}
          //___itemSize represents the number of values from our attributes array associated with one item/vertex
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        blending={THREE.AdditiveBlending}
        ref={shaderMaterialRef}
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </points>
  );
};

export default PointsShader;