import * as THREE from 'three';

type SceneType = 'menu' | 'course' | 'career_hub' | 'tournament';

export class SceneManager {
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private renderer: THREE.WebGLRenderer;
  private currentScene: SceneType = 'menu';

  constructor(scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
  }

  async loadScene(sceneType: SceneType): Promise<void> {
    // Clear current scene
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }

    this.currentScene = sceneType;

    switch (sceneType) {
      case 'menu':
        this.loadMenuScene();
        break;
      case 'course':
        await this.loadCourseScene();
        break;
      case 'career_hub':
        this.loadCareerHubScene();
        break;
      case 'tournament':
        await this.loadTournamentScene();
        break;
      default:
        throw new Error(`Unknown scene: ${sceneType}`);
    }
  }

  private loadMenuScene(): void {
    // TODO: Implement main menu UI
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
  }

  private async loadCourseScene(): Promise<void> {
    // TODO: Load course from JSON and render with CourseRenderer
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshLambertMaterial({ color: 0x228b22 });
    const plane = new THREE.Mesh(geometry, material);
    plane.receiveShadow = true;
    this.scene.add(plane);
  }

  private loadCareerHubScene(): void {
    // TODO: Implement career hub UI
  }

  private async loadTournamentScene(): Promise<void> {
    // TODO: Implement tournament wrapper
  }

  update(deltaTime: number): void {
    // Update current scene logic
  }

  getScene(): THREE.Scene {
    return this.scene;
  }

  getCamera(): THREE.Camera {
    return this.camera;
  }

  dispose(): void {
    // Cleanup resources
  }
}
