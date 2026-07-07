import { GameEngine } from '@game/GameEngine';

// Initialize the game engine
const gameEngine = new GameEngine();

// Start the engine
gameEngine.init().catch((err) => {
  console.error('Failed to initialize game engine:', err);
  document.body.innerHTML = '<p>Failed to load game. Check console.</p>';
});

// Handle window resize
window.addEventListener('resize', () => {
  gameEngine.onWindowResize();
});

// Graceful shutdown
window.addEventListener('beforeunload', () => {
  gameEngine.dispose();
});
