<script setup>
const route = useRoute()
const showFooter = computed(() => {
  return !route.path.startsWith('/dashboard') && !route.path.startsWith('/admin')
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AppFooter v-if="showFooter" />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.font-display {
  font-family: 'Special Gothic Expanded One', sans-serif;
}

@font-face {
  font-family: 'Special Gothic Expanded One';
  src: url('/Special_Gothic_Expanded_One/SpecialGothicExpandedOne-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.font-body {
  font-family: 'Lexend', sans-serif;
}
</style>
