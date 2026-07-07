import * as THREE from 'three';
import { InputState } from '@game/InputManager';

export interface SwingData {
  power: number; // 0-1
  plane: THREE.Vector3; // swing plane direction
  pathDeviation: number; // -1 to 1 (hook to slice)
  releaseTimingOffset: number; // -1 to 1 (early to late)
  contactQuality: 'perfect' | 'good' | 'thin' | 'fat';
}

export class SwingController {
  private swingStartPos: THREE.Vector3 | null = null;
  private isSwinging: boolean = false;
  private inputState: InputState | null = null;

  setInputState(inputState: InputState): void {
    this.inputState = inputState;
  }

  startSwing(startPos: THREE.Vector3): void {
    this.swingStartPos = startPos.clone();
    this.isSwinging = true;
  }

  endSwing(): SwingData | null {
    if (!this.isSwinging || !this.inputState) return null;

    const swingData: SwingData = {
      power: this.calculatePower(),
      plane: this.calculateSwingPlane(),
      pathDeviation: this.calculatePathDeviation(),
      releaseTimingOffset: this.calculateReleaseTimingOffset(),
      contactQuality: this.calculateContactQuality(),
    };

    this.isSwinging = false;
    this.swingStartPos = null;

    return swingData;
  }

  private calculatePower(): number {
    // Power based on drag distance
    const dragDistance = Math.sqrt(
      this.inputState!.mouseDeltaX ** 2 + this.inputState!.mouseDeltaY ** 2
    );
    return Math.min(dragDistance / 300, 1.0); // normalize
  }

  private calculateSwingPlane(): THREE.Vector3 {
    // Swing plane based on mouse movement direction
    const x = this.inputState!.mouseDeltaX;
    const y = this.inputState!.mouseDeltaY;
    return new THREE.Vector3(x, 0, y).normalize();
  }

  private calculatePathDeviation(): number {
    // Deviation from ideal plane: -1 (hook) to 1 (slice)
    return Math.random() * 0.2 - 0.1; // placeholder
  }

  private calculateReleaseTimingOffset(): number {
    // Timing offset: -1 (early) to 1 (late)
    return Math.random() * 0.2 - 0.1; // placeholder
  }

  private calculateContactQuality(): SwingData['contactQuality'] {
    const qualities: SwingData['contactQuality'][] = ['perfect', 'good', 'thin', 'fat'];
    return qualities[Math.floor(Math.random() * qualities.length)];
  }
}
