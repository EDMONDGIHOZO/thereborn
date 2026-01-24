<template>
  <section class="hero-container">
    <div class="video-overlay"></div>
    <!-- Simple dark hero with noise/gradient -->
    <div class="hero-bg"></div>

    <div class="content-wrapper">
      <h1 class="main-title">
        <span class="block-reveal">THE REBORN</span>
        <span class="block-reveal highlight">COMPANY</span>
      </h1>
      
      <p class="subtitle">
        Pioneering the future of <span class="text-gold">Rwanda</span> through Construction, Real Estate, and Cinema.
      </p>
      
      <div class="cta-group">
        <button @click="scrollToPillars" class="btn-primary">
          Explore Our Divisions
        </button>
      </div>
    </div>

    <div class="scroll-indicator">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
const scrollToPillars = () => {
  const pillars = document.getElementById('pillars-section')
  if (pillars) {
    pillars.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.hero-container {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #050505;
  color: white;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 50% 50%, rgba(245, 183, 0, 0.05) 0%, transparent 50%),
    linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, #050505 100%);
}

.content-wrapper {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 1200px;
  padding: 0 2rem;
}

.main-title {
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-size: 5rem;
  line-height: 1.1;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.block-reveal {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.block-reveal:nth-child(2) {
  animation-delay: 0.2s;
}

.highlight {
  color: #F5B700;
  /* Text outline effect for style */
  -webkit-text-stroke: 1px #F5B700;
  text-shadow: 0 0 20px rgba(245, 183, 0, 0.3);
}

.subtitle {
  font-family: 'Lexend', sans-serif;
  font-size: 1.25rem;
  color: #9ca3af;
  max-width: 600px;
  margin: 0 auto 3rem;
  opacity: 0;
  animation: fadeUp 1s ease-out 0.5s forwards;
  line-height: 1.6;
}

.text-gold {
  color: #F5B700;
  font-weight: 500;
}

.cta-group {
  opacity: 0;
  animation: fadeUp 1s ease-out 0.8s forwards;
}

.btn-primary {
  background: transparent;
  color: #F5B700;
  border: 1px solid #F5B700;
  padding: 1rem 3rem;
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.btn-primary:hover {
  background: #F5B700;
  color: black;
  box-shadow: 0 0 30px rgba(245, 183, 0, 0.4);
}

.scroll-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  opacity: 0.7;
}

.mouse {
  width: 30px;
  height: 50px;
  border: 2px solid white;
  border-radius: 20px;
  position: relative;
}

.wheel {
  width: 4px;
  height: 8px;
  background: white;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
  animation: scroll 1.5s infinite;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scroll {
  0% { top: 10px; opacity: 1; }
  100% { top: 30px; opacity: 0; }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 3rem;
  }
  
  .subtitle {
    font-size: 1rem;
    padding: 0 1rem;
  }
  
  .btn-primary {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
}
</style>
