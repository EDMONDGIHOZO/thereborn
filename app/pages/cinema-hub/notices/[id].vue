<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const API = `${config.public.apiBase}/notices/${route.params.id}`

const { data: notice, pending, error } = await useFetch<any>(API)

useHead({
  title: computed(() => notice.value ? `${notice.value.title} - Rwanda Cinema Hub` : 'Notice'),
})
</script>

<template>
  <div class="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
     <!-- Back Button -->
     <div class="max-w-4xl mx-auto mb-8">
       <NuxtLink to="/cinema-hub/notices" class="text-gray-500 hover:text-white transition-colors flex items-center group">
         <Icon name="ri:arrow-left-line" class="mr-2 transform group-hover:-translate-x-1 transition-transform" /> Back to Publications
       </NuxtLink>
     </div>

     <div v-if="pending" class="flex justify-center py-20">
       <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F5B700]"></div>
     </div>

     <div v-else-if="error || !notice" class="text-center text-red-500 py-20 bg-gray-900 rounded-lg border border-red-900 max-w-4xl mx-auto">
        <p>Notice not found or failed to load.</p>
        <NuxtLink to="/cinema-hub/notices" class="inline-block mt-4 bg-gray-800 px-4 py-2 rounded text-white hover:bg-gray-700">Return to List</NuxtLink>
     </div>

      <article v-else class="max-w-4xl mx-auto bg-[#0A0A0A] border border-gray-800 rounded-xl relative overflow-hidden">
         <!-- Cover Image -->
         <div v-if="notice.coverImage" class="w-full h-64 md:h-96 relative">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10"></div>
            <img :src="notice.coverImage" :alt="notice.title" class="w-full h-full object-cover" />
         </div>

         <div class="p-8 md:p-12 relative z-20">
            <!-- Glow effect -->
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2 bg-gradient-to-r from-transparent via-[#F5B700] to-transparent opacity-50"></div>
            
            <header class="mb-10 border-b border-gray-800 pb-10">
               <div class="flex flex-wrap items-center gap-4 text-[#F5B700] mb-6 text-sm font-mono tracking-wider">
                 <span class="bg-[#F5B700]/10 px-2 py-1 rounded">ANNOUNCEMENT</span>
                 <span class="text-gray-600">|</span>
                 <span class="text-gray-400">{{ new Date(notice.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</span>
                 <template v-if="notice.publishedBy">
                    <span class="text-gray-600">|</span>
                    <span class="text-gray-300 flex items-center"><Icon name="ri:user-3-line" class="mr-2" /> {{ notice.publishedBy }}</span>
                 </template>
               </div>
               <h1 class="text-3xl md:text-5xl font-bold text-white leading-tight">{{ notice.title }}</h1>
            </header>

            <div class="prose prose-invert prose-lg max-w-none text-gray-300 font-light leading-relaxed whitespace-pre-wrap">
              {{ notice.content }}
            </div>
         </div>
      </article>
  </div>
</template>
