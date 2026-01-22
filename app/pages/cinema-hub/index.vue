<template>
  <div class="cinema-hub-page bg-black min-h-screen">
    <CinemaHero />
    <CinemaDirectory />
  </div>
</template>

<script setup>
useHead({
  title: 'Rwanda Cinema Hub | The Reborn',
  meta: [
    { name: 'description', content: 'Discover the talent of Rwanda Cinema. A directory of actors, directors, and creatives.' }
  ]
})
</script>

<style scoped>
.cinema-hub-page {
  /* Ensure header z-index works if needed */
  position: relative;
}
</style>
