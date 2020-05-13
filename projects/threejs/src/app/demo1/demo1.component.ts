import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.less']
})
export class Demo1Component implements OnInit {
  private static makeCube(): THREE.Mesh {
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    return new THREE.Mesh(geometry, material);
  }
  constructor() {}

  ngOnInit(): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('webgl2', {
      alpha: true
    }) as WebGLRenderingContext;
    const renderer = new THREE.WebGLRenderer({canvas, context});
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

    const cube = Demo1Component.makeCube();
    scene.add(cube);

    camera.position.z = 2;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.02;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }
}
