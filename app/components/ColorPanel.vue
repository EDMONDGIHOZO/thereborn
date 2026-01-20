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
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.color-panel:hover {
  transform: scale(1.02) translateY(-10px);
  z-index: 15;
  filter: brightness(1.1);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
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
  background: url('https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover no-repeat;
}

.bg-green {
  background: url('https://images.unsplash.com/photo-1684483548843-21a499e058bf?q=80&w=2346&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover no-repeat;
}

.bg-blue {
  background: #2447D9;
}

@media (max-width: 768px) {
  .color-panel {
    position: relative;
    width: 100%;
    height: 33.33vh;
    bottom: auto;
    clip-path: none;
  }
  
  .color-panel.left {
    order: 2;
    clip-path: none;
  }
  
  .color-panel.right {
    order: 3;
    clip-path: none;
  }
}
</style>
