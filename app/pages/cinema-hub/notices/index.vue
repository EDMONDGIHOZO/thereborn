<script setup lang="ts">
const config = useRuntimeConfig()
const API = `${config.public.apiBase}/notices`

const { data: notices, pending, error } = await useFetch<any[]>(API)

useHead({
  title: 'Publications - Rwanda Cinema Hub',
  meta: [
    { name: 'description', content: 'Latest publications, notices and updates from the Rwanda Cinema Hub.' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
     <div class="max-w-5xl mx-auto">
       <!-- Header -->
       <div class="mb-8">
         <NuxtLink to="/cinema-hub" class="text-gray-500 hover:text-white transition-colors flex items-center group mb-8 w-fit">
           <Icon name="ri:arrow-left-line" class="mr-2 transform group-hover:-translate-x-1 transition-transform" /> Back to Hub
         </NuxtLink>
         
         <div class="text-center">
           <h1 class="text-4xl md:text-6xl font-gravitas text-[#F5B700] mb-4">Publications</h1>
           <p class="text-gray-400 text-lg max-w-2xl mx-auto">Stay updated with the latest announcements, casting calls, and news from the Rwanda Cinema Hub community.</p>
         </div>
       </div>
       
       <div v-if="pending" class="flex justify-center py-20">
         <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F5B700]"></div>
       </div>
       
       <div v-else-if="error" class="text-center text-red-500 py-20 bg-gray-900 rounded-lg border border-red-900">
         <p>Unable to load notices at this time. Please try again later.</p>
       </div>
       
       <div v-else class="grid gap-8">
         <div v-if="notices?.length === 0" class="text-center text-gray-500 py-20">
           No notices published yet.
         </div>
                  <div v-else v-for="notice in notices" :key="notice.id" 
               class="group bg-[#0A0A0A] border border-gray-800 rounded-xl hover:border-[#F5B700]/50 transition-all duration-300 relative overflow-hidden flex flex-col">
            
            <!-- Cover Image -->
            <div v-if="notice.coverImage" class="h-56 w-full overflow-hidden relative">
              <div class="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 opacity-60"></div>
              <img :src="notice.coverImage" :alt="notice.title" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>

            <div class="p-8 relative z-10 flex flex-col flex-grow">
              <!-- Decorative gradient -->
              <div class="absolute top-0 right-0 w-32 h-32 bg-[#F5B700] opacity-0 group-hover:opacity-5 blur-3xl transition-opacity pointer-events-none"></div>
              
              <div class="flex flex-col gap-4 mb-4">
                 <div class="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-wider">
                    <!-- Date -->
                    <span class="text-[#F5B700] bg-[#F5B700]/10 px-2 py-1 rounded">
                      {{ new Date(notice.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) }}
                    </span>
                    <!-- Published By -->
                    <span v-if="notice.publishedBy" class="text-gray-400 border border-gray-800 px-2 py-1 rounded flex items-center">
                       <Icon name="ri:user-3-line" class="mr-1.5" /> {{ notice.publishedBy }}
                    </span>
                 </div>

                 <h2 class="text-2xl font-bold text-white group-hover:text-[#F5B700] transition-colors leading-tight">{{ notice.title }}</h2>
              </div>
              
              <p class="text-gray-400 mb-6 line-clamp-3 leading-relaxed font-light flex-grow">{{ notice.content }}</p>
              
              <div class="mt-auto pt-6 border-t border-gray-800/50">
                <NuxtLink :to="`/cinema-hub/notices/${notice.id}`" 
                  class="inline-flex items-center text-white hover:text-[#F5B700] transition-colors uppercase text-xs tracking-widest font-bold group/link">
                  Read Publication
                  <Icon name="ri:arrow-right-line" class="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                </NuxtLink>
              </div>
            </div>
         </div>
       </div>
     </div>
  </div>
</template>

<style scoped>
.font-gravitas {
  font-family: 'Gravitas One', cursive;
}
</style>
