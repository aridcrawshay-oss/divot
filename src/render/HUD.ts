export interface HUDState {
  currentClub: string;
  distanceToPin: number;
  windSpeed: number;
  windDirection: number;
  lie: string;
  score: number;
  scoreVsPar: number;
}

export class HUD {
  private hudElement: HTMLElement | null = null;
  private state: HUDState = {
    currentClub: 'Driver',
    distanceToPin: 0,
    windSpeed: 0,
    windDirection: 0,
    lie: 'fairway',
    score: 0,
    scoreVsPar: 0,
  };

  constructor() {
    this.hudElement = document.getElementById('hud-overlay');
  }

  updateState(state: Partial<HUDState>): void {
    this.state = { ...this.state, ...state };
    this.render();
  }

  private render(): void {
    if (!this.hudElement) return;

    const html = `
      <div style="position: absolute; top: 20px; right: 20px; color: white; font-size: 14px;">
        <div>Club: <strong>${this.state.currentClub}</strong></div>
        <div>Distance: <strong>${this.state.distanceToPin.toFixed(0)} yd</strong></div>
        <div>Wind: <strong>${this.state.windSpeed.toFixed(1)} mph @ ${this.state.windDirection.toFixed(0)}°</strong></div>
        <div>Lie: <strong>${this.state.lie}</strong></div>
      </div>
      <div style="position: absolute; bottom: 20px; left: 20px; color: white; font-size: 16px;">
        <div>Score: <strong>${this.state.score}</strong> (${this.state.scoreVsPar > 0 ? '+' : ''}${this.state.scoreVsPar})</div>
      </div>
    `;
    this.hudElement.innerHTML = html;
  }
}
