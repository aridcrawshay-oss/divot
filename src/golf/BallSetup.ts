import * as THREE from 'three';

export class BallSetup {
  private ballMesh: THREE.Mesh | null = null;
  private ballPosition: THREE.Vector3 = new THREE.Vector3(0, 0.85, 0);

  createBallMesh(): THREE.Mesh {
    // Golf ball diameter: 1.68 inches = ~0.043 meters. Scale for visibility.
    const radius = 0.5;
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.6,
      metalness: 0.2,
    });

    this.ballMesh = new THREE.Mesh(geometry, material);
    this.ballMesh.position.copy(this.ballPosition);
    this.ballMesh.castShadow = true;
    this.ballMesh.receiveShadow = true;

    // Add dimple pattern via normal map (optional visual detail)
    this.addDimples(geometry);

    return this.ballMesh;
  }

  private addDimples(geometry: THREE.SphereGeometry): void {
    // Subdivide and slightly indent some vertices to simulate dimples
    const positions = geometry.attributes.position;
    const posArray = positions.array as Float32Array;

    for (let i = 0; i < posArray.length; i += 3) {
      const x = posArray[i];
      const y = posArray[i + 1];
      const z = posArray[i + 2];

      // Random dimples on the surface
      if (Math.random() > 0.92) {
        const length = Math.sqrt(x * x + y * y + z * z);
        posArray[i] = (x / length) * 0.48; // Slightly inset
        posArray[i + 1] = (y / length) * 0.48;
        posArray[i + 2] = (z / length) * 0.48;
      }
    }

    positions.needsUpdate = true;
    geometry.computeVertexNormals();
  }

  getBallMesh(): THREE.Mesh | null {
    return this.ballMesh;
  }

  getBallPosition(): THREE.Vector3 {
    return this.ballPosition.clone();
  }

  resetBallPosition(): void {
    if (this.ballMesh) {
      this.ballMesh.position.copy(this.ballPosition);
      this.ballMesh.velocity = new THREE.Vector3(0, 0, 0);
    }
  }
}
