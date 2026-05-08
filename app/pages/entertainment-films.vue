<template>
  <div class="coming-soon-page">
    <div class="back-bar">
      <NuxtLink to="/" class="back-link">
        <span class="back-icon">
          <Icon name="ri:arrow-left-line" />
        </span>
        <span>Back to Home</span>
      </NuxtLink>
    </div>

    <section class="hero-section">
      <div class="hero-background"></div>
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <p class="eyebrow">The Reborn Entertainment Films</p>
        <h1 class="hero-title">Coming Soon…</h1>
        <p class="hero-copy">
          A new destination for original films, productions, and studio updates is on the way.
        </p>

        <div class="actions">
          <NuxtLink to="/cinema-hub" class="primary-link">
            Visit Rwanda Cinema Hub
            <Icon name="ri:arrow-right-line" />
          </NuxtLink>
          <NuxtLink to="/" class="secondary-link">
            Return Home
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'The Reborn Entertainment Films | Coming Soon',
  meta: [
    {
      name: 'description',
      content: 'The Reborn Entertainment Films is coming soon with original productions and studio updates.'
    }
  ]
})
</script>

<style scoped>
.coming-soon-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(245, 183, 0, 0.18), transparent 28%),
    linear-gradient(180deg, #050505 0%, #0a0a0a 100%);
  color: white;
  overflow-x: hidden;
}

.back-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  padding: 1.5rem;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  text-decoration: none;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  letter-spacing: 0.04em;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #F5B700;
}

.back-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  background-color: #F5B700;
  color: black;
  font-size: 1.25rem;
}

.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7rem 1.5rem 4rem;
}

.hero-background {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2070&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  filter: grayscale(100%);
  transform: scale(1.04);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(0, 0, 0, 0.94) 0%, rgba(0, 0, 0, 0.78) 45%, rgba(0, 0, 0, 0.55) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  width: min(100%, 52rem);
  text-align: center;
}

.eyebrow {
  margin-bottom: 1rem;
  color: #F5B700;
  font-family: 'Lexend', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.hero-title {
  margin-bottom: 1.5rem;
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-size: clamp(3rem, 9vw, 6rem);
  line-height: 0.95;
  text-transform: uppercase;
  text-wrap: balance;
}

.hero-copy {
  margin: 0 auto;
  max-width: 42rem;
  color: #d1d5db;
  font-family: 'Lexend', sans-serif;
  font-size: 1.125rem;
  line-height: 1.8;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2.5rem;
}

.primary-link,
.secondary-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  min-width: 15rem;
  padding: 1rem 1.75rem;
  text-decoration: none;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s ease;
}

.primary-link {
  background-color: #F5B700;
  color: black;
  font-family: 'Special Gothic Expanded One', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.primary-link:hover {
  background-color: white;
  transform: translateY(-1px);
}

.secondary-link {
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
}

.secondary-link:hover {
  border-color: #F5B700;
  color: #F5B700;
}

@media (min-width: 768px) {
  .back-bar {
    padding: 2rem 2.5rem;
  }

  .actions {
    flex-direction: row;
    justify-content: center;
  }
}
</style>
