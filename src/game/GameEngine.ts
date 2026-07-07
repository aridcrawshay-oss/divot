import * as THREE from 'three';
import { SceneManager } from './SceneManager';
import { InputManager } from './InputManager';

export class GameEngine {
  private scene: THREE.Scene | null = null;
  private camera: THREE.Camera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private sceneManager: SceneManager | null = null;
  private inputManager: InputManager | null = null;
  private animationFrameId: number | null = null;

  async init(): Promise<void> {
    // Setup Three.js
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    if (!canvas) throw new Error('Canvas not found');

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb); // sky blue

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 10, 20);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;

    // Add basic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(100, 100, 50);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    // Initialize managers
    this.sceneManager = new SceneManager(this.scene, this.camera, this.renderer);
    this.inputManager = new InputManager();

    // Load initial scene (MainMenu)
    await this.sceneManager.loadScene('menu');

    // Start render loop
    this.animate();
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    if (this.sceneManager && this.renderer) {
      this.sceneManager.update(1 / 60); // assume 60fps
      this.renderer.render(this.sceneManager.getScene(), this.sceneManager.getCamera());
    }
  };

  onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }

    if (this.renderer) {
      this.renderer.setSize(width, height);
    }
  }

  dispose(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.sceneManager) {
      this.sceneManager.dispose();
    }
  }
}
