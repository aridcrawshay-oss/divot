export interface Club {
  name: string;
  type: 'driver' | 'wood' | 'hybrid' | 'iron' | 'wedge' | 'putter';
  loft: number; // degrees
  carryDistance: number; // yards (base)
  totalDistance: number; // yards (base)
}

export class ClubBag {
  private clubs: Map<string, Club> = new Map();
  private selectedClub: Club | null = null;

  constructor() {
    this.initializeDefaultBag();
  }

  private initializeDefaultBag(): void {
    const defaultClubs: Club[] = [
      { name: 'Driver', type: 'driver', loft: 10.5, carryDistance: 260, totalDistance: 280 },
      { name: '3 Wood', type: 'wood', loft: 15, carryDistance: 235, totalDistance: 255 },
      { name: '5 Wood', type: 'wood', loft: 18, carryDistance: 215, totalDistance: 235 },
      { name: '4 Hybrid', type: 'hybrid', loft: 20, carryDistance: 205, totalDistance: 225 },
      { name: '4 Iron', type: 'iron', loft: 22, carryDistance: 195, totalDistance: 215 },
      { name: '5 Iron', type: 'iron', loft: 25, carryDistance: 185, totalDistance: 205 },
      { name: '6 Iron', type: 'iron', loft: 28, carryDistance: 175, totalDistance: 195 },
      { name: '7 Iron', type: 'iron', loft: 31, carryDistance: 165, totalDistance: 185 },
      { name: '8 Iron', type: 'iron', loft: 34, carryDistance: 155, totalDistance: 175 },
      { name: '9 Iron', type: 'iron', loft: 38, carryDistance: 145, totalDistance: 165 },
      { name: 'Pitching Wedge', type: 'wedge', loft: 44, carryDistance: 130, totalDistance: 145 },
      { name: 'Sand Wedge', type: 'wedge', loft: 54, carryDistance: 100, totalDistance: 115 },
      { name: 'Lob Wedge', type: 'wedge', loft: 60, carryDistance: 80, totalDistance: 90 },
      { name: 'Putter', type: 'putter', loft: 4, carryDistance: 30, totalDistance: 30 },
    ];

    defaultClubs.forEach((club) => {
      this.clubs.set(club.name, club);
    });

    this.selectedClub = defaultClubs[0]; // Start with driver
  }

  getClub(name: string): Club | undefined {
    return this.clubs.get(name);
  }

  selectClub(name: string): boolean {
    const club = this.clubs.get(name);
    if (club) {
      this.selectedClub = club;
      return true;
    }
    return false;
  }

  getSelectedClub(): Club | null {
    return this.selectedClub;
  }

  getAllClubs(): Club[] {
    return Array.from(this.clubs.values());
  }
}
