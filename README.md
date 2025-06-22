# Iron Dome Simulator

A React-based missile defense simulation inspired by the Iron Dome system. This app simulates incoming missiles and civilian aircraft on a radar screen, launching interceptors to destroy hostile missiles while avoiding civilian aircraft.

---

## Features

* **Radar Sweep:** Animated radar sweep visualizing detection area.
* **Missiles:** Hostile missiles spawn randomly from the top and descend toward the protected zone.
* **Civilian Aircraft:** Friendly aircraft spawn and descend, to be avoided by interceptors.
* **Interceptors:** Automatically launched from base to intercept and destroy missiles.
* **Collision Detection:** Interceptors destroy missiles on collision, displaying explosion effects.
* **Visuals:** Missiles and aircraft are displayed with emojis (`🚀` for missiles, `✈️` for civilian aircraft).
* **Control Panel & HUD:** Overview of active missiles and interceptors with launch controls.

---

## Getting Started

### Prerequisites

* Node.js (v14+ recommended)
* npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nasimrifat101/IromDome.git
   cd iron-dome-simulator
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and go to:

   ```
   http://localhost:3000
   ```

---

## Project Structure

* `src/components/` — Contains React components such as `HUD`, `ControlPanel`, `Radar`, `Missile`, and `Interceptor`.
* `src/canvas/Canvas.jsx` — Main simulation canvas implementing the radar, missile & interceptor logic.
* `src/utils/drawRadar.js` — Radar drawing helper.
* `src/utils/drawMissile.js` — Missile drawing helper.
* `public/` — Static assets.

---

## How It Works

* The radar sweep angle continuously increments to simulate scanning.
* Missiles spawn randomly from the top of the screen and move downward.
* Civilian aircraft spawn less frequently and move downward as well.
* When missiles enter the detection zone, interceptors automatically launch from the base at the bottom center.
* Interceptors home in on their assigned missile targets.
* Collision detection removes both missiles and interceptors, creating explosion animations.
* Interceptors ignore civilian aircraft to avoid friendly fire.
* Missiles and civilian aircraft are visually represented by emojis on the canvas.

---

## Customization

* Adjust canvas size by modifying `WIDTH` and `HEIGHT` constants in `Canvas.jsx`.
* Change missile or aircraft spawn rates by editing intervals in the spawn logic.
* Customize speeds, collision radius, and visual styles in the code as needed.

---

## Future Improvements

* Add manual interceptor launch controls.
* Implement scoring system for destroyed missiles.
* Add sound effects and more detailed animations.
* Introduce multiple missile types and interceptor strategies.
* Responsive design for mobile devices.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Contact

Created by Nasim Ahamed Rifat.
Email: [nasimrifat101@gmail.com](mailto:nasimrifat101@gmail.com)


