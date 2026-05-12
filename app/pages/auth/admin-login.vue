<template>
  <div class="auth-page flex flex-col justify-center items-center min-h-screen py-12">
    <NuxtLink to="/" class="mb-8">
      <span class="text-2xl font-bold text-white tracking-widest uppercase">The Reborn</span>
    </NuxtLink>

    <div class="auth-container">
      <div class="text-center mb-4">
        <Icon name="mdi:shield-account" class="text-red-500 text-4xl"/>
      </div>
      <h1 class="text-3xl font-bold mb-2 text-center">Admin Login</h1>
      <p class="text-gray-400 text-center text-sm mb-6">Administrative access only</p>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="admin-email" class="block text-gray-400 mb-1">Email</label>
          <input
            id="admin-email"
            v-model="email"
            name="email"
            type="email"
            autocomplete="email"
            spellcheck="false"
            class="input-field"
            required
          />
        </div>
        <div>
          <label for="admin-password" class="block text-gray-400 mb-1">Password</label>
          <input
            id="admin-password"
            v-model="password"
            name="password"
            type="password"
            autocomplete="current-password"
            class="input-field"
            required
          />
        </div>
        <div v-if="error" class="text-red-500 text-sm text-center" role="alert" aria-live="polite">{{ error }}</div>
        <button type="submit" class="btn-admin w-full flex justify-center items-center gap-2" :disabled="loading">
          <Icon v-if="loading" name="ri:loader-4-line" class="animate-spin"/>
          <span>{{ loading ? 'Signing In…' : 'Login as Admin' }}</span>
        </button>
      </form>
      <div class="text-center mt-6 text-gray-500 text-sm">
        <NuxtLink to="/auth/forgot-password" class="hover:text-white">Forgot Password?</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const { login, user } = useAuth()
const router = useRouter()

const handleLogin = async () => {
  if (loading.value) {
    return
  }

  loading.value = true
  error.value = ''

  try {
    const result = await login(email.value, password.value, {
      redirect: false,
      requiredRoles: ['ADMIN', 'SUPER_ADMIN']
    })

    if (!result.success) {
      error.value = result.error || 'Invalid email or password'
      return
    }

    await router.push('/admin')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const roles = user.value?.roles || []
  if (roles.includes('ADMIN') || roles.includes('SUPER_ADMIN')) {
    router.push('/admin')
  }
})
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
  border-color: #ef4444;
  outline: 2px solid #ef4444;
  outline-offset: 2px;
}

.btn-admin {
  background-color: #ef4444;
  color: white;
  font-weight: 700;
  padding: 0.75rem;
  text-transform: uppercase;
  transition: background-color 0.2s ease, opacity 0.2s ease;
}

.btn-admin:hover:not(:disabled) {
  background-color: #dc2626;
}

.btn-admin:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

.btn-admin:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
