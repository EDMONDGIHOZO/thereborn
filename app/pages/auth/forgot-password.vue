<template>
  <div class="auth-page flex flex-col justify-center items-center min-h-screen py-12">
    <!-- Logo -->
    <NuxtLink to="/" class="mb-8">
      <span class="text-2xl font-bold text-white tracking-widest uppercase">The Reborn</span>
    </NuxtLink>
    
    <div class="auth-container">
      <h1 class="text-3xl font-bold mb-6 text-center">Forgot Password</h1>
      <p class="text-gray-400 mb-6 text-center text-sm">Enter your email to receive password reset instructions.</p>
      
      <form v-if="!submitted" @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-gray-400 mb-1">Email</label>
          <input v-model="email" type="email" class="input-field" required />
        </div>
        
        <button type="submit" class="btn-gold w-full flex justify-center items-center gap-2" :disabled="loading">
           <Icon v-if="loading" name="ri:loader-4-line" class="animate-spin" />
           <span>Send Reset Link</span>
        </button>
      </form>
      
      <div v-else class="text-center py-4">
         <Icon name="ri:mail-check-line" class="text-green-500 text-5xl mb-4" />
         <p class="text-white mb-4">If an account exists with that email, we've sent instructions to reset your password.</p>
         <button @click="submitted = false" class="text-yellow-500 hover:text-white text-sm">Try another email</button>
      </div>
      
      <div class="text-center mt-6 text-gray-500">
         <NuxtLink to="/auth/login" class="hover:text-white transition-colors">Back to Login</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const API = config.public.apiBase

const email = ref('')
const loading = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    await $fetch(`${API}/auth/forgot-password`, {
      method: 'POST',
      body: { email: email.value }
    })
  } catch (e) {
    // Ignore errors - we always show success for security
    console.error(e)
  }
  loading.value = false
  submitted.value = true
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
