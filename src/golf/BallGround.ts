import CANNON from 'cannon-es';
import * as THREE from 'three';

export class BallGround {
  private world: CANNON.World;
  private ballBody: CANNON.Body;
  private ballMesh: THREE.Mesh;

  constructor(ballMesh: THREE.Mesh) {
    this.ballMesh = ballMesh;
    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.81, 0);
    this.world.defaultContactMaterial.friction = 0.3;

    // Create ball physics body
    const ballShape = new CANNON.Sphere(0.02); // 1.68 inch diameter
    this.ballBody = new CANNON.Body({
      mass: 0.04593, // 45.93 grams
      shape: ballShape,
    });
    this.world.addBody(this.ballBody);

    // Add ground plane
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 0, shape: groundShape });
    this.world.addBody(groundBody);
  }

  setBallVelocity(velocity: CANNON.Vec3): void {
    this.ballBody.velocity.copy(velocity);
  }

  update(deltaTime: number): void {
    this.world.step(1 / 60, deltaTime, 3);
    this.ballMesh.position.copy(this.ballBody.position as any);
  }

  getBallPosition(): THREE.Vector3 {
    return new THREE.Vector3(
      this.ballBody.position.x,
      this.ballBody.position.y,
      this.ballBody.position.z
    );
  }
}
