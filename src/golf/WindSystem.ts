import * as THREE from 'three';

export class WindSystem {
  private windVector: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private windStrength: number = 0; // 0-20 mph
  private windDirection: number = 0; // 0-360 degrees

  generateWind(): void {
    // Random wind generation for variety
    this.windStrength = Math.random() * 20; // 0-20 mph
    this.windDirection = Math.random() * 360;
    this.updateWindVector();
  }

  setWind(strength: number, direction: number): void {
    this.windStrength = Math.max(0, Math.min(strength, 20));
    this.windDirection = direction % 360;
    this.updateWindVector();
  }

  private updateWindVector(): void {
    const radians = (this.windDirection * Math.PI) / 180;
    const speedFactor = this.windStrength / 10; // convert to game units
    this.windVector.set(Math.cos(radians) * speedFactor, 0, Math.sin(radians) * speedFactor);
  }

  getWindVector(): THREE.Vector3 {
    return this.windVector.clone();
  }

  getWindStrength(): number {
    return this.windStrength;
  }

  getWindDirection(): number {
    return this.windDirection;
  }
}
