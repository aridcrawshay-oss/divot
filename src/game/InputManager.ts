export interface InputState {
  mouseDown: boolean;
  mouseX: number;
  mouseY: number;
  mouseDeltaX: number;
  mouseDeltaY: number;
  keysPressed: Map<string, boolean>;
}

export class InputManager {
  private inputState: InputState = {
    mouseDown: false,
    mouseX: 0,
    mouseY: 0,
    mouseDeltaX: 0,
    mouseDeltaY: 0,
    keysPressed: new Map(),
  };

  constructor() {
    this.attachListeners();
  }

  private attachListeners(): void {
    document.addEventListener('mousedown', (e) => this.onMouseDown(e));
    document.addEventListener('mouseup', (e) => this.onMouseUp(e));
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    document.addEventListener('keydown', (e) => this.onKeyDown(e));
    document.addEventListener('keyup', (e) => this.onKeyUp(e));
  }

  private onMouseDown(event: MouseEvent): void {
    this.inputState.mouseDown = true;
    this.inputState.mouseX = event.clientX;
    this.inputState.mouseY = event.clientY;
  }

  private onMouseUp(event: MouseEvent): void {
    this.inputState.mouseDown = false;
  }

  private onMouseMove(event: MouseEvent): void {
    const prevX = this.inputState.mouseX;
    const prevY = this.inputState.mouseY;
    this.inputState.mouseX = event.clientX;
    this.inputState.mouseY = event.clientY;
    this.inputState.mouseDeltaX = event.clientX - prevX;
    this.inputState.mouseDeltaY = event.clientY - prevY;
  }

  private onKeyDown(event: KeyboardEvent): void {
    this.inputState.keysPressed.set(event.key.toLowerCase(), true);
  }

  private onKeyUp(event: KeyboardEvent): void {
    this.inputState.keysPressed.delete(event.key.toLowerCase());
  }

  getInputState(): InputState {
    return this.inputState;
  }

  isKeyPressed(key: string): boolean {
    return this.inputState.keysPressed.get(key.toLowerCase()) || false;
  }
}
