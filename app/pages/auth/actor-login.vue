<template>
  <div class="auth-page flex flex-col justify-center items-center min-h-screen py-12">
    <!-- Logo -->
    <NuxtLink to="/" class="mb-8">
      <span class="text-2xl font-bold text-white tracking-widest uppercase">The Reborn</span>
    </NuxtLink>
    
    <div class="auth-container">
      <div class="text-center mb-4">
        <Icon name="mdi:account-star" class="text-cinema-gold text-4xl" />
      </div>
      <h1 class="text-3xl font-bold mb-2 text-center">Actor Login</h1>
      <p class="text-gray-400 text-center text-sm mb-6">Access your actor dashboard</p>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-gray-400 mb-1">Email</label>
          <input v-model="email" type="email" class="input-field" required />
        </div>
        <div>
          <label class="block text-gray-400 mb-1">Password</label>
          <input v-model="password" type="password" class="input-field" required />
        </div>
        <div v-if="error" class="text-red-500 text-sm text-center">{{ error }}</div>
        <button type="submit" class="btn-gold w-full flex justify-center items-center gap-2" :disabled="loading">
           <Icon v-if="loading" name="ri:loader-4-line" class="animate-spin" />
           <span>Login as Actor</span>
        </button>
      </form>
      <div class="text-center mt-6 text-gray-500">
         Want to join as an actor? <NuxtLink to="/cinema-hub/join" class="text-yellow-500 hover:text-white transition-colors">Apply here</NuxtLink>
         <div class="mt-2">
           <NuxtLink to="/auth/forgot-password" class="text-sm hover:text-white">Forgot Password?</NuxtLink>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const { login } = useAuth()
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  const success = await login(email.value, password.value)
  if (success) {
    router.push('/dashboard')
  } else {
    error.value = 'Invalid email or password'
  }
  loading.value = false
}
</script>

<style scoped>
.auth-page {
  background-color: #050510;
  color: white;
  font-family: 'IBM Plex Sans', sans-serif;
}
.auth-container {
  width: 100%;
  max-width: 400px;
  background: #0A0A16;
  border: 1px solid #1f2937;
  padding: 2rem;
  border-radius: 8px;
}
.input-field {
  width: 100%;
  background: transparent;
  border: 1px solid #374151;
  padding: 0.75rem;
  color: white;
  border-radius: 4px;
}
.input-field:focus {
  border-color: #F5B700;
  outline: none;
}
.btn-gold {
  background-color: #F5B700;
  color: black;
  font-weight: 700;
  padding: 0.75rem;
  text-transform: uppercase;
  transition: all 0.2s;
}
.btn-gold:hover:not(:disabled) {
  background-color: white;
}
.btn-gold:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
