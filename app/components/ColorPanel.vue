<template>
  <div 
    class="color-panel"
    :class="[position, `bg-${color}`]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  position: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  color: {
    type: String,
    default: 'coral'
  }
})
</script>

<style scoped>
.color-panel {
  position: absolute;
  width: 50%;
  height: 60%;
  bottom: 0;
  z-index: 5;
}

.color-panel.left {
  left: 0;
  clip-path: polygon(0 0, 85% 0, 100% 100%, 0% 100%);
}

.color-panel.right {
  right: 0;
  clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
}

.bg-coral {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
}

.bg-green {
  background: linear-gradient(135deg, #00ff66 0%, #00dd55 100%);
}

.bg-blue {
  background: #2447D9;
}
</style>
