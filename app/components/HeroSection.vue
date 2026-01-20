<template>
  <section class="hero-section">
    <div class="hero-background" ref="heroRef" @mousemove="handleMouseMove">
      <!-- Background Image with Parallax -->
      <img 
        src="https://images.unsplash.com/photo-1715794792710-5a57e04db28f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero Background"
        class="hero-image"
        :style="parallaxStyle"
      />
      
      <!-- Diagonal stripe (first on mobile) -->
      <DiagonalStripe />
      
      <!-- Colored panels -->
      <ColorPanel position="left" color="coral">
        <div class="panel-overlay panel-overlay-left">
          <h2 class="panel-text">THE REBORN<br>REAL ESTATE</h2>
        </div>
      </ColorPanel>
      <ColorPanel position="right" color="green">
        <div class="panel-overlay panel-overlay-right">
          <h2 class="panel-text">GOLDEN PILLAR<br>PICTURES</h2>
        </div>
      </ColorPanel>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const heroRef = ref(null)
const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e) => {
  // Get mouse position relative to the window center
  const { innerWidth, innerHeight } = window
  mouseX.value = (e.clientX - innerWidth / 2) / innerWidth
  mouseY.value = (e.clientY - innerHeight / 2) / innerHeight
}

const parallaxStyle = computed(() => {
  // Move image opposite to mouse direction
  const moveX = mouseX.value * -20 // Max move 20px
  const moveY = mouseY.value * -20 // Max move 20px
  
  return {
    transform: `scale(1.1) translate(${moveX}px, ${moveY}px)`,
    transition: 'transform 0.1s ease-out'
  }
})

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

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

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  will-change: transform; /* Optimize for performance */
}

@media (max-width: 768px) {
  .hero-section {
    height: auto;
    min-height: 100vh;
  }
  
  .hero-background {
    position: relative;
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
  
  .hero-image {
    display: none;
  }
}
</style>

<style scoped>
/* Additional global styles for this component's slotted content */
.panel-overlay {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  transition: background 0.3s ease;
}

.panel-overlay-left {
  justify-content: flex-start;
  padding-left: 40px;
}

.panel-overlay-right {
  justify-content: flex-end;
  padding-right: 40px;
}

.panel-text {
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-size: 3rem;
  color: #ffffff;
  line-height: 1.2;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  opacity: 0.9;
  transform: translateY(0);
  pointer-events: none;
}

.panel-overlay-left .panel-text {
  text-align: left;
}

.panel-overlay-right .panel-text {
  text-align: right;
}

/* We need to target the component instance class for hover */
:deep(.color-panel:hover) .panel-overlay {
  background: rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .panel-text {
    font-size: 2rem;
  }
  
  .panel-overlay {
    padding-left: 0;
  }
}
</style>
