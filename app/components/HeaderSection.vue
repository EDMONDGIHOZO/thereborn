<template>
  <header class="header-section">
    <div class="header-left">
      <LogoBox/>
    </div>
    <div class="header-right desktop-menu">
      <!-- Auth Links -->
      <div class="auth-links">
        <NuxtLink v-if="!user" to="/auth/login" class="auth-link">Login</NuxtLink>
        <NuxtLink v-if="!user" to="/auth/signup" class="auth-link auth-link-primary">Sign Up</NuxtLink>
        <NuxtLink v-if="user" to="/dashboard" class="auth-link">Dashboard</NuxtLink>
      </div>
      <NavLinks/>
      <PhoneNumber phone="+250788261877"/>
      <SocialIcons/>
    </div>

    <!-- Mobile Menu Button -->
    <button class="mobile-menu-btn" @click="toggleMobileMenu">
      <Icon :name="isMobileMenuOpen ? 'ri:close-line' : 'ri:menu-line'" class="text-white text-3xl" />
    </button>

    <!-- Mobile Menu Overlay -->
    <div v-show="isMobileMenuOpen" class="mobile-menu">
       <div class="flex flex-col items-center gap-6 pt-10">
          <NuxtLink v-if="!user" to="/auth/login" class="mobile-link" @click="isMobileMenuOpen = false">Login</NuxtLink>
          <NuxtLink v-if="!user" to="/auth/signup" class="mobile-link text-gold" @click="isMobileMenuOpen = false">Sign Up</NuxtLink>
          <NuxtLink v-if="user" to="/dashboard" class="mobile-link text-gold" @click="isMobileMenuOpen = false">Dashboard</NuxtLink>
          <div class="w-10 h-[1px] bg-gray-800 my-2"></div>
          <NavLinks class="flex-col items-center gap-4" @click="isMobileMenuOpen = false"/>
          <PhoneNumber phone="+250788261877" class="text-sm"/>
          <SocialIcons/>
       </div>
    </div>
  </header>
</template>

<script setup>
const {user} = useAuth()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

</script>

<style scoped>
.header-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem 4rem;
  transition: all 0.3s ease;
}

/* Optional: Add a subtle background on scroll or always if needed for visibility, 
   but keeping transparent for now to overlay hero properly. */

.header-left {
  flex-shrink: 0;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.auth-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
}

.auth-link {
  color: #d1d5db; /* gray-300 */
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
  transition: color 0.2s;
  text-decoration: none;
}

.auth-link:hover {
  color: #F5B700;
}

.auth-link-primary {
  background-color: #F5B700;
  color: black;
  padding: 0.4rem 1.2rem;
  border-radius: 9999px; /* Pill shape */
  font-weight: 600;
}

.auth-link-primary:hover {
  background-color: white;
  color: black;
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .header-section {
    padding: 1.5rem 2rem;
  }
}

.mobile-menu-btn {
  display: none;
  z-index: 1001;
  background: transparent;
  border: none;
  cursor: pointer;
}

.mobile-menu {
  display: none;
}

@media (max-width: 768px) {
  .header-section {
    position: fixed;
    padding: 1rem 1.5rem;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    width: 100%;
    align-items: center;
  }

  .desktop-menu {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-menu {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    animation: slideDown 0.3s ease-out;
  }
}

.mobile-link {
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-size: 1.5rem;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
}

.text-gold {
  color: #F5B700;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
