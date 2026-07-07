import * as THREE from 'three';

export class ShotTracer {
  private tracerLine: THREE.Line | null = null;
  private tracerPoints: THREE.Vector3[] = [];

  addPoint(pos: THREE.Vector3): void {
    this.tracerPoints.push(pos.clone());
  }

  render(scene: THREE.Scene): void {
    if (this.tracerLine) {
      scene.remove(this.tracerLine);
    }

    if (this.tracerPoints.length < 2) return;

    const geometry = new THREE.BufferGeometry().setFromPoints(this.tracerPoints);
    const material = new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 2 });
    this.tracerLine = new THREE.Line(geometry, material);
    scene.add(this.tracerLine);
  }

  clear(): void {
    this.tracerPoints = [];
    if (this.tracerLine) {
      this.tracerLine.geometry.dispose();
      (this.tracerLine.material as THREE.Material).dispose();
    }
    this.tracerLine = null;
  }
}
