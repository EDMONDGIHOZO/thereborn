<script setup lang="ts">
import { ref } from 'vue'

const config = useRuntimeConfig()
const API = config.public.apiBase

const form = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const isLoading = ref(false)
const success = ref(false)
const errorMsg = ref('')

const submitForm = async () => {
    if (form.value.password !== form.value.confirmPassword) {
        errorMsg.value = 'Passwords do not match'
        return
    }

    if (form.value.password.length < 6) {
        errorMsg.value = 'Password must be at least 6 characters'
        return
    }

    isLoading.value = true
    errorMsg.value = ''
    try {
        await $fetch(`${API}/auth/register`, {
            method: 'POST',
            body: {
                email: form.value.email,
                password: form.value.password
            }
        })

        success.value = true
    } catch (e: any) {
        console.error('Registration error', e)
        errorMsg.value = e.data?.message || 'Failed to register. Please try again.'
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
  <div class="bg-black min-h-screen text-white pt-32 pb-20 px-4 md:px-8">
    <div class="max-w-md mx-auto">
        <div v-if="success" class="text-center py-20 bg-gray-900 border border-gray-800 rounded-lg p-8">
            <Icon name="ri:mail-check-fill" class="text-green-500 text-6xl mb-4" />
            <h2 class="text-3xl font-bold mb-4 font-special">Check Your Email</h2>
            <p class="text-gray-400 text-lg mb-8">
                We've sent a verification link to <strong class="text-white">{{ form.email }}</strong>. 
                Please check your inbox and click the link to verify your account.
            </p>
            <p class="text-gray-500 text-sm mb-6">
                Didn't receive the email? Check your spam folder or wait a few minutes.
            </p>
            <NuxtLink to="/cinema-hub" class="inline-block bg-white text-black px-8 py-3 font-special uppercase tracking-widest hover:bg-gray-200 transition">
                Return to Hub
            </NuxtLink>
        </div>

        <div v-else>
            <h1 class="text-4xl md:text-5xl font-special mb-2">Join the Hub</h1>
            <p class="text-gray-400 mb-10">Create your account to be discovered in Rwanda's cinema ecosystem.</p>

            <form @submit.prevent="submitForm" class="space-y-6">
                <div>
                    <label class="block text-gray-400 mb-2 text-sm uppercase tracking-wide">Email Address</label>
                    <input v-model="form.email" type="email" required 
                        class="w-full bg-gray-900 border border-gray-800 rounded p-3 text-white focus:border-white outline-none transition" 
                        placeholder="your@email.com" />
                </div>

                <div>
                    <label class="block text-gray-400 mb-2 text-sm uppercase tracking-wide">Password</label>
                    <input v-model="form.password" type="password" required 
                        class="w-full bg-gray-900 border border-gray-800 rounded p-3 text-white focus:border-white outline-none transition" 
                        placeholder="••••••••" />
                </div>

                <div>
                    <label class="block text-gray-400 mb-2 text-sm uppercase tracking-wide">Confirm Password</label>
                    <input v-model="form.confirmPassword" type="password" required 
                        class="w-full bg-gray-900 border border-gray-800 rounded p-3 text-white focus:border-white outline-none transition" 
                        placeholder="••••••••" />
                </div>

                <div v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</div>

                <div class="pt-4">
                    <button type="submit" :disabled="isLoading" 
                        class="w-full bg-[#F5B700] hover:bg-[#d4a000] text-black font-special font-bold text-xl py-4 uppercase tracking-widest transition disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ isLoading ? 'Creating Account...' : 'Create Account' }}
                    </button>
                </div>

                <p class="text-center text-gray-500 text-sm">
                    Already have an account? 
                    <NuxtLink to="/auth/login" class="text-white hover:underline">Sign in</NuxtLink>
                </p>
            </form>
        </div>
    </div>
  </div>
</template>

<style scoped>
.font-special {
    font-family: 'Special Gothic Expanded One', sans-serif;
}
</style>
