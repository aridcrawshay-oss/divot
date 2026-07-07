export type LieType = 'fairway' | 'rough' | 'bunker' | 'green' | 'fringe';

export interface LieModifiers {
  dispersionMultiplier: number;
  distanceMultiplier: number;
  spinMultiplier: number;
  spinTypeOffset: number; // added to spin calculations
}

export class LieSystem {
  private lieModifiers: Map<LieType, LieModifiers> = new Map([
    [
      'fairway',
      { dispersionMultiplier: 1.0, distanceMultiplier: 1.0, spinMultiplier: 1.0, spinTypeOffset: 0 },
    ],
    [
      'rough',
      { dispersionMultiplier: 1.3, distanceMultiplier: 0.85, spinMultiplier: 0.8, spinTypeOffset: -200 },
    ],
    [
      'bunker',
      { dispersionMultiplier: 1.5, distanceMultiplier: 0.7, spinMultiplier: 1.2, spinTypeOffset: 500 },
    ],
    ['green', { dispersionMultiplier: 2.0, distanceMultiplier: 0.0, spinMultiplier: 2.0, spinTypeOffset: 0 }],
    [
      'fringe',
      { dispersionMultiplier: 1.2, distanceMultiplier: 0.95, spinMultiplier: 1.1, spinTypeOffset: 100 },
    ],
  ]);

  getModifiers(lie: LieType): LieModifiers {
    return this.lieModifiers.get(lie) || this.lieModifiers.get('fairway')!;
  }

  getLieAtPosition(x: number, z: number, terrain: any): LieType {
    // TODO: Sample terrain mesh to determine lie type
    // For now, return fairway as default
    return 'fairway';
  }
}
