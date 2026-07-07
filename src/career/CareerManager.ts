import { PlayerProfile } from './PlayerProfile';
import { SeasonCalendar } from './SeasonCalendar';

export type CareerPhase = 'college' | 'korn_ferry' | 'pga_tour';

export class CareerManager {
  private playerProfile: PlayerProfile | null = null;
  private seasonCalendar: SeasonCalendar | null = null;
  private currentPhase: CareerPhase = 'college';
  private currentSeason: number = 1;

  createNewCareer(playerName: string): void {
    this.playerProfile = new PlayerProfile(playerName);
    this.seasonCalendar = new SeasonCalendar(1); // college year 1
  }

  getPlayerProfile(): PlayerProfile | null {
    return this.playerProfile;
  }

  getCurrentPhase(): CareerPhase {
    return this.currentPhase;
  }

  getCurrentSeason(): number {
    return this.currentSeason;
  }

  advancePhase(): void {
    if (this.currentPhase === 'college') {
      this.currentPhase = 'korn_ferry';
      this.currentSeason = 1;
    } else if (this.currentPhase === 'korn_ferry') {
      this.currentPhase = 'pga_tour';
      this.currentSeason = 1;
    }
  }

  // TODO: Implement save/load functionality
}
