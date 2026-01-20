<template>
  <div class="homepage">
    <HeroSection />
    <HeaderSection />
  </div>
</template>

<script setup>
useHead({
  title: 'The Reborn Company | Home',
  meta: [
    { name: 'description', content: 'Welcome to The Reborn Company - Transforming ideas into reality.' }
  ]
})
</script>

<style scoped>
.homepage {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}
</style>
