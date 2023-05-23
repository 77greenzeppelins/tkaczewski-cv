/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
'use client';
import React from 'react';
/**THREE Staff**/
import * as THREE from 'three';
/**Drei Staff**/
import { useGLTF } from '@react-three/drei';
/**Comoponents**/
import FrameMatcapTexture from '../../_Drei/textures/frameMatcapTextures/FrameMatcapTexture';
/**BasicData**/
import { assetsPaths } from '@/data/basicData';

/**TS**/
import { GLTF } from 'three-stdlib';
type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh;
    Plane001: THREE.Mesh;
  };
  materials: {
    ['default']: THREE.MeshStandardMaterial;
    ['default']: THREE.MeshStandardMaterial;
  };
};

interface Props {
  groupProps: JSX.IntrinsicElements['group'];
}

/**------------------------------------------------------------**/
const BasicFrame = ({ groupProps }: Props) => {
  /**GLTFLoader Section**/
  const { nodes } = useGLTF(assetsPaths.frame) as GLTFResult;

  /**JSX**/
  return (
    <group
      {...groupProps}
      // dispose={null}
    >
      <mesh
        name="PlaneOfBasicFrame"
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <FrameMatcapTexture textureIndex={'1'} />
      </mesh>
    </group>
  );
};

useGLTF.preload(assetsPaths.frame);

export default BasicFrame;
