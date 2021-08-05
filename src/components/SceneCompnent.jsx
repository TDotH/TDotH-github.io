import * as Babylon from '@babylonjs/core';
//import { StandardMaterial } from '@babylonjs/materials';
import React, { useEffect, useRef } from 'react';
import Console from './Console'

let box;

// const sound - new BABYLON.Sound("name, "url to sound file, scene, null { loop: true, autoplay: true });

/*
setupCamera = (scene) => {

}*/



const onSceneReady = (scene) => {
const canvas = scene.getEngine().getRenderingCanvas();
  var camera = new Babylon.UniversalCamera("camera1", new Babylon.Vector3(0, 2.5, -2), scene);
  var Console_camera = new Babylon.UniversalCamera('Console_camera', new Babylon.Vector3(0, 5, -10), scene);
  Console_camera.setTarget(Babylon.Vector3.Zero());
  camera.setTarget(new Babylon.Vector3(0, 0, 1.5));
  console.log(camera.rotation);
  console.log(camera.rotationQuaternion);
  scene.activeCamera = camera;
  camera.inputs.clear();
  camera.inputs.addMouse();
  camera.attachControl(canvas, true);
  //var input_manager = camera.inputs;


  var assets_manager = new Babylon.AssetsManager(scene);
  var mesh_task = assets_manager.addMeshTask("desk task", "", "./assets/models/", "desk.obj");
  assets_manager.load();
  assets_manager.onTaskErrorObservable.add(function (task) {
    console.log('task failed', task.errorObject.message, task.errorObject.exception);
  });
  mesh_task.onSuccess = function (task) {
    task.loadedMeshes[0].position = Babylon.Vector3.Zero();
    //console.log(task.loadedMeshes[0]);
  }

  mesh_task.onError = function (task, message, exception) {
    console.log(message, exception);
  }
  var light = new Babylon.HemisphericLight('light', new Babylon.Vector3(0, 1, 0), scene);
  light.intensity = 0.7;
  var ground = Babylon.MeshBuilder.CreateGround('ground', {width: 10, height: 10}, scene);
  ground.position.y = -2;
  return assets_manager;
};

const onRender = (scene) => {
  if (box !== undefined) {
    var delta_time_ms = scene.getEngine().getDeltaTime();

    const rpm = 19;
    box.rotation.y += (rpm / 60) & Math.PI * 2 * (delta_time_ms / 1000);
  }
}

export default (props) => {
    const react_canvas = useRef(null);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, ...rest } = props;

    useEffect(() => {
        if (react_canvas.current) {
            const engine = new Babylon.Engine(react_canvas.current, antialias, engineOptions, adaptToDeviceRatio);
            const scene = new Babylon.Scene(engine, sceneOptions);
            const console = new Console(engine, sceneOptions);
            if (scene.isReady()) {
                var assets_manager = onSceneReady(scene);
                var render_target = new Babylon.RenderTargetTexture('scene', {width: 512, height: 288},  console.getScene(), true);
                render_target.wrapR = 0;
                var plane = Babylon.MeshBuilder.CreatePlane('plane', {height: 9/16, width: 16/16}, scene);
                plane.position.z = -.5;
                plane.position.y = 1.5;
                //plane.position.x = 1;
                var plane_mat = new Babylon.StandardMaterial('plane_mat', scene);
                plane_mat.diffuseColor = new Babylon.Color3(1, 0, 0);
                plane.material = plane_mat;
                //render_target.renderList.push(MeshBuilder.CreateBox('box', {size: 2}));
                render_target.renderSprites = true;
                render_target.activeCamera = console.getCamera();
                scene.customRenderTargets.push(render_target);
                plane_mat.emissiveTexture = render_target;
                plane_mat.disableLighting = true;
                //plane_mat.wrapp
            } else {
                scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
            }

            assets_manager.onFinish = function(tasks) {
                engine.runRenderLoop(() => {
                    if (typeof onRender === 'function') {
                        onRender(scene);
                    }
                    console.render(engine);
                    render_target.render();
                    var delta_time_ms = engine.getDeltaTime();
                    const rpm = 2;
                    //plane.rotation.y += (rpm / 60) * Math.PI * 2 * (delta_time_ms / 1000);
                    scene.render();
                });
            }

            const resize = () => {
                engine.resize();
            };

            if (window) {
                window.addEventListener('resize', resize);
            }

            return () => {
                engine.dispose();

                if (window) {
                    window.removeEventListener('resize', resize);
                }
            };
        }
    }, [react_canvas]);

    return <canvas ref={react_canvas} {...rest} />;
};