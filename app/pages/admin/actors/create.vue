<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { token } = useAuth()
const config = useRuntimeConfig()
const API = `${config.public.apiBase}/admin`
const router = useRouter()

const form = ref({
    email: '',
    password: '',
    age: null,
    location: '',
    about: '',
    profileAvatarUrl: ''
})

const isLoading = ref(false)

const createActor = async () => {
    isLoading.value = true
    try {
        await $fetch(`${API}/actors`, {
            method: 'POST',
            body: form.value,
            headers: { Authorization: `Bearer ${token.value}` }
        })
        router.push('/admin/actors')
    } catch (e) {
        console.error('Failed to create actor', e)
        alert('Failed to create actor. Email might already exist.')
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <header class="mb-8 border-b border-gray-300 pb-4">
        <h1 class="text-3xl font-light text-gray-900">Add New Actor</h1>
    </header>

    <form @submit.prevent="createActor" class="space-y-6 bg-white p-8 border border-gray-200 shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- User Credentials -->
            <div class="group">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Email</label>
                <input v-model="form.email" type="email" required placeholder="actor@example.com"
                    class="w-full bg-gray-50 border-b border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" />
            </div>
             <div class="group">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Password</label>
                <input v-model="form.password" type="password" required placeholder="••••••••"
                    class="w-full bg-gray-50 border-b border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" />
            </div>

            <!-- Profile Details -->
            <div class="group">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Age</label>
                <input v-model="form.age" type="number"
                    class="w-full bg-gray-50 border-b border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" />
            </div>

            <div class="group">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Location</label>
                <input v-model="form.location" type="text" placeholder="e.g. Kigali, Rwanda"
                    class="w-full bg-gray-50 border-b border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" />
            </div>
            
            <div class="group md:col-span-2">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Avatar URL</label>
                <input v-model="form.profileAvatarUrl" type="url" placeholder="https://..."
                    class="w-full bg-gray-50 border-b border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" />
            </div>

            <div class="group md:col-span-2">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">About / Bio</label>
                <textarea v-model="form.about" rows="6"
                    class="w-full bg-gray-50 border-b border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors"></textarea>
            </div>
        </div>

        <div class="flex justify-end pt-6">
             <NuxtLink to="/admin/actors" class="px-6 py-3 text-gray-600 hover:bg-gray-100 mr-4 font-medium transition-colors">Cancel</NuxtLink>
             <button type="submit" :disabled="isLoading"
                class="bg-blue-600 text-white px-8 py-3 font-medium hover:bg-blue-700 transition-colors disabled:opacity-50">
                {{ isLoading ? 'Saving...' : 'Create Actor' }}
             </button>
        </div>
    </form>
  </div>
</template>
