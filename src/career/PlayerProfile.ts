export interface PlayerStats {
  driving: number; // 1-99
  irons: number;
  shortGame: number;
  putting: number;
  mental: number;
}

export class PlayerProfile {
  private name: string;
  private stats: PlayerStats = {
    driving: 50,
    irons: 50,
    shortGame: 50,
    putting: 50,
    mental: 50,
  };
  private totalEarnings: number = 0;
  private tournaments: number = 0;
  private wins: number = 0;
  private ranking: number = 9999;

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  getStats(): PlayerStats {
    return this.stats;
  }

  updateStats(delta: Partial<PlayerStats>): void {
    Object.assign(this.stats, delta);
    // Clamp values to 1-99
    Object.keys(this.stats).forEach((key) => {
      this.stats[key as keyof PlayerStats] = Math.max(1, Math.min(99, this.stats[key as keyof PlayerStats]));
    });
  }

  addEarnings(amount: number): void {
    this.totalEarnings += amount;
  }

  getTotalEarnings(): number {
    return this.totalEarnings;
  }

  incrementWins(): void {
    this.wins++;
  }

  getWins(): number {
    return this.wins;
  }
}
