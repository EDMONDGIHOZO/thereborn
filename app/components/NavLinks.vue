<template>
  <nav class="nav-links">
    <NuxtLink to="/" class="nav-link active">HOME</NuxtLink>
    <NuxtLink to="/about" class="nav-link">ABOUT US</NuxtLink>
  </nav>
</template>

<style scoped>
.nav-links {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.nav-link {
  font-family: 'Lexend', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 1.5px;
  padding: 4px 0;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 2px;
  background: #ffffff;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-link:hover {
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}
</style>
