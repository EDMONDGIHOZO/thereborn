<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { token } = useAuth()
const config = useRuntimeConfig()
const API = `${config.public.apiBase}/admin`

const { data: actors, refresh, error } = await useFetch(`${API}/actors`, {
    headers: {
        Authorization: `Bearer ${token.value}`
    }
})

const approveActor = async (id: number) => {
    try {
        await $fetch(`${API}/actors/${id}/approve`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token.value}` }
        })
        refresh()
    } catch (e) {
        console.error('Failed to approve actor', e)
    }
}

const deleteActor = async (id: number) => {
    if(!confirm('Are you sure you want to delete this actor?')) return
    try {
        await $fetch(`${API}/actors/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token.value}` }
        })
        refresh()
    } catch (e) {
        console.error('Failed to delete actor', e)
    }
}

const searchTerm = ref('')
const filteredActors = computed(() => {
    if (!actors.value) return []
    return actors.value.filter((a: any) => 
        a.user.email.toLowerCase().includes(searchTerm.value.toLowerCase()) || 
        (a.about && a.about.toLowerCase().includes(searchTerm.value.toLowerCase()))
    )
})
</script>

<template>
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-300 pb-4">
        <div>
            <h1 class="text-4xl font-light text-gray-900 tracking-tight">Actors</h1>
            <p class="text-gray-600 mt-2">Manage all registered talent.</p>
        </div>
        <NuxtLink to="/admin/actors/create" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-medium transition-colors flex items-center">
            Add New Actor <Icon name="ri:add-line" class="ml-2" />
        </NuxtLink>
    </div>

    <!-- Toolbar -->
    <div class="flex items-center space-x-4 bg-white p-4 border border-gray-200 shadow-sm">
        <div class="relative flex-1 max-w-lg">
            <Icon name="ri:search-line" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input v-model="searchTerm" type="text" placeholder="Search actors..." 
                class="w-full bg-gray-100 border-b border-gray-300 focus:border-blue-600 px-10 py-3 text-gray-900 focus:outline-none transition-colors" />
        </div>
        <div class="flex-1"></div>
        <div class="flex space-x-2">
             <button class="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm">Filter</button>
             <button class="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm">Sort</button>
        </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white border border-gray-200 shadow-sm overflow-hidden">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-gray-100 border-b border-gray-200">
                    <th class="p-4 font-semibold text-gray-700 text-sm uppercase">Name / Profile</th>
                    <th class="p-4 font-semibold text-gray-700 text-sm uppercase">Roles</th>
                    <th class="p-4 font-semibold text-gray-700 text-sm uppercase">Status</th>
                    <th class="p-4 font-semibold text-gray-700 text-sm uppercase text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                <tr v-for="actor in filteredActors" :key="actor.id" class="hover:bg-blue-50 transition-colors group">
                    <td class="p-4">
                        <div class="flex items-start">
                             <div class="w-10 h-10 bg-gray-200 flex items-center justify-center mr-4 flex-shrink-0">
                                  <img v-if="actor.profileAvatarUrl" :src="actor.profileAvatarUrl" class="w-full h-full object-cover" />
                                  <Icon v-else name="ri:user-line" class="text-gray-400" />
                             </div>
                             <div>
                                  <p class="font-semibold text-gray-900">{{ actor.user.email }}</p>
                                  <p class="text-gray-500 text-xs mt-1 line-clamp-1 max-w-xs">{{ actor.about || 'No bio' }}</p>
                             </div>
                        </div>
                    </td>
                    <td class="p-4">
                        <div class="flex flex-wrap gap-1">
                            <span v-for="role in actor.cinemaRoles" :key="role" class="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs">
                                {{ role }}
                            </span>
                        </div>
                    </td>
                    <td class="p-4">
                        <span v-if="actor.approved" class="flex items-center text-green-700 text-sm font-medium">
                            <Icon name="ri:checkbox-circle-fill" class="mr-1.5" /> Approved
                        </span>
                        <span v-else class="flex items-center text-amber-600 text-sm font-medium">
                            <Icon name="ri:time-fill" class="mr-1.5" /> Pending
                        </span>
                    </td>
                    <td class="p-4 text-right">
                         <div class="flex justify-end space-x-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button v-if="!actor.approved" @click="approveActor(actor.id)" class="px-3 py-2 bg-green-600 text-white hover:bg-green-700 text-xs font-medium mr-1" title="Approve">Approve</button>
                              <button @click="deleteActor(actor.id)" class="px-3 py-2 bg-red-600 text-white hover:bg-red-700 text-xs font-medium mr-1" title="Delete">Delete</button>
                              <NuxtLink :to="`/admin/actors/${actor.id}`" class="px-3 py-2 bg-gray-800 text-white hover:bg-gray-900 text-xs font-medium">Edit</NuxtLink>
                         </div>
                    </td>
                </tr>
                <tr v-if="filteredActors.length === 0">
                    <td colspan="4" class="p-12 text-center text-gray-500">
                        No actors found.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>
