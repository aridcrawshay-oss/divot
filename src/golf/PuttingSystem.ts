export class PuttingSystem {
  private isInPuttingMode: boolean = false;
  private puttPower: number = 0; // 0-1
  private puttLine: number = 0; // slope break read

  enterPuttingMode(): void {
    this.isInPuttingMode = true;
  }

  exitPuttingMode(): void {
    this.isInPuttingMode = false;
  }

  isInMode(): boolean {
    return this.isInPuttingMode;
  }

  setPuttPower(power: number): void {
    this.puttPower = Math.max(0, Math.min(power, 1));
  }

  getPuttPower(): number {
    return this.puttPower;
  }

  readBreak(greenMesh: any, holePos: any, ballPos: any): number {
    // TODO: Sample green mesh to calculate slope and break
    return 0; // placeholder
  }
}
