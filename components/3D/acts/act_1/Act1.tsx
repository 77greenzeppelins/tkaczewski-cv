'use client';
import React, { MutableRefObject, useRef } from 'react';
import { usePathname } from 'next/navigation';
/**Components**/
import BasicFrame from '../../customeObjects/frame/BasicFrame';
import ImageCanvas from '../../customeObjects/imageCanvas/ImageCanvas';
import Triangles from '../../customeObjects/tiangles/Triangles';
/**THREE staff*/
import * as THREE from 'three';
/**R3F Staff*/
import { useFrame } from '@react-three/fiber';
/**Drei Staff*/
import { Float } from '@react-three/drei';
/**BasicData*/
import { pagesLinks, assetsPaths, imagesData } from '@/data/basicData';

/**TS**/
interface Props {
  scrollProgress: MutableRefObject<number>;
  direction: MutableRefObject<number>;
}
/**-----------------**/
const Act1 = ({ scrollProgress, direction }: Props) => {
  /**References**/
  const groupRef = useRef<THREE.Group>(null!);

  /**Condition of visibility**/
  const path = usePathname();
  const isVisible = path === pagesLinks[0].href;

  /**useFrame Section**/
  useFrame(state => {
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      (state.mouse.x * Math.PI) / 8,
      0.05
    );
    // groupRef.current.rotation.x = THREE.MathUtils.lerp(
    //   groupRef.current.rotation.x,
    //   (state.mouse.y * Math.PI) / -8,
    //   0.05
    // );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      (state.mouse.y * Math.PI) / 50,
      0.01
    );
  });

  /**JSX**/
  return (
    <>
      <group
        ref={groupRef}
        visible={isVisible}
        onClick={() => {
          console.log('..............');
        }}
      >
        <Float
          speed={2} // Animation speed, defaults to 1
          rotationIntensity={0.25} // XYZ rotation intensity, defaults to 1
          floatIntensity={0.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={[-0.05, 0.05]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          <BasicFrame
            groupProps={{ position: [0, 0, 0], scale: [0.86, 1, 1.13] }}
          />
          <ImageCanvas
            meshProps={{ scale: [0.9, 0.85, 0.85] }}
            argsWidth={imagesData.botticelliVenus.width * 2}
            argsHeight={imagesData.botticelliVenus.height * 2}
            image={imagesData.botticelliVenus.path}
          />
        </Float>

        <Triangles
          meshProps={{ position: [-1, 0, 0], scale: [0.2, 0.2, 0.2] }}
          matcapMaterial={true}
        />
      </group>
    </>
  );
};

export default Act1;

{
  /* <PivotControls
          anchor={[0, 0, 0]}
          depthTest={false}
          lineWidth={2}
          //   scale={100}
          //   fixed={true}
        >
          <Box position={[-1.2, 0, 0]} />
        </PivotControls> */
}

{
  /* {path === pagesLinks[0].href ? (
          <Float
            speed={2} // Animation speed, defaults to 1
            rotationIntensity={1} // XYZ rotation intensity, defaults to 1
            floatIntensity={0.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[0, 0.3]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
          >
            <BasicFrame
              groupProps={{ position: [0, 0, 0] }}
              variantsSwitcher={1}
            />
          </Float>
        ) : null} */
}

{
  /* {path === pagesLinks[1].href ? (
          <BasicFrame
            groupProps={{ position: [0, 0, 0] }}
            variantsSwitcher={0}
          />
        ) : null} */
}

{
  /* <BasicFrame groupProps={{ position: [0, 0, 0] }} variantsSwitcher={0} /> */
}
