# Divot — College to PGA Tour Golf Game

A desktop golf game where every shot is played by you — not simulated off-screen.

## Vision

Build an immersive golf experience that combines analog swing mechanics with a career progression loop spanning college, Korn Ferry Tour, and the PGA Tour.

## Stack

- **Tauri 2** — Desktop shell
- **Vite + TypeScript** — Build & type safety
- **Three.js** — 3D rendering
- **cannon-es** — Physics for bounce & roll
- **JSON courses** — Easy hole authoring

## Project Status: Phase 1 — MVP

Scaffolding a playable single hole with:
- Analog mouse-drag swing
- Ball flight & landing
- Putting system
- Basic HUD

## Getting Started

```bash
npm install
npm run tauri:dev
```

## Project Structure

```
src/
├── game/          # GameEngine, SceneManager, InputManager
├── golf/          # SwingController, BallFlight, ClubBag, etc.
├── render/        # CourseRenderer, CameraRig, HUD, ShotTracer
├── career/        # CareerManager, PlayerProfile, SeasonCalendar
├── data/          # Course JSON, tournament data
└── ui/            # Menu screens
```

## Next Steps

1. ✅ Scaffold repo structure
2. ⏳ Implement SwingController with visual feedback
3. ⏳ Build BallFlight physics model
4. ⏳ Author first test hole (par-4 with bunker)
5. ⏳ Create playable tee → approach → putt loop

## License

MIT
