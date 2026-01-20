<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { logout } = useAuth()
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 font-ibm flex">
    <!-- Sidebar -->
    <aside class="w-16 lg:w-64 bg-black text-white flex flex-col fixed h-full z-20 transition-all duration-300">
      <div class="h-16 flex items-center justify-center lg:justify-start">
         <img src="https://res.cloudinary.com/yebalabs-com/image/upload/v1768896006/the_reborn_pic_2_b5ec4e.png" alt="Logo" class="h-auto w-full p-1" />
      </div>

      <nav class="flex-1 flex flex-col mt-4">
        <NuxtLink to="/admin" 
            class="flex items-center px-4 lg:px-6 py-4 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors border-l-4 border-transparent hover:border-white group"
            active-class="bg-gray-800 text-white border-white">
            <Icon name="ri:dashboard-line" class="text-xl lg:mr-3 flex-shrink-0" />
            <span class="font-medium hidden lg:block">Dashboard</span>
        </NuxtLink>
        <NuxtLink to="/admin/actors" 
            class="flex items-center px-4 lg:px-6 py-4 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors border-l-4 border-transparent hover:border-white group"
            active-class="bg-gray-800 text-white border-white">
            <Icon name="ri:user-star-line" class="text-xl lg:mr-3 flex-shrink-0" />
            <span class="font-medium hidden lg:block">Actors</span>
        </NuxtLink>
        <NuxtLink to="/admin/movies" 
            class="flex items-center px-4 lg:px-6 py-4 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors border-l-4 border-transparent hover:border-white group"
            active-class="bg-gray-800 text-white border-white">
            <Icon name="ri:movie-2-line" class="text-xl lg:mr-3 flex-shrink-0" />
            <span class="font-medium hidden lg:block">Movies</span>
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-gray-800">
        <button @click="logout" 
            class="flex items-center justify-center lg:justify-start w-full px-2 lg:px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <Icon name="ri:logout-box-line" class="text-xl lg:mr-3" />
            <span class="font-medium hidden lg:block">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 ml-16 lg:ml-64 p-4 lg:p-8 relative bg-[#f4f4f4]">
        <header class="mb-12 flex justify-between items-center">
             <!-- Breadcrumbs or Title -->
             <div></div>
             <!-- User Profile -->
             <div class="flex items-center space-x-4">
                  <div class="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs">A</div>
             </div>
        </header>

        <slot />
    </main>
  </div>
</template>

<style scoped>
.font-ibm {
    font-family: 'IBM Plex Sans', sans-serif;
}
</style>
