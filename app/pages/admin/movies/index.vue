<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { token } = useAuth()
const config = useRuntimeConfig()
const API = `${config.public.apiBase}/admin`

const { data: movies, refresh, error } = await useFetch(`${API}/movies`, {
    headers: {
        Authorization: `Bearer ${token.value}`
    }
})

const deleteMovie = async (id: number) => {
    if(!confirm('Are you sure you want to delete this movie?')) return
    try {
        await $fetch(`${API}/movies/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token.value}` }
        })
        refresh()
    } catch (e) {
        console.error('Failed to delete movie', e)
    }
}

const searchTerm = ref('')
const filteredMovies = computed(() => {
    if (!movies.value) return []
    return movies.value.filter((m: any) => 
        m.title.toLowerCase().includes(searchTerm.value.toLowerCase()) || 
        (m.director && m.director.toLowerCase().includes(searchTerm.value.toLowerCase()))
    )
})
</script>

<template>
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-300 pb-4">
        <div>
            <h1 class="text-4xl font-light text-gray-900 tracking-tight">Movies</h1>
            <p class="text-gray-600 mt-2">Manage cinema database.</p>
        </div>
        <NuxtLink to="/admin/movies/create" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-medium transition-colors flex items-center">
            Add New Movie <Icon name="ri:add-line" class="ml-2" />
        </NuxtLink>
    </div>

    <!-- Toolbar -->
    <div class="flex items-center space-x-4 bg-white p-4 border border-gray-200 shadow-sm">
        <div class="relative flex-1 max-w-lg">
            <Icon name="ri:search-line" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input v-model="searchTerm" type="text" placeholder="Search movies..." 
                class="w-full bg-gray-100 border-b border-gray-300 focus:border-blue-600 px-10 py-3 text-gray-900 focus:outline-none transition-colors" />
        </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white border border-gray-200 shadow-sm overflow-hidden">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-gray-100 border-b border-gray-200">
                    <th class="p-4 font-semibold text-gray-700 text-sm uppercase">Movie Details</th>
                    <th class="p-4 font-semibold text-gray-700 text-sm uppercase">Director</th>
                    <th class="p-4 font-semibold text-gray-700 text-sm uppercase">Release Date</th>
                    <th class="p-4 font-semibold text-gray-700 text-sm uppercase text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                <tr v-for="movie in filteredMovies" :key="movie.id" class="hover:bg-blue-50 transition-colors group">
                    <td class="p-4">
                        <div class="flex items-start">
                             <div class="w-10 h-14 bg-gray-200 flex items-center justify-center mr-4 flex-shrink-0 overflow-hidden">
                                  <img v-if="movie.posterUrl" :src="movie.posterUrl" class="w-full h-full object-cover" />
                                  <Icon v-else name="ri:movie-2-line" class="text-gray-400" />
                             </div>
                             <div>
                                  <p class="font-semibold text-gray-900">{{ movie.title }}</p>
                                  <p class="text-gray-500 text-xs mt-1 line-clamp-1 max-w-xs">{{ movie.description || 'No description' }}</p>
                             </div>
                        </div>
                    </td>
                    <td class="p-4 text-sm text-gray-600">
                        {{ movie.director || 'Unknown' }}
                    </td>
                     <td class="p-4 text-sm text-gray-600">
                        {{ movie.releaseDate || 'TBA' }}
                    </td>
                    <td class="p-4 text-right">
                         <div class="flex justify-end space-x-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button @click="deleteMovie(movie.id)" class="px-3 py-2 bg-red-600 text-white hover:bg-red-700 text-xs font-medium mr-1" title="Delete">Delete</button>
                              <NuxtLink :to="`/admin/movies/${movie.id}`" class="px-3 py-2 bg-gray-800 text-white hover:bg-gray-900 text-xs font-medium">Edit</NuxtLink>
                         </div>
                    </td>
                </tr>
                <tr v-if="filteredMovies.length === 0">
                    <td colspan="4" class="p-12 text-center text-gray-500">
                        No movies found.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>
