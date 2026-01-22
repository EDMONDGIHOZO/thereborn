<template>
  <NuxtLink to="/cinema-hub" class="diagonal-stripe">
    <video 
      class="bg-video"
      autoplay 
      muted 
      loop 
      playsinline
      poster="https://res.cloudinary.com/yebalabs-com/image/upload/v1768898176/rwanda-c-hub_nrs6gf.jpg"
    >
      <source src="https://res.cloudinary.com/yebalabs-com/video/upload/v1768902009/A_flying_camera_1080p_202601201137_ecemci.mp4" type="video/mp4">
    </video>
    <div class="stripe-overlay">
      <h2 class="stripe-text">
        RWANDA<br>CINEMA<br>HUB
      </h2>
    </div>
  </NuxtLink>
</template>

<style scoped>
.diagonal-stripe {
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translateX(-50%) rotate(4deg);
  width: 25%;
  height: 220%;
  background: #000; /* Fallback color */
  z-index: 999;
  box-shadow: 
    -20px 0 40px rgba(0, 0, 0, 0.3),
    20px 0 40px rgba(0, 0, 0, 0.3);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
}

.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.5); /* Zoom in to crop baked-in black bars */
  transform-origin: center center;
}

.stripe-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 70vh;
  transition: background 0.6s ease;
}

.stripe-text {
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-size: 3rem; /* Smaller font size */
  line-height: 1.2;
  color: #ffffff;
  text-align: center;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  opacity: 0.9;
  transform: rotate(-4deg); /* Counter-rotate to straight */
  animation: floatText 3s ease-in-out infinite alternate;
}

@keyframes floatText {
  from {
    transform: rotate(-4deg) translateY(0);
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }
  to {
    transform: rotate(-4deg) translateY(-10px);
    text-shadow: 0 20px 30px rgba(0, 0, 0, 0.7);
  }
}

.diagonal-stripe:hover {
  transform: translateX(-50%) rotate(4deg) scale(1.02);
  z-index: 1001;
  box-shadow: 
    -30px 0 60px rgba(0, 0, 0, 0.5),
    30px 0 60px rgba(0, 0, 0, 0.5);
  filter: brightness(1.1);
}

.diagonal-stripe:hover .stripe-overlay {
  background: linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.2) 15%, rgba(0, 0, 0, 0.2) 100%);
}

@media (max-width: 768px) {
  .diagonal-stripe {
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    width: 100%;
    height: 33.33vh;
    order: 1;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .stripe-overlay {
    align-items: center;
    padding-top: 0;
  }

  .stripe-text {
    font-size: 2rem;
    transform: none;
    animation: none;
  }
  
  .diagonal-stripe:hover {
    transform: scale(1.02);
  }
}
</style>
