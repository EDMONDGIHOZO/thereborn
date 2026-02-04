<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { logout } = useAuth()
const isSidebarOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 font-ibm flex">
    <Head>
      <title>Rwanda Cinema Hub Admin</title>
    </Head>
    <!-- Sidebar -->
    <!-- Mobile Sidebar Backdrop -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 bg-black/50 z-20 lg:hidden"></div>
    
    <aside :class="[
      'fixed top-0 left-0 h-full bg-black text-white flex flex-col z-30 transition-all duration-300 w-64',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
      <div class="h-16 flex items-center justify-between px-4 lg:justify-center">
         <img src="https://res.cloudinary.com/yebalabs-com/image/upload/v1768896006/the_reborn_pic_2_b5ec4e.png" alt="Logo" class="h-8 lg:h-auto w-auto" />
         <button @click="isSidebarOpen = false" class="lg:hidden text-gray-400">
           <Icon name="ri:close-line" class="text-2xl" />
         </button>
      </div>

      <nav class="flex-1 flex flex-col mt-4">
        <NuxtLink to="/admin"
            @click="isSidebarOpen = false"
            class="flex items-center px-6 py-4 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors border-l-4 border-transparent hover:border-white group"
            active-class="bg-gray-800 text-white border-white">
            <Icon name="ri:dashboard-line" class="text-xl mr-3 flex-shrink-0" />
            <span class="font-medium">Dashboard</span>
        </NuxtLink>
        <NuxtLink to="/admin/actors"
            @click="isSidebarOpen = false"
            class="flex items-center px-6 py-4 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors border-l-4 border-transparent hover:border-white group"
            active-class="bg-gray-800 text-white border-white">
            <Icon name="ri:user-star-line" class="text-xl mr-3 flex-shrink-0" />
            <span class="font-medium">Actors</span>
        </NuxtLink>
        <NuxtLink to="/admin/movies"
            @click="isSidebarOpen = false"
            class="flex items-center px-6 py-4 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors border-l-4 border-transparent hover:border-white group"
            active-class="bg-gray-800 text-white border-white">
            <Icon name="ri:movie-2-line" class="text-xl mr-3 flex-shrink-0" />
            <span class="font-medium">Movies</span>
        </NuxtLink>
        <NuxtLink to="/admin/notices"
            @click="isSidebarOpen = false"
            class="flex items-center px-6 py-4 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors border-l-4 border-transparent hover:border-white group"
            active-class="bg-gray-800 text-white border-white">
            <Icon name="ri:article-line" class="text-xl mr-3 flex-shrink-0" />
            <span class="font-medium">Publications</span>
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-gray-800">
        <button @click="logout"
            class="flex items-center w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <Icon name="ri:logout-box-line" class="text-xl mr-3" />
            <span class="font-medium">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 lg:ml-64 p-4 lg:p-8 relative bg-[#f4f4f4] min-w-0">
        <header class="mb-8 flex justify-between items-center">
             <!-- Mobile Menu Toggle -->
             <button @click="isSidebarOpen = !isSidebarOpen" class="lg:hidden text-gray-900 p-2 -ml-2">
                <Icon name="ri:menu-line" class="text-2xl" />
             </button>
             
             <!-- Breadcrumbs or Spacer -->
             <div class="hidden lg:block"></div>

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
