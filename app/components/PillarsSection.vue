<template>
  <section id="pillars-section" class="pillars-container">
    <div class="pillars-grid">
      <!-- Card 3: Cinema Hub -->
      <NuxtLink to="/cinema-hub" class="pillar-card group active-card">
        <div class="card-bg"
             style="background-image: url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop');"></div>
        <div class="card-overlay"></div>
        <div class="card-content">
          <div class="card-icon">
            <img src="https://res.cloudinary.com/yebalabs-com/image/upload/v1768896007/RWANDAN_CINEMA_HUB_1_ssu8jn.jpg"
                 alt="Rwanda Cinema Hub" class="card-logo rounded-lg"/>
          </div>
          <h2 class="card-title">Rwandan Cinema Hub</h2>
          <p class="card-desc">The beating heart of Rwandan storytelling. Discover talent, movies, and more.</p>
          <span class="card-link text-gold">Enter Hub <Icon name="ri:arrow-right-line"/></span>
        </div>
      </NuxtLink>
      <!-- Card 3: Golden Pillar Pictures -->
      <div class="pillar-card group">
        <div class="card-bg"
             style="background-image: url('https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2070&auto=format&fit=crop');"></div>
        <div class="card-overlay"></div>
        <div class="card-content">
          <div class="card-icon">
            <img
                src="https://res.cloudinary.com/yebalabs-com/image/upload/v1768896007/A_GOLDEN_PILLAR_PICTURES1_awsudr.png"
                alt="Golden Pillar Pictures" class="card-logo rounded-lg"/>
          </div>
          <h2 class="card-title">A GOLDEN PILLAR PICTURES</h2>
          <p class="card-desc">Capturing moments and telling stories through world-class photography and visual
            arts.</p>
          <a href="#" class="card-link">See Portfolio
            <Icon name="ri:arrow-right-line"/>
          </a>
        </div>
      </div>
      <!-- Card 1: Construction -->
      <div class="pillar-card group">
        <div class="card-bg"
             style="background-image: url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop');"></div>
        <div class="card-overlay"></div>
        <div class="card-content">
          <div class="card-icon">
            <img src="https://res.cloudinary.com/yebalabs-com/image/upload/v1768896007/JEPG_REBORN_tpgogx.jpg"
                 alt="The Reborn Construction" class="card-logo rounded-lg"/>
          </div>
          <h2 class="card-title">THE REBORN CONSTRUCTION</h2>
          <p class="card-desc">Building the foundations of tomorrow with sustainable and modern engineering.</p>
          <a href="#" class="card-link">Learn More
            <Icon name="ri:arrow-right-line"/>
          </a>
        </div>
      </div>

      <!-- Card 2: Real Estate -->
      <div class="pillar-card group">
        <div class="card-bg"
             style="background-image: url('https://res.cloudinary.com/yebalabs-com/image/upload/v1769421202/THE_REBORN_REAL_ESTATE_FTO_acfycl.jpg');"></div>
        <div class="card-overlay"></div>
        <div class="card-content">
          <div class="card-icon">
            <img src="https://res.cloudinary.com/yebalabs-com/image/upload/v1769420565/THE_REBORN_REAL_ESTATE_og9nmq.jpg"
                 alt="The Reborn Construction" class="card-logo rounded-lg"/>
          </div>
          <h2 class="card-title">THE REBORN REAL ESTATE</h2>
          <p class="card-desc">Premium properties and developments shaping the landscape of Rwanda.</p>
          <a href="#" class="card-link">View Properties
            <Icon name="ri:arrow-right-line"/>
          </a>
        </div>
      </div>


    </div>
  </section>
</template>

<style scoped>
.pillars-container {
  width: 100%;
  background-color: #000;
}

.pillars-grid {
  display: grid;
  grid-template-columns: 1fr;
  height: auto;
}

.pillar-card {
  position: relative;
  height: 500px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-decoration: none;
  cursor: pointer;
}

.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  z-index: 1;
  filter: grayscale(100%);
}

.pillar-card:hover .card-bg, .active-card .card-bg {
  transform: scale(1.1);
  filter: grayscale(0%);
}

/* Specific for Cinema Hub to always be colorful or on hover? Let's stick to hover color reveal */
.active-card .card-bg {
  filter: grayscale(0%); /* Optional: Make cinema hub always colored to highlight it's the main app feature right now */
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.1) 100%);
  z-index: 2;
  transition: background 0.3s;
}

.pillar-card:hover .card-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.2) 100%);
}

.card-content {
  position: relative;
  z-index: 10;
  padding: 3rem;
  width: 100%;
  transform: translateY(20px);
  transition: transform 0.4s ease;
}

.pillar-card:hover .card-content {
  transform: translateY(0);
}

.card-icon {
  font-size: 2.5rem;
  color: #F5B700;
  margin-bottom: 2rem;
  opacity: 1; /* Keep logos fully visible */
}

.card-logo {
  height: 100px;
  width: auto;
  object-fit: contain;
}

.card-title {
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-size: 2rem;
  color: white;
  margin-bottom: 1rem;
  line-height: 1;
  text-transform: uppercase;
}

@media (min-width: 1280px) {
  .card-title {
    font-size: 2.1rem;
  }
}

.card-desc {
  font-family: 'Lexend', sans-serif;
  font-size: 1rem;
  color: #d1d5db;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease 0.1s;
  max-width: 80%;
}

.pillar-card:hover .card-desc {
  opacity: 1;
  transform: translateY(0);
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
  transition: color 0.3s;
}

.card-link:hover, .text-gold {
  color: #F5B700;
}

@media (min-width: 1024px) {
  .pillars-grid {
    grid-template-columns: repeat(4, 1fr);
    height: 100vh; /* Full screen height on desktop */
  }

  .pillar-card {
    height: 100%;
    border-bottom: none;
  }
}
</style>
