import * as THREE from 'three';

export interface CourseJSON {
  name: string;
  holes: HoleJSON[];
  terrainHeightmap: string; // URL to heightmap texture
}

export interface HoleJSON {
  holeNumber: number;
  par: number;
  handicap: number;
  teePositions: [number, number][];
  pinPosition: [number, number];
  fairwaySpline: [number, number][];
}

export class CourseRenderer {
  private scene: THREE.Scene;
  private course: CourseJSON | null = null;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  async loadCourse(courseJSON: CourseJSON): Promise<void> {
    this.course = courseJSON;
    await this.renderTerrain(courseJSON.terrainHeightmap);
    this.renderHoles(courseJSON.holes);
  }

  private async renderTerrain(heightmapURL: string): Promise<void> {
    // TODO: Load heightmap texture and create terrain mesh
    const geometry = new THREE.PlaneGeometry(400, 400, 100, 100);
    const material = new THREE.MeshLambertMaterial({ color: 0x228b22 });
    const terrain = new THREE.Mesh(geometry, material);
    terrain.receiveShadow = true;
    this.scene.add(terrain);
  }

  private renderHoles(holes: HoleJSON[]): void {
    // TODO: Render hole markers, tee boxes, pin flags
  }

  getCourse(): CourseJSON | null {
    return this.course;
  }
}
