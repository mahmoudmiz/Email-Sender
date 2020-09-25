import React from "react";
import Particles from "react-particles-js";

import Register from "./components/register/register.component";
function App() {
  return (
    <div className="App">
      <Particles
        params={{
          particles: {
            number: {
              value: 50,
            },
            size: {
              value: 3,
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
            },
          },
        }}
      />{" "}
      <Register />
    </div>
  );
}

export default App;
