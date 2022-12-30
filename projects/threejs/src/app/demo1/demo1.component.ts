import {Component, OnInit} from '@angular/core';
import {Color} from 'three';
import * as THREE from 'three';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.less']
})
export class Demo1Component implements OnInit {
  private static makeCube(x: number, y: number): THREE.Mesh {
    const material = new THREE.MeshPhongMaterial({
      color: new Color(Math.random(), Math.random(), Math.random())
    });
    material.opacity = 0.5;
    material.transparent = true;
    material.shininess = 100;
    const geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    const {position} = cube;
    position.x = x;
    position.y = y;
    position.z = 0;
    return cube;
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
    camera.position.z = 5;

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('webgl2', {
      alpha: true
    }) as WebGLRenderingContext;
    const renderer = new THREE.WebGLRenderer({canvas, context});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    renderer.setSize(window.innerWidth, window.innerHeight);

    const cubes = [];

    for (let i = 0; i < 10; i++) {
      cubes[i] = [];
      for (let j = 0; j < 10; j++) {
        const cube = Demo1Component.makeCube(i - 5, j - 5);
        cubes[i][j] = cube;
        scene.add(cube);
      }
    }

    const light = new THREE.SpotLight(0xffffff, 1);
    light.position.set(-5, -1, 10);
    light.castShadow = true;
    scene.add(light);

    const planeGeometry = new THREE.PlaneBufferGeometry(200, 200, 32, 32);
    const planeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.position.z = -10;
    scene.add(plane);

    const animate = () => {
      cubes.forEach(c1 =>
        c1.forEach(c2 => {
          c2.rotation.x += 0.03;
          c2.rotation.y += 0.04;
        })
      );
      // cube1.rotation.x += 0.03;
      // cube1.rotation.y += 0.02;
      // cube2.rotation.x += 0.04;
      // cube2.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    window.setInterval(animate, 20);
  }
}
