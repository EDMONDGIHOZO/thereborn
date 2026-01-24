<template>
  <NuxtLink to="/" class="logo-container">
    <NuxtImg
        src="https://res.cloudinary.com/yebalabs-com/image/upload/v1768896006/the_reborn_pic_2_b5ec4e.png"
        alt="The Reborn Logo"
        class="logo-image"
    />
  </NuxtLink>
</template>

<style scoped>
.logo-container {
  display: block;
  width: 140px;
  height: auto;
  transition: all 0.3s ease;
  cursor: pointer;
}

.logo-container:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
}

.logo-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

@media (max-width: 768px) {
  .logo-container {
    width: 100px;
  }
}
</style>
