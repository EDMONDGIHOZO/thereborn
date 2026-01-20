<template>
  <div class="logo-container">
    <NuxtImg 
      src="https://res.cloudinary.com/yebalabs-com/image/upload/v1768896006/the_reborn_pic_2_b5ec4e.png"
      alt="The Reborn Logo"
      class="logo-image"
    />
  </div>
</template>

<style scoped>
.logo-container {
  width: 100%;
  height: auto;
  padding-top: 6%;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.logo-container:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.4));
}

.logo-image {
  width: 90%;
  height: auto;
  object-fit: cover;
}

@media (max-width: 768px) {
  .logo-container {
    width: 60%;
    padding-top: 4%;
  }
}

@media (max-width: 480px) {
  .logo-container {
    width: 50%;
    padding-top: 3%;
  }
}
</style>
