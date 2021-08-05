import logo from './logo.svg';
import { Component } from 'react';
import './App.css';
import SceneComponent from "./components/SceneCompnent";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, AssetsManager, SceneLoader, SpriteManager, Sprite } from '@babylonjs/core';
import '@babylonjs/loaders';

function App() {
  return (
    <div className="App">
      <div>
        <SceneComponent antialias id='canvas' />
      </div>
    </div>
  );
}

export default App;
