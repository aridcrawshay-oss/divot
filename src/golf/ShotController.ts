import * as THREE from 'three';
import { InputState } from '@game/InputManager';
import { SwingController, SwingData } from './SwingController';
import { BallFlight, FlightParameters } from './BallFlight';
import { BallSetup } from './BallSetup';
import { ShotTracer } from '@render/ShotTracer';
import { HoleSetup } from './HoleSetup';
import { ClubBag } from './ClubBag';

export interface ShotResult {
  finalPosition: THREE.Vector3;
  distance: number;
  endedOnGreen: boolean;
}

export class ShotController {
  private swingController: SwingController = new SwingController();
  private ballFlight: BallFlight = new BallFlight();
  private ballSetup: BallSetup;
  private holeSetup: HoleSetup;
  private clubBag: ClubBag = new ClubBag();
  private shotTracer: ShotTracer | null = null;
  private ballMesh: THREE.Mesh | null = null;
  private isExecutingShot: boolean = false;
  private inputState: InputState | null = null;
  private swingStartTime: number = 0;
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene, ballSetup: BallSetup, holeSetup: HoleSetup) {
    this.scene = scene;
    this.ballSetup = ballSetup;
    this.holeSetup = holeSetup;
  }

  setInputState(inputState: InputState): void {
    this.inputState = inputState;
    this.swingController.setInputState(inputState);
  }

  setBallMesh(ballMesh: THREE.Mesh): void {
    this.ballMesh = ballMesh;
  }

  setShotTracer(tracer: ShotTracer): void {
    this.shotTracer = tracer;
  }

  /**
   * Initiate a swing when user clicks the ball
   */
  startSwing(): void {
    if (this.isExecutingShot || !this.ballMesh) return;

    this.swingController.startSwing(this.ballMesh.position);
    this.swingStartTime = Date.now();
  }

  /**
   * Execute the shot when user releases mouse
   */
  async executeShot(): Promise<ShotResult | null> {
    if (!this.ballMesh || !this.inputState) return null;

    const swingData = this.swingController.endSwing();
    if (!swingData) return null;

    this.isExecutingShot = true;

    // Get the currently selected club (default: 7-iron)
    const club = this.clubBag.getClub('7-iron');
    if (!club) {
      console.error('Club not found');
      this.isExecutingShot = false;
      return null;
    }

    // Calculate flight parameters
    const flightParams = this.ballFlight.calculateFlightParams(swingData, club.loft);

    // Execute the flight simulation
    const result = await this.simulateFlightAndLanding(
      this.ballMesh.position,
      flightParams
    );

    this.isExecutingShot = false;
    return result;
  }

  /**
   * Simulate ball flight with physics and landing detection
   */
  private async simulateFlightAndLanding(
    startPos: THREE.Vector3,
    flightParams: FlightParameters
  ): Promise<ShotResult> {
    return new Promise((resolve) => {
      const positions: THREE.Vector3[] = [startPos.clone()];
      const timeStep = 0.02; // 20ms per frame
      let time = 0;
      const maxFlightTime = 15; // Max 15 seconds of flight

      const simulateFrame = () => {
        time += timeStep;

        // Calculate new position
        let pos = startPos.clone();
        pos.addScaledVector(flightParams.initialVelocity, time);
        pos.y += 0.5 * this.ballFlight['gravity'] * time * time;

        // Check for landing (below ground)
        if (pos.y <= 0.5) {
          // Ball has landed
          pos.y = 0.5; // Rest on ground
          this.ballMesh!.position.copy(pos);

          // Update tracer if available
          positions.push(pos);
          if (this.shotTracer) {
            this.shotTracer.drawPath(positions);
          }

          // Determine if on green
          const greenBounds = this.holeSetup.getGreenBounds();
          const onGreen =
            pos.x >= greenBounds.x[0] &&
            pos.x <= greenBounds.x[1] &&
            pos.z >= greenBounds.z[0] &&
            pos.z <= greenBounds.z[1];

          const startToPosDistance = startPos.distanceTo(pos);

          resolve({
            finalPosition: pos,
            distance: startToPosDistance,
            endedOnGreen: onGreen,
          });
          return;
        }

        // Update ball position in scene
        this.ballMesh!.position.copy(pos);
        positions.push(pos.clone());

        // Continue simulation
        if (time < maxFlightTime) {
          requestAnimationFrame(simulateFrame);
        } else {
          // Max time reached, ball lands where it is
          this.ballMesh!.position.y = 0.5;
          if (this.shotTracer) {
            this.shotTracer.drawPath(positions);
          }
          resolve({
            finalPosition: this.ballMesh!.position.clone(),
            distance: startPos.distanceTo(this.ballMesh!.position),
            endedOnGreen: false,
          });
        }
      };

      simulateFrame();
    });
  }

  isExecuting(): boolean {
    return this.isExecutingShot;
  }

  reset(): void {
    this.ballSetup.resetBallPosition();
    if (this.ballMesh) {
      const ballPos = this.ballSetup.getBallPosition();
      this.ballMesh.position.copy(ballPos);
    }
    if (this.shotTracer) {
      this.shotTracer.clear();
    }
  }
}
