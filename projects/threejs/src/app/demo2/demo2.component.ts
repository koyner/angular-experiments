import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.less'],
})
export class Demo2Component implements OnInit {
  private static loadModel(scene: THREE.Scene): void {
    new GLTFLoader().load(
      '/assets/AnimatedMorphSphere.glb',
      gltf => {
        scene.add(gltf.scene);
      },
      undefined,
      error => {
        console.error(error);
      },
    );
  }
  constructor() {}

  ngOnInit(): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('webgl2', {
      alpha: true,
    }) as WebGLRenderingContext;
    const renderer = new THREE.WebGLRenderer({canvas, context});
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

    camera.position.z = 2;

    Demo2Component.loadModel(scene);
    renderer.render(scene, camera);
  }
}
