'use client';
import React, { MutableRefObject } from 'react';
/**THREE Staff*/
import * as THREE from 'three';
/**R3F Staff**/
import { Canvas } from '@react-three/fiber';
/**Components**/
import Scene3D from '../3D_Scene/Scene3D';
/**Monitoring Staff**/
import { Perf } from 'r3f-perf';
import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera';

/**TS**/ interface Props {
  scrollProgress: MutableRefObject<number>;
  direction: MutableRefObject<number>;
}

/**--------------------------------------------**/
/*
default version of <Canvas> includs initial-settings of this element: scene, camera, renderer, antialias, encoding, etc.
we can set the attributes of camera her;
we can't play / animate with camera's attributer within useFrame() here!
*/
const MainCanvas = ({ scrollProgress, direction }: Props) => {
  /*
  (!) this "reference" is crucial; it allows 3D objects to react on user events!; 
  */
  let eventsRoot;
  if (typeof document !== 'undefined') {
    //document is accesible only on client! you are safe to use the "document" object here
    eventsRoot = document.getElementById('root') as HTMLDivElement;
  }

  /**JSX**/
  return (
    <Canvas
      eventSource={eventsRoot}
      // dpr={[1, 2]} // Canvas has this values in default settings
      // flat // means no toneMapping is applied = only default collors of odjects = no pseudo-HDR
      gl={{
        antialias: true,
        // toneMapping: THREE.CineonToneMapping,
        toneMapping: THREE.ACESFilmicToneMapping,
        // outputEncoding: THREE.LinearEncoding // depricated
        // outputColorSpace: 'srgb',
      }}
      // camera={{ position: [0, 0, 3], fov: 45, near: 0.1, far: 1000 }}
      //default: camera={{ position: [0, 0, 5],fov: 75, near: 0.1, far: 1000, zoom: 1 }}
      // onCreated={whileCanvasMounted}
      // onCreated={({ gl }) => {
      //   gl.toneMapping = THREE.NoToneMapping;
      // }}
    >
      <PerspectiveCamera
        makeDefault
        //
        // name="customePerspectiveCamera"
        // ref={cameraRef}
        position={[0, 0, 3]}
        far={5} //_____comments below
        fov={45}
      ></PerspectiveCamera>
      <Scene3D scrollProgress={scrollProgress} direction={direction} />
      <Perf position="bottom-right" />
    </Canvas>
  );
};

export default MainCanvas;

//___camera={{ fov: 10, position: [0, 0, -5] }}
