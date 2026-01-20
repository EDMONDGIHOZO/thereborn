<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { token } = useAuth()
const config = useRuntimeConfig()
const API = `${config.public.apiBase}/admin`
const route = useRoute()
const router = useRouter()
const id = route.params.id

const form = ref({
    title: '',
    description: '',
    director: '',
    releaseDate: '',
    posterUrl: '',
    trailerUrl: ''
})

const isLoading = ref(false)

// Fetch existing movie
const { data: movie, error } = await useFetch<any>(`${API}/movies/${id}`, {
    headers: { Authorization: `Bearer ${token.value}` }
})

if (movie.value) {
    form.value = { ...movie.value }
}

const updateMovie = async () => {
    isLoading.value = true
    try {
        await $fetch(`${API}/movies/${id}`, {
            method: 'PUT',
            body: form.value,
            headers: { Authorization: `Bearer ${token.value}` }
        })
        router.push('/admin/movies')
    } catch (e) {
        console.error('Failed to update movie', e)
        alert('Failed to update movie')
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <header class="mb-8 border-b border-gray-300 pb-4">
        <h1 class="text-3xl font-light text-gray-900">Edit Movie</h1>
    </header>

    <form @submit.prevent="updateMovie" class="space-y-6 bg-white p-8 border border-gray-200 shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="group">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Title</label>
                <input v-model="form.title" type="text" required
                    class="w-full bg-gray-50 border-b border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" />
            </div>

            <div class="group">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Director</label>
                <input v-model="form.director" type="text"
                    class="w-full bg-gray-50 border-b border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" />
            </div>
            
            <div class="group">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Release Date</label>
                <input v-model="form.releaseDate" type="date"
                    class="w-full bg-gray-50 border-b border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" />
            </div>
             <div class="group">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Poster URL</label>
                <input v-model="form.posterUrl" type="url" placeholder="https://..."
                    class="w-full bg-gray-50 border-b border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" />
            </div>
             <div class="group md:col-span-2">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Trailer URL</label>
                <input v-model="form.trailerUrl" type="url" placeholder="https://youtube.com/..."
                    class="w-full bg-gray-50 border-b border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" />
            </div>

            <div class="group md:col-span-2">
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Description</label>
                <textarea v-model="form.description" rows="4"
                    class="w-full bg-gray-50 border-b border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors"></textarea>
            </div>
        </div>

        <div class="flex justify-end pt-6">
             <NuxtLink to="/admin/movies" class="px-6 py-3 text-gray-600 hover:bg-gray-100 mr-4 font-medium transition-colors">Cancel</NuxtLink>
             <button type="submit" :disabled="isLoading"
                class="bg-blue-600 text-white px-8 py-3 font-medium hover:bg-blue-700 transition-colors disabled:opacity-50">
                {{ isLoading ? 'Saving...' : 'Update Movie' }}
             </button>
        </div>
    </form>
  </div>
</template>
