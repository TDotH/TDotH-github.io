import * as Babylon from '@babylonjs/core';
import React, { useEffect, useRef } from 'react';
import SpacerX from './spacerx/SpacerX';

class Console {

    constructor(engine, sceneOptions) {
        this.state = {
            is_playing: true,
            engine: engine,
            scene: new Babylon.Scene(engine, sceneOptions),
            camera: null,
            game: null,
        };

        if (this.state.scene.isReady()) {
            var assets_manager = this.onSceneReady(this.state.scene);
        } else {
            this.state.scene.onReadyObservable.addOnce((scene) => this.onSceneReady(this.state.scene));
        }
    }

    render() {
        this.state.game.update();
        this.state.scene.render();
    }

    onSceneReady(scene) {
        this.state.camera = new Babylon.FreeCamera("camera1", new Babylon.Vector3(0, 5, 0), scene);
        var assets_manager = new Babylon.AssetsManager(scene);
        this.state.camera.setTarget(Babylon.Vector3.Zero());
        var light = new Babylon.HemisphericLight('light', new Babylon.Vector3(0, 1, 0), scene);
        this.state.game = new SpacerX(scene, this.state.engine);
        scene.actionManager = new Babylon.ActionManager(scene);
        this.state.game.setupGame(scene);
        scene.onKeyboardObservable.add((kbInfo) => this.keyboardEventHandler(kbInfo));
        return assets_manager;
    }

    getCamera() {
        return this.state.camera;
    }

    getScene() {
        return this.state.scene;
    }

    keyboardEventHandler(kbInfo) {
        /*
        if (this.state.is_playing) {
            this.state.game.keyboardEventHandler(kbInfo);
        }*/
        /*
        switch (kbInfo.type) {
            case Babylon.KeyboardEventTypes.KEYDOWN:
                console.log("Key Down: ", kbInfo.event.key);
                break;
            case Babylon.KeyboardEventTypes.KEYUP:
                console.log("Key Up: ", kbInfo.event.keyCode);
        }*/
    }
}

export default Console;

