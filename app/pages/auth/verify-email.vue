<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const API = config.public.apiBase

const status = ref<'verifying' | 'success' | 'error'>('verifying')
const errorMsg = ref('')

onMounted(async () => {
    const token = route.query.token as string
    
    if (!token) {
        status.value = 'error'
        errorMsg.value = 'Invalid verification link'
        return
    }

    try {
        const response = await $fetch<{ success: boolean; message: string }>(`${API}/auth/verify-email?token=${token}`)
        
        if (response.success) {
            status.value = 'success'
        } else {
            status.value = 'error'
            errorMsg.value = response.message || 'Verification failed'
        }
    } catch (e: any) {
        status.value = 'error'
        errorMsg.value = e.data?.message || 'Verification failed. The link may have expired.'
    }
})

const goToLogin = () => {
    router.push('/auth/login')
}
</script>

<template>
  <div class="bg-black min-h-screen text-white flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
        <!-- Verifying -->
        <div v-if="status === 'verifying'" class="py-20">
            <div class="animate-spin w-16 h-16 border-4 border-gray-700 border-t-[#F5B700] rounded-full mx-auto mb-6"></div>
            <h2 class="text-2xl font-special mb-2">Verifying Your Email</h2>
            <p class="text-gray-400">Please wait...</p>
        </div>

        <!-- Success -->
        <div v-else-if="status === 'success'" class="py-20 bg-gray-900 border border-gray-800 rounded-lg p-8">
            <Icon name="ri:checkbox-circle-fill" class="text-green-500 text-6xl mb-4" />
            <h2 class="text-3xl font-bold mb-4 font-special">Email Verified!</h2>
            <p class="text-gray-400 text-lg mb-8">
                Your email has been successfully verified. You can now log in and complete your profile.
            </p>
            <button @click="goToLogin" 
                class="w-full bg-[#F5B700] hover:bg-[#d4a000] text-black font-special font-bold text-xl py-4 uppercase tracking-widest transition">
                Continue to Login
            </button>
        </div>

        <!-- Error -->
        <div v-else class="py-20 bg-gray-900 border border-gray-800 rounded-lg p-8">
            <Icon name="ri:error-warning-fill" class="text-red-500 text-6xl mb-4" />
            <h2 class="text-3xl font-bold mb-4 font-special">Verification Failed</h2>
            <p class="text-gray-400 text-lg mb-8">
                {{ errorMsg }}
            </p>
            <NuxtLink to="/cinema-hub/join" 
                class="inline-block w-full bg-white text-black font-special font-bold text-xl py-4 uppercase tracking-widest hover:bg-gray-200 transition text-center">
                Try Again
            </NuxtLink>
        </div>
    </div>
  </div>
</template>

<style scoped>
.font-special {
    font-family: 'Special Gothic Expanded One', sans-serif;
}
</style>
