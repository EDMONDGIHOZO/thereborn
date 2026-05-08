<template>
  <div class="cinema-hub-page bg-black min-h-screen">
    <CinemaHero />
    <CinemaDirectory />
  </div>
</template>

<script setup>
definePageMeta({
  scrollToTop: true
})

useHead({
  title: 'Rwanda Cinema Hub | The Reborn',
  meta: [
    { name: 'description', content: "The central ecosystem for Rwanda's film industry and visual arts." }
  ]
})
</script>

<style scoped>
.cinema-hub-page {
  /* Ensure header z-index works if needed */
  position: relative;
}
</style>
