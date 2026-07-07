export class MainMenu {
  private element: HTMLElement | null = null;

  constructor() {
    this.element = document.getElementById('hud-overlay');
  }

  show(): void {
    if (!this.element) return;
    const html = `
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);">
        <h1 style="font-size: 48px; color: #00ff88; margin-bottom: 40px;">DIVOT</h1>
        <p style="font-size: 18px; color: #aaa; margin-bottom: 40px; text-align: center; max-width: 400px;">College to PGA Tour Golf Game</p>
        <button id="btn-new-game" style="padding: 12px 30px; font-size: 16px; margin: 10px; background: #00ff88; color: #000; border: none; cursor: pointer; border-radius: 4px;">New Game</button>
        <button id="btn-continue" style="padding: 12px 30px; font-size: 16px; margin: 10px; background: #666; color: #fff; border: none; cursor: pointer; border-radius: 4px;">Continue</button>
        <button id="btn-settings" style="padding: 12px 30px; font-size: 16px; margin: 10px; background: #666; color: #fff; border: none; cursor: pointer; border-radius: 4px;">Settings</button>
      </div>
    `;
    this.element.innerHTML = html;
  }

  hide(): void {
    if (this.element) {
      this.element.innerHTML = '';
    }
  }
}
