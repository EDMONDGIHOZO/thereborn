<template>
  <div class="diagonal-stripe"></div>
</template>

<style scoped>
.diagonal-stripe {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) rotate(-5deg);
  width: 25%;
  height: 120%;
  background: linear-gradient(180deg, #4a1c1c 0%, #5c2020 50%, #4a1c1c 100%);
  z-index: 10;
  box-shadow: 
    -20px 0 40px rgba(0, 0, 0, 0.3),
    20px 0 40px rgba(0, 0, 0, 0.3);
}
</style>
