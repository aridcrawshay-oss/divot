import * as THREE from 'three';
import { InputState } from '@game/InputManager';
import { BallSetup } from './BallSetup';
import { HoleSetup } from './HoleSetup';
import { ShotController, ShotResult } from './ShotController';
import { ShotTracer } from '@render/ShotTracer';

export class GolfScene {
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private ballSetup: BallSetup = new BallSetup();
  private holeSetup: HoleSetup = new HoleSetup();
  private shotController: ShotController;
  private shotTracer: ShotTracer;
  private ballMesh: THREE.Mesh | null = null;
  private inputState: InputState | null = null;
  private isSwinging: boolean = false;
  private hud: {
    distanceDisplay: HTMLElement | null;
    messageDisplay: HTMLElement | null;
    scoreDisplay: HTMLElement | null;
  } = {
    distanceDisplay: null,
    messageDisplay: null,
    scoreDisplay: null,
  };

  constructor(scene: THREE.Scene, camera: THREE.Camera) {
    this.scene = scene;
    this.camera = camera;
    this.shotController = new ShotController(scene, this.ballSetup, this.holeSetup);
    this.shotTracer = new ShotTracer(scene);
  }

  async initialize(): Promise<void> {
    // Create the hole (fairway, green, etc.)
    const holeGroup = this.holeSetup.createHole();
    this.scene.add(holeGroup);

    // Create the ball
    this.ballMesh = this.ballSetup.createBallMesh();
    this.scene.add(this.ballMesh);

    // Set up controllers
    this.shotController.setBallMesh(this.ballMesh);
    this.shotController.setShotTracer(this.shotTracer);

    // Setup camera to follow
    this.setupCamera();

    // Setup HUD
    this.setupHUD();

    // Attach input listeners
    this.attachInputListeners();
  }

  private setupCamera(): void {
    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.position.set(0, 12, -30);
      this.camera.lookAt(0, 2, 50);
    }
  }

  private setupHUD(): void {
    const hudOverlay = document.getElementById('hud-overlay');
    if (hudOverlay) {
      hudOverlay.innerHTML = `
        <div style="position: absolute; top: 20px; left: 20px; color: white; font-size: 18px; font-family: monospace;">
          <div id="message-display" style="margin-bottom: 10px;">Click and drag the ball to swing</div>
          <div id="distance-display" style="margin-bottom: 10px;">Distance: 0 yards</div>
          <div id="score-display">Score: 0</div>
        </div>
      `;

      this.hud.messageDisplay = document.getElementById('message-display');
      this.hud.distanceDisplay = document.getElementById('distance-display');
      this.hud.scoreDisplay = document.getElementById('score-display');
    }
  }

  private attachInputListeners(): void {
    document.addEventListener('mousedown', (e) => this.onMouseDown(e));
    document.addEventListener('mouseup', (e) => this.onMouseUp(e));
  }

  private onMouseDown(e: MouseEvent): void {
    if (this.shotController.isExecuting()) return;

    // Check if click is on the ball (simple bounding box)
    if (this.ballMesh) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      // For now, assume any click starts a swing (improvement: raycasting)
      this.isSwinging = true;
      this.shotController.startSwing();

      if (this.hud.messageDisplay) {
        this.hud.messageDisplay.textContent = 'Release to swing!';
      }
    }
  }

  private async onMouseUp(e: MouseEvent): Promise<void> {
    if (!this.isSwinging) return;

    this.isSwinging = false;
    if (this.hud.messageDisplay) {
      this.hud.messageDisplay.textContent = 'Swinging...';
    }

    // Execute the shot
    const result = await this.shotController.executeShot();

    if (result) {
      this.handleShotResult(result);
    }
  }

  private handleShotResult(result: ShotResult): void {
    const distanceYards = Math.round(result.distance * 3); // Rough conversion to yards

    if (this.hud.distanceDisplay) {
      this.hud.distanceDisplay.textContent = `Distance: ${distanceYards} yards`;
    }

    if (result.endedOnGreen) {
      if (this.hud.messageDisplay) {
        this.hud.messageDisplay.textContent = '🎉 On the green!';
      }
    } else {
      if (this.hud.messageDisplay) {
        this.hud.messageDisplay.textContent = 'Click to hit again';
      }
    }
  }

  setInputState(inputState: InputState): void {
    this.inputState = inputState;
    this.shotController.setInputState(inputState);
  }

  update(deltaTime: number): void {
    // Animation updates can go here
  }

  dispose(): void {
    // Cleanup
  }
}
