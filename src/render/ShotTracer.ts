import * as THREE from 'three';

export class ShotTracer {
  private scene: THREE.Scene;
  private line: THREE.Line | null = null;
  private material: THREE.LineBasicMaterial;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.material = new THREE.LineBasicMaterial({
      color: 0xffff00,
      linewidth: 2,
      transparent: true,
      opacity: 0.7,
    });
  }

  drawPath(positions: THREE.Vector3[]): void {
    // Remove previous line if it exists
    if (this.line) {
      this.scene.remove(this.line);
    }

    if (positions.length < 2) return;

    // Create line geometry from positions
    const geometry = new THREE.BufferGeometry();
    const points = positions.map((p) => new THREE.Vector3(p.x, p.y, p.z));
    geometry.setFromPoints(points);

    // Create and add line to scene
    this.line = new THREE.Line(geometry, this.material);
    this.scene.add(this.line);

    // Fade out the line after 3 seconds
    setTimeout(() => {
      this.clear();
    }, 3000);
  }

  clear(): void {
    if (this.line) {
      this.scene.remove(this.line);
      this.line = null;
    }
  }
}
