import * as THREE from 'three';
import { SwingData } from './SwingController';

export interface FlightParameters {
  initialVelocity: THREE.Vector3;
  backspin: number;
  sidespin: number;
  launchAngle: number;
  ballSpeed: number;
}

export class BallFlight {
  private gravity = -9.81;
  private windVector = new THREE.Vector3(0, 0, 0);

  setWind(windX: number, windZ: number): void {
    this.windVector.set(windX, 0, windZ);
  }

  calculateFlightParams(swingData: SwingData, clubLoft: number): FlightParameters {
    const ballSpeed = this.calculateBallSpeed(swingData);
    const launchAngle = clubLoft + this.calculateDynamicLoft(swingData);
    const spinAxis = this.calculateSpinAxis(swingData);

    return {
      initialVelocity: this.calculateInitialVelocity(ballSpeed, launchAngle, swingData.plane),
      backspin: spinAxis.y,
      sidespin: spinAxis.x,
      launchAngle,
      ballSpeed,
    };
  }

  private calculateBallSpeed(swingData: SwingData): number {
    // Simplified: power * club max speed
    const baseSpeed = 150; // mph equivalent
    return swingData.power * baseSpeed;
  }

  private calculateDynamicLoft(swingData: SwingData): number {
    // Attack angle affects effective loft
    return swingData.releaseTimingOffset * 10; // ±10 degrees
  }

  private calculateSpinAxis(swingData: SwingData): THREE.Vector3 {
    const backspin = 2000 + swingData.power * 4000; // rpm
    const sidespin = swingData.pathDeviation * 2000; // rpm
    return new THREE.Vector3(sidespin, backspin, 0);
  }

  private calculateInitialVelocity(
    ballSpeed: number,
    launchAngle: number,
    plane: THREE.Vector3
  ): THREE.Vector3 {
    const radLaunch = (launchAngle * Math.PI) / 180;
    const radPlane = Math.atan2(plane.z, plane.x);

    return new THREE.Vector3(
      ballSpeed * Math.cos(radLaunch) * Math.cos(radPlane),
      ballSpeed * Math.sin(radLaunch),
      ballSpeed * Math.cos(radLaunch) * Math.sin(radPlane)
    );
  }
}
