<template>
  <div class="auth-page flex flex-col justify-center items-center min-h-screen py-12">

    <div class="auth-container">
      <h1 class="text-3xl font-bold mb-6 text-center">Create Account</h1>
      <p class="text-gray-400 mb-6 text-center text-sm">Sign up to message actors and save your favorites.</p>
      
      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label class="block text-gray-400 mb-1">Email</label>
          <input v-model="email" type="email" class="input-field" required />
        </div>
        <div>
          <label class="block text-gray-400 mb-1">Password</label>
          <input v-model="password" type="password" class="input-field" required minlength="6" />
        </div>
        <div>
           <label class="block text-gray-400 mb-1">Confirm Password</label>
           <input v-model="confirmPassword" type="password" class="input-field" required minlength="6" />
        </div>
        
        <div v-if="error" class="text-red-500 text-sm text-center">{{ error }}</div>
        
        <button type="submit" class="btn-gold w-full flex justify-center items-center gap-2" :disabled="loading">
           <Icon v-if="loading" name="ri:loader-4-line" class="animate-spin" />
           <span>Sign Up</span>
        </button>
      </form>
      
      <div class="text-center mt-6 text-gray-500">
         Already have an account? <NuxtLink to="/auth/login" class="text-yellow-500 hover:text-white transition-colors">Login</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)
const { registerFan } = useAuth()

const handleSignup = async () => {
  if (password.value !== confirmPassword.value) {
      error.value = "Passwords do not match."
      return
  }

  loading.value = true
  error.value = ''
  
  const success = await registerFan(email.value, password.value)
  if (!success) {
    error.value = 'Registration failed. Email might be in use.'
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
