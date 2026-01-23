<template>
  <header class="header-section">
    <div class="header-left">
      <LogoBox/>
    </div>
    <div class="header-right">
      <!-- Auth Links -->
      <div class="auth-links">
        <NuxtLink v-if="!user" to="/auth/login" class="auth-link">Login</NuxtLink>
        <NuxtLink v-if="!user" to="/auth/signup" class="auth-link auth-link-primary">Sign Up</NuxtLink>
        <NuxtLink v-if="user" to="/dashboard" class="auth-link">Dashboard</NuxtLink>
      </div>
      <NavLinks/>
      <PhoneNumber phone="+250788347428"/>
      <SocialIcons/>
    </div>
  </header>
</template>

<script setup>
const {user} = useAuth()
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
  padding: 40px 60px;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

@media (max-width: 768px) {
  .header-section {
    position: relative;
    padding: 20px 20px;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background: #0a0a0a; /* Match background color */
  }

  .header-left {
    width: 100%;
    justify-content: center;
  }

  .header-right {
    width: 100%;
    align-items: center;
    gap: 10px;
  }
}

.auth-links {
  display: flex;
  gap: 12px;
  align-items: center;
}

.auth-link {
  color: #9ca3af;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  transition: color 0.2s;
}

.auth-link:hover {
  color: #F5B700;
}

.auth-link-primary {
  background-color: #F5B700;
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 2px;
}

.auth-link-primary:hover {
  background-color: white;
  color: black;
}
</style>
