<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { token } = useAuth()
const config = useRuntimeConfig()
const API = `${config.public.apiBase}/notices`

const { data: notices, refresh } = await useFetch<any[]>(API)

async function deleteNotice(id: number) {
  if (!confirm('Are you sure you want to delete this notice?')) return
  
  try {
     await $fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
           Authorization: `Bearer ${token.value}`
        }
     })
     await refresh()
  } catch (e) {
     console.error(e)
     alert('Failed to delete notice. You might not have permission.')
  }
}
</script>

<template>
  <div class="px-4 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-8">
       <div>
         <h1 class="text-3xl font-light text-gray-900 tracking-tighter">Notices Board</h1>
         <p class="text-gray-500 mt-2 font-light">Manage announcements and notify all users.</p>
       </div>
       <NuxtLink to="/admin/notices/create" class="bg-gray-900 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors flex items-center shadow-lg hover:shadow-xl">
         <Icon name="ri:add-line" class="mr-2" />
         Create Notice
       </NuxtLink>
    </div>
    
    <!-- List -->
    <div class="bg-white border border-gray-200 shadow-sm">
       <div v-if="!notices?.length" class="p-12 text-center text-gray-400 font-light">
          No notices found. <NuxtLink to="/admin/notices/create" class="text-blue-600 hover:underline">Create one</NuxtLink> to get started.
       </div>

       <div v-else v-for="notice in notices" :key="notice.id" class="p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors flex justify-between items-start group">
          <div class="flex-1 pr-8 flex items-start gap-4">
            <div v-if="notice.coverImage" class="w-24 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0 border border-gray-200">
               <img :src="notice.coverImage" class="w-full h-full object-cover" />
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{{ notice.title }}</h3>
              <div class="flex items-center gap-3 text-xs text-gray-400 uppercase tracking-wider mb-2">
                 <span>{{ new Date(notice.publishedAt).toLocaleString() }}</span>
                 <span v-if="notice.publishedBy" class="flex items-center text-gray-500 border-l border-gray-300 pl-3">
                    <Icon name="ri:user-3-line" class="mr-1" /> {{ notice.publishedBy }}
                 </span>
              </div>
              <p class="text-gray-600 line-clamp-2 text-sm max-w-3xl font-light">{{ notice.content }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-2 pt-2">
             <NuxtLink :to="`/admin/notices/${notice.id}`" class="p-2 text-gray-400 hover:text-blue-600 border border-gray-200 bg-white hover:border-blue-600 transition-all rounded-sm" title="Edit">
                <Icon name="ri:edit-line" />
             </NuxtLink>
             <button @click="deleteNotice(notice.id)" class="p-2 text-gray-400 hover:text-red-600 border border-gray-200 bg-white hover:border-red-600 transition-all rounded-sm" title="Delete">
                <Icon name="ri:delete-bin-line" />
             </button>
             <NuxtLink :to="`/cinema-hub/notices/${notice.id}`" target="_blank" class="p-2 text-gray-400 hover:text-green-600 border border-gray-200 bg-white hover:border-green-600 transition-all rounded-sm" title="View Live">
                <Icon name="ri:external-link-line" />
             </NuxtLink>
          </div>
       </div>
    </div>
  </div>
</template>
