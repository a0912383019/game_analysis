<template>
  <div class="cyberpunk-404">
    <div class="glitch" data-text="404">404</div>
    <p class="error-message">SYSTEM FAILURE: PAGE NOT FOUND</p>
    <router-link to="/" class="neon-button">RETURN TO REALITY</router-link>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap");

@keyframes glitch {
  0% {
    text-shadow: 2px 2px 0px #ff00ff, -2px -2px 0px #00ffff;
  }
  25% {
    text-shadow: -3px -3px 0px #ff00ff, 3px 3px 0px #00ffff;
  }
  50% {
    text-shadow: 3px -3px 0px #ff00ff, -3px 3px 0px #00ffff;
  }
  75% {
    text-shadow: -2px 2px 0px #ff00ff, 2px -2px 0px #00ffff;
  }
  100% {
    text-shadow: 2px 2px 0px #ff00ff, -2px -2px 0px #00ffff;
  }
}

@keyframes scanline {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

.cyberpunk-404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: radial-gradient(circle, #000428, #004e92);
  font-family: "Orbitron", sans-serif;
  color: #fff;
  overflow: hidden;
  text-align: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    z-index: 1;
    pointer-events: none;
  }

  .glitch {
    font-size: 8rem;
    font-weight: bold;
    position: relative;
    z-index: 2;
    animation: glitch 0.8s infinite alternate;
  }

  .error-message {
    font-size: 1.5rem;
    margin-top: 10px;
    letter-spacing: 3px;
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
    z-index: 2;
  }

  .neon-button {
    margin-top: 20px;
    padding: 12px 30px;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
    border: 2px solid #0ff;
    border-radius: 4px;
    background: linear-gradient(90deg, rgb(20, 145, 145), #00f);
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
    z-index: 2;
    transition: 0.3s;

    &:hover {
      color: #000;
      background: linear-gradient(90deg, #f0f, #00f);
      box-shadow: 0 0 20px #f0f;
    }
  }
}
</style>
