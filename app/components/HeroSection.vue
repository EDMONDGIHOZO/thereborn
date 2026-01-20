<template>
  <section class="hero-section">
    <div class="hero-background">
      <!-- Blue background -->
      <div class="blue-bg"></div>
      
      <!-- Colored panels -->
      <ColorPanel position="left" color="coral" />
      <ColorPanel position="right" color="green" />
      
      <!-- Diagonal stripe -->
      <DiagonalStripe />
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.blue-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 45%;
  background: linear-gradient(135deg, #2447D9 0%, #1e3cb8 100%);
  z-index: 1;
}
</style>
