<template>
  <div class="auth-page flex flex-col justify-center items-center min-h-screen py-12">
    <!-- Logo -->
    <NuxtLink to="/" class="mb-8">
      <span class="text-2xl font-bold text-white tracking-widest uppercase">The Reborn</span>
    </NuxtLink>
    
    <div class="auth-container">
      <h1 class="text-3xl font-bold mb-6 text-center">Reset Password</h1>
      
      <div v-if="!success && !error">
        <p class="text-gray-400 mb-6 text-center text-sm">Enter your new password below.</p>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-gray-400 mb-1">New Password</label>
            <input v-model="password" type="password" class="input-field" required minlength="6" />
          </div>
          <div>
            <label class="block text-gray-400 mb-1">Confirm Password</label>
            <input v-model="confirmPassword" type="password" class="input-field" required minlength="6" />
          </div>
          
          <div v-if="formError" class="text-red-500 text-sm text-center">{{ formError }}</div>
          
          <button type="submit" class="btn-gold w-full flex justify-center items-center gap-2" :disabled="loading">
             <Icon v-if="loading" name="ri:loader-4-line" class="animate-spin" />
             <span>Reset Password</span>
          </button>
        </form>
      </div>
      
      <div v-else-if="success" class="text-center py-4">
         <Icon name="ri:check-double-line" class="text-green-500 text-5xl mb-4" />
         <p class="text-white mb-4">Your password has been reset successfully!</p>
         <NuxtLink to="/auth/login" class="btn-gold inline-block">Login Now</NuxtLink>
      </div>
      
      <div v-else-if="error" class="text-center py-4">
         <Icon name="ri:error-warning-line" class="text-red-500 text-5xl mb-4" />
         <p class="text-white mb-4">{{ error }}</p>
         <NuxtLink to="/auth/forgot-password" class="text-yellow-500 hover:text-white">Request a new reset link</NuxtLink>
      </div>
      
      <div class="text-center mt-6 text-gray-500">
         <NuxtLink to="/auth/login" class="hover:text-white transition-colors">Back to Login</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const API = config.public.apiBase

const token = computed(() => route.query.token as string)
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref('')
const formError = ref('')

onMounted(() => {
  if (!token.value) {
    error.value = 'Invalid or missing reset token.'
  }
})

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    formError.value = 'Passwords do not match.'
    return
  }
  
  loading.value = true
  formError.value = ''
  
  try {
    await $fetch(`${API}/auth/reset-password`, {
      method: 'POST',
      body: { 
        token: token.value,
        newPassword: password.value 
      }
    })
    success.value = true
  } catch (e) {
    error.value = 'Invalid or expired reset link. Please request a new one.'
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
  padding: 0.75rem 1.5rem;
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
