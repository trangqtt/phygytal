// @ts-nocheck
import { Canvas, extend, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Preload,
  Stats,
  useGLTF,
} from "@react-three/drei";
extend({ OrbitControls });
import { Suspense, useEffect, useRef, useState } from "react";
import CanvasLoader from "./Loader";
import * as THREE from "three";
import { Box3, Vector3 } from "three";
// import { prodMode } from "@/constant";

const ThreeAsset = ({
  assetUrl,
  isTablet,
}: {
  assetUrl: string;
  isTablet: boolean;
}) => {
  const model = useGLTF(assetUrl);
  const primitiveRef = useRef<THREE.Object3D>(null);
  const { scene, gl, camera } = useThree();

  /**
   * The function calculates a suitable scale factor based on the viewport width and the size of a 3D
   * object.
   * @param {number} viewportWidth - The viewportWidth parameter represents the width of the viewport
   * or the width of the screen where the object will be displayed.
   * @param object - The `object` parameter is an instance of `THREE.Object3D`, which represents a 3D
   * object in the Three.js library. It can be any type of 3D object, such as a mesh, group, or sprite.
   * @returns the scaleFactor.
   */
  const findSuitableScale = (
    viewportWidth: number,
    object: THREE.Object3D,
    dividedBy = 15
  ) => {
    //bouding box of 3D object
    const boundingBox = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    boundingBox.getSize(size);

    const maxDimension = Math.max(size.x, size.y, size.z);

    // 370: height of 3d div section
    // 0.8 vs 15: to ensure the object is not scaled too large by default, allowing it to fit within the viewport
    const scaleFactor =
      (Math.min(viewportWidth, window.innerHeight) * 0.8) /
      maxDimension /
      dividedBy;

    return scaleFactor;
  };

  const findSuitablePosition = (
    viewportWidth: number,
    object: THREE.Object3D
  ) => {
    const box3 = new Box3().setFromObject(object);
    const vector = new Vector3();
    box3.getCenter(vector);

    // const spotLight = new THREE.SpotLight("#ffffff", 1);
    // spotLight.target = object;
    // spotLight.position.set(
    //   camera.position.x + 10,
    //   camera.position.y + 10,
    //   camera.position.z + 10
    // );
    // scene.add(spotLight);

    // gl.toneMapping = THREE.LinearToneMapping;
    // gl.toneMappingExposure = 2;
    // gl.shadowMap.enabled = true;

    object.position.set(0, -vector.y / 2, 0);
  };

  // https://assets.nomion.io-dev/images/user_id/1688546558-Tình Biển - Phan Quỳnh Hương.glb
  // https://assets.nomion.io-dev/images/user_id/1688546973-Đùm Bọc - Mai Thanh Thiện.glb
  // https://assets.nomion.io-dev/images/user_id/1688547178-Đà Nẵng Tình Người - Đỗ Văn Hiệu.glb

  useEffect(() => {
    if (model.scene.scale.equals(new THREE.Vector3(1, 1, 1))) {
      const scale = findSuitableScale(
        window.innerWidth,
        model.scene,
        isTablet ? 40 : 15
      );

      if (primitiveRef.current) {
        primitiveRef.current.scale.set(scale, scale, scale);
      }

      // findSuitablePosition(window.innerWidth, model.scene);
    }

    const animate = () => {
      requestAnimationFrame(animate);

      // Update cube rotation or other animations here

      // Render the scene
      gl.render(scene, camera);
    };

    animate();

    // Zoom-In Effect
    const zoomInDuration = 2500; // milliseconds
    const targetZoom = 2; // Target zoom level
    const startTime = Date.now();

    const updateCameraZoom = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / zoomInDuration, 1); // Clamp progress between 0 and 1
      const currentZoom = camera.position.z;

      // Calculate the new camera position and field of view
      // camera.position.z = currentZoom + (targetZoom - currentZoom) * progress;
      camera.zoom = 1 + (17 - 1) * progress; // Adjust the field of view

      camera.updateProjectionMatrix(); // Update the camera's projection matrix

      if (progress < 1) {
        requestAnimationFrame(updateCameraZoom);
      }
    };

    updateCameraZoom();
    findSuitablePosition(window.innerWidth, model.scene);

    return () => {
      // Clean up Three.js resources when component unmounts
      gl.dispose();
    };
  }, [model.scene]);

  return (
    <mesh>
      {/* <Environment preset={"city"} blur={0} /> */}
      <primitive object={model.scene} rotation={[0, 0, 0]} ref={primitiveRef} />
      {/* {true && (
        <>
          <axesHelper args={[500]} />
          <Stats />
        </>
      )} */}
    </mesh>
  );
};

const ThreeModel = ({ assetUrl }: { assetUrl: string }) => {
  return (
    <model-viewer
      ar
      camera-controls
      auto-rotate
      src={assetUrl}
      alt="3D model"
      disable-pan
      disable-tap
    ></model-viewer>
  );
};

export default ThreeModel;
