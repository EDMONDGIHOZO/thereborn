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
    age: null,
    location: '',
    about: '',
    profileAvatarUrl: ''
})

const isLoading = ref(false)

// Fetch actor details
// Note: The API returns ActorProfileDto which has UserDto nested. 
// We are only editing the profile fields here.
const { data: actor, error } = await useFetch<any>(`${API}/actors`, {
    headers: { Authorization: `Bearer ${token.value}` },
    // We need to fetch all and find, or assume we have a get-by-id endpoint which is usually standard but our AdminController currently has getAllActors.
    // Let's check AdminController... it has `getAllActors` and `updateActorProfile`. It does NOT have `getActorById`.
    // We should probably rely on `getAllActors` and filter for now since we don't want to change backend again unless necessary, 
    // BUT fetching all just to edit one is inefficient. 
    // However, for MVP with small number of actors it works.
    // Wait, let's just add getActor in AdminController? - No, user said "do frontend too". 
    // Let's just use what we have or filter client side.
    transform: (actors) => actors.find((a: any) => a.id == id)
})

// Use watcher to set form when data arrives
watch(actor, (newVal) => {
    if (newVal) {
        form.value = {
            age: newVal.age,
            location: newVal.location,
            about: newVal.about,
            profileAvatarUrl: newVal.profileAvatarUrl
        }
    }
}, { immediate: true })

const updateActor = async () => {
    isLoading.value = true
    try {
        await $fetch(`${API}/actors/${id}`, {
            method: 'PUT',
            body: form.value,
            headers: { Authorization: `Bearer ${token.value}` }
        })
        router.push('/admin/actors')
    } catch (e) {
        console.error('Failed to update actor', e)
        alert('Failed to update actor')
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <header class="mb-8 border-b border-gray-300 pb-4 flex justify-between items-center">
        <div>
            <h1 class="text-3xl font-light text-gray-900">Edit Actor Profile</h1>
            <p v-if="actor" class="text-gray-500 mt-1">{{ actor.user.email }}</p>
        </div>
    </header>

    <form @submit.prevent="updateActor" class="space-y-6 bg-white p-8 border border-gray-200 shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                {{ isLoading ? 'Saving...' : 'Update Profile' }}
             </button>
        </div>
    </form>
  </div>
</template>
