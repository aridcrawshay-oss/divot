import * as THREE from 'three';

export interface HoleConfig {
  fairwayLength: number;
  fairwayWidth: number;
  teeLengthBack: number;
  greenSize: number;
  roughTexture: boolean;
}

export class HoleSetup {
  private terrain: THREE.Group = new THREE.Group();
  private config: HoleConfig = {
    fairwayLength: 150,
    fairwayWidth: 30,
    teeLengthBack: 20,
    greenSize: 10,
    roughTexture: true,
  };

  createHole(): THREE.Group {
    // Create tee box
    this.createTeeBox();

    // Create fairway
    this.createFairway();

    // Create rough
    this.createRough();

    // Create green
    this.createGreen();

    // Add optional flags and markers
    this.addHoleMarkers();

    return this.terrain;
  }

  private createTeeBox(): void {
    const geometry = new THREE.PlaneGeometry(this.config.fairwayWidth + 10, this.config.teeLengthBack);
    const material = new THREE.MeshLambertMaterial({ color: 0x2a5e2a }); // Dark green
    const teeMesh = new THREE.Mesh(geometry, material);
    teeMesh.receiveShadow = true;
    teeMesh.position.set(0, 0, -this.config.teeLengthBack / 2);
    teeMesh.rotation.x = -Math.PI / 2;

    this.terrain.add(teeMesh);
  }

  private createFairway(): void {
    const geometry = new THREE.PlaneGeometry(this.config.fairwayWidth, this.config.fairwayLength);
    const material = new THREE.MeshLambertMaterial({ color: 0x3d8e3d }); // Medium green
    const fairwayMesh = new THREE.Mesh(geometry, material);
    fairwayMesh.receiveShadow = true;
    fairwayMesh.position.set(0, 0, this.config.fairwayLength / 2);
    fairwayMesh.rotation.x = -Math.PI / 2;

    this.terrain.add(fairwayMesh);
  }

  private createRough(): void {
    const roughWidth = 50;
    const roughLength = this.config.fairwayLength + 20;

    // Left rough
    const leftGeom = new THREE.PlaneGeometry(roughWidth, roughLength);
    const roughMaterial = new THREE.MeshLambertMaterial({ color: 0x5a8c5a }); // Darker green
    const leftRough = new THREE.Mesh(leftGeom, roughMaterial);
    leftRough.receiveShadow = true;
    leftRough.position.set(
      -(this.config.fairwayWidth / 2 + roughWidth / 2),
      0,
      roughLength / 2
    );
    leftRough.rotation.x = -Math.PI / 2;

    // Right rough
    const rightRough = leftRough.clone();
    rightRough.position.x = this.config.fairwayWidth / 2 + roughWidth / 2;

    this.terrain.add(leftRough, rightRough);
  }

  private createGreen(): void {
    const geometry = new THREE.PlaneGeometry(this.config.greenSize, this.config.greenSize);
    const material = new THREE.MeshLambertMaterial({ color: 0x1a6b1a }); // Light green
    const greenMesh = new THREE.Mesh(geometry, material);
    greenMesh.receiveShadow = true;
    greenMesh.position.set(0, 0, this.config.fairwayLength + 5);
    greenMesh.rotation.x = -Math.PI / 2;

    this.terrain.add(greenMesh);
  }

  private addHoleMarkers(): void {
    // Flag pole (simple cylinder)
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 8);
    const poleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.set(0, 1.5, this.config.fairwayLength + 5);
    pole.castShadow = true;

    this.terrain.add(pole);
  }

  getTerrainGroup(): THREE.Group {
    return this.terrain;
  }

  getGreenBounds(): { x: number[]; z: number[] } {
    const greenX = this.config.greenSize / 2;
    const greenZ = this.config.fairwayLength + 5;
    return {
      x: [-greenX, greenX],
      z: [greenZ - this.config.greenSize / 2, greenZ + this.config.greenSize / 2],
    };
  }

  getFairwayBounds(): { x: number[]; z: number[] } {
    return {
      x: [-this.config.fairwayWidth / 2, this.config.fairwayWidth / 2],
      z: [0, this.config.fairwayLength],
    };
  }
}
