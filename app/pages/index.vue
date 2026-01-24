<template>
  <div class="homepage">
    <HeaderSection />
    <HeroSection />
    <PillarsSection />
  </div>
</template>

<script setup>
useHead({
  title: 'The Reborn Company',
  meta: [
    { name: 'description', content: 'The Reborn Company - Excellence in Construction, Real Estate, and Cinema.' }
  ]
})
</script>

<style scoped>
.homepage {
  width: 100%;
  min-height: 100vh;
  background-color: #000;
  overflow-x: hidden;
}
</style>
