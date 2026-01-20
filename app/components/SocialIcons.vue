<template>
  <div class="social-icons">
    <a href="#" class="social-icon" aria-label="Facebook">
      <Icon name="mdi:facebook" size="20" />
    </a>
    <a href="#" class="social-icon" aria-label="Instagram">
      <Icon name="mdi:instagram" size="20" />
    </a>
    <a href="#" class="social-icon" aria-label="Twitter">
      <Icon name="mdi:twitter" size="20" />
    </a>
  </div>
</template>

<style scoped>
.social-icons {
  display: flex;
  gap: 12px;
}

.social-icon {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(27, 23, 0);
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
