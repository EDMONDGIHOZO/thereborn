<template>
  <div class="cinema-hub-page bg-black min-h-screen">
    <CinemaHero />
    <CinemaDirectory />
  </div>
</template>

<script setup>
useHead({
  title: 'The Reborn Entertainment Films | The Reborn',
  meta: [
    { name: 'description', content: 'Discover the talent of Rwanda Cinema and world-class visual arts.' }
  ]
})
</script>

<style scoped>
.cinema-hub-page {
  /* Ensure header z-index works if needed */
  position: relative;
}
</style>
