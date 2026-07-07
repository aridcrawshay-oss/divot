export class TournamentRunner {
  private currentRound: number = 0;
  private maxRounds: number = 4;
  private playerScores: number[] = [];
  private leaderboard: any[] = [];

  startTournament(): void {
    this.currentRound = 1;
    this.playerScores = [];
  }

  completeRound(score: number): void {
    this.playerScores.push(score);
    this.currentRound++;
  }

  getCurrentRound(): number {
    return this.currentRound;
  }

  getTournamentTotal(): number {
    return this.playerScores.reduce((a, b) => a + b, 0);
  }

  isComplete(): boolean {
    return this.currentRound > this.maxRounds;
  }
}
