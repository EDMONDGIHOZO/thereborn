<template>
  <section class="hero-container">
    <!-- Left Section: Title -->
    <div class="hero-left">
      <h1 class="hero-title">
        THE REBORN<br>
        ENTERTAINMENT<br>
        <span class="hub-text">FILMS</span>
      </h1>
      <div class="mt-8">
        <NuxtLink to="/cinema-hub/notices" class="publications-btn">
          <span>Publications</span>
          <Icon name="ri:arrow-right-line" class="ml-2" />
        </NuxtLink>
      </div>
    </div>

    <!-- Right Section: Gold Diagonal -->
    <div class="hero-right">
      <div class="content-box">
        <p class="hero-description">
          The central ecosystem for Rwanda's film industry and visual arts. Explore a curated directory of actors, directors, producers, and creatives shaping the future of African storytelling.
        </p>
        
        <NuxtLink to="/cinema-hub/join" class="cta-button inline-block text-center">
          Join Now
        </NuxtLink>
      </div>
    </div>

    <!-- Decorative Elements -->
    <button @click="scrollToDirectory" class="scroll-indicator appearance-none bg-transparent border-0 cursor-pointer hover:text-white transition-colors">
      SCROLL TO EXPLORE
    </button>
  </section>
</template>

<script setup>
const scrollToDirectory = () => {
  const directorySection = document.getElementById('directory')
  if (directorySection) {
    directorySection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.hero-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: black;
  overflow: hidden;
}

.hero-left {
  width: 100%;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6rem 2rem 0; /* pt-24 px-8 */
}

.hero-title {
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-size: 3.75rem; /* 6xl */
  line-height: 0.9;
  letter-spacing: -0.05em;
  color: white;
}

.hub-text {
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(to right, #ffffff, #6b7280);
}

.hero-right {
  width: 100%;
  position: relative;
  background-color: #F5B700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem 2rem;
}

.content-box {
  max-width: 36rem;
  margin: 0 auto;
}

.hero-description {
  font-family: 'Lexend', sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  color: black;
  margin-bottom: 2rem;
  line-height: 1.625;
}

.cta-button {
  padding: 1rem 2.5rem;
  background-color: white;
  color: black;
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-size: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 2px solid transparent;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 300ms;
  cursor: pointer;
}

.cta-button:hover {
  background-color: black;
  color: white;
  border-color: white;
}

.scroll-indicator {
  position: absolute;
  bottom: 2.5rem;
  left: 2rem;
  color: rgba(255, 255, 255, 0.5);
  font-family: monospace;
  font-size: 0.875rem;
}

/* Desktop Styles */
@media (min-width: 768px) {
  .hero-container {
    flex-direction: row;
  }

  .hero-left {
    width: 50%;
    padding: 0 4rem; /* px-16 */
  }

  .hero-title {
    font-size: 6rem; /* 8xl */
  }

  .hero-right {
    width: 55%; /* Increased width to compensate for overlap and reach the right edge */
    padding: 0 2rem 0 10%; /* Adjusted padding */
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
    margin-left: -5%;
  }

  .content-box {
    margin-left: 5rem;
  }
  
  .scroll-indicator {
    left: 4rem;
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 5rem; /* Reduced from 8rem to fit 'ENTERTAINMENT' */
  }
}

.publications-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-family: 'Lexend', sans-serif;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, 0.05);
}

.publications-btn:hover {
  border-color: #F5B700;
  color: #F5B700;
  background: rgba(245, 183, 0, 0.1);
  padding-left: 2.5rem; /* Slide effect */
}
</style>
