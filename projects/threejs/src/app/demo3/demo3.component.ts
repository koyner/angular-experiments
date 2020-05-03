import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-demo3',
  templateUrl: './demo3.component.html',
  styleUrls: ['./demo3.component.less'],
})
export class Demo3Component implements OnInit {
  private static makeLine(): THREE.Line {
    const material = new THREE.LineBasicMaterial({color: 0x0000ff});
    const geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-1, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 1, 0));
    geometry.vertices.push(new THREE.Vector3(1, 0, 0));
    return new THREE.Line(geometry, material);
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

    const line = Demo3Component.makeLine();
    scene.add(line);

    let count = 0;
    const animate = () => {
      count += 0.1;
      requestAnimationFrame(animate);
      camera.position.z = 2 + Math.sin(count);
      camera.position.y = 2 + Math.cos(count);
      camera.rotation.y = Math.sin(count / 10);
      renderer.render(scene, camera);
    };
    animate();
  }
}
