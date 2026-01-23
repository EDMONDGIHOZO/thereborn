<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { login } = useAuth()
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const error = ref('')

const handleLogin = async () => {
  isLoading.value = true
  error.value = ''
  
  const result = await login(email.value, password.value)
  if (!result.success) {
      error.value = result.error || 'Invalid credentials'
  }
  
  isLoading.value = false
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 font-ibm">
    <div class="w-full max-w-sm p-8 bg-white border border-gray-200 shadow-sm">
        <div class="text-center mb-8">
            <img src="https://res.cloudinary.com/yebalabs-com/image/upload/v1768896006/the_reborn_pic_2_b5ec4e.png" alt="The Reborn" class="h-16 w-auto mx-auto mb-6" />
            <h2 class="text-2xl font-light text-gray-900">Log in</h2>
            <p class="text-sm text-gray-500 mt-2">Enter your credentials to access the admin panel.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="group">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Email</label>
                <input v-model="email" type="email" required
                    class="w-full bg-gray-50 border-b border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    placeholder="admin@thereborn.com" />
            </div>

            <div class="group">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Password</label>
                <input v-model="password" type="password" required
                    class="w-full bg-gray-50 border-b border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    placeholder="••••••••" />
            </div>

            <div class="flex items-center justify-between pt-2">
                 <label class="flex items-center text-sm text-gray-600 cursor-pointer select-none">
                    <input type="checkbox" class="w-4 h-4 rounded-sm border-gray-300 text-blue-600 focus:ring-0 mr-2" />
                    Remember me
                 </label>
            </div>

            <button type="submit" :disabled="isLoading"
                class="w-full bg-blue-600 text-white font-medium py-3 px-4 hover:bg-blue-700 transition-colors flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed mt-6">
                <span v-if="!isLoading">Log in</span>
                <span v-else>Loading...</span>
            </button>
        </form>
    </div>
  </div>
</template>

<style scoped>
.font-ibm {
    font-family: 'IBM Plex Sans', sans-serif;
}
</style>
