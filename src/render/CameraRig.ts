import * as THREE from 'three';

export type CameraMode = 'address' | 'flight' | 'follow' | 'overview';

export class CameraRig {
  private camera: THREE.Camera;
  private mode: CameraMode = 'address';
  private targetPos: THREE.Vector3 = new THREE.Vector3();
  private ballPos: THREE.Vector3 = new THREE.Vector3();

  constructor(camera: THREE.Camera) {
    this.camera = camera;
  }

  setBallPosition(pos: THREE.Vector3): void {
    this.ballPos = pos.clone();
  }

  setMode(mode: CameraMode): void {
    this.mode = mode;
    this.updateCameraPosition();
  }

  private updateCameraPosition(): void {
    switch (this.mode) {
      case 'address':
        // Behind ball, low angle
        this.targetPos.copy(this.ballPos).add(new THREE.Vector3(0, 1, -5));
        break;
      case 'flight':
        // High, follow ball from side
        this.targetPos.copy(this.ballPos).add(new THREE.Vector3(10, 15, 0));
        break;
      case 'follow':
        // Chase cam behind ball
        this.targetPos.copy(this.ballPos).add(new THREE.Vector3(0, 3, 10));
        break;
      case 'overview':
        // Wide view of green
        this.targetPos.copy(this.ballPos).add(new THREE.Vector3(0, 20, 20));
        break;
    }
  }

  update(): void {
    // Smoothly interpolate camera to target
    this.camera.position.lerp(this.targetPos, 0.1);
    this.camera.lookAt(this.ballPos);
  }
}
