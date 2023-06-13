import { useFrame } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
/**THREE Staff*/
import * as THREE from 'three';
/**R3F staff*/
import { BufferAttribute, PointsMaterial } from 'three';

/**TS**/
interface Props {
  verticesNumber: number;
  shape: 'box' | 'sphere';
  pointSize: number;
}
const PointsBuffered = ({ verticesNumber, shape, pointSize }: Props) => {
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
        const distance = 1;

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
  }, [verticesNumber, shape]);

  useFrame(({ clock }) => {
    /*
    __1. this is a problematic approach
    __2. firs of all, generates some TS problems
    __3. secondly, isn't performant at all!
    */
    // for (let i = 0; i < verticesNumber; i++) {
    //   //   const valueGap = i * 3;
    //   //   pointsRef.current.geometry.attributes.position.array[valueGap] +=
    //   //     Math.sin(clock.elapsedTime + Math.random() * 10) * 0.01;
    //   //   pointsRef.current.geometry.attributes.position.array[valueGap] +=
    //   //     Math.sin(clock.elapsedTime + Math.random() * 10) * 0.01;
    //   // pointsRef.current.geometry.attributes.position.array[valueGap + 1] +=
    //   //   Math.cos(clock.elapsedTime + Math.random() * 10) * 0.01;
    //   // pointsRef.current.geomet: y.attributes.position.array[valueGap + 2] +=
    //   //   Math.sin(clock.elapsedTime + Math.random() * 10) * 0.01;
    // }
    // pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

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
      <pointsMaterial
        size={pointSize}
        color="#5786F5"
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

export default PointsBuffered;