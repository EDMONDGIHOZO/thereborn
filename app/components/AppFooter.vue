<template>
  <footer class="bg-cinema-dark text-white py-12 px-6 border-t border-white/10 mt-auto">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <!-- Brand Section -->
      <div class="flex flex-col gap-6 w-full md:w-auto items-center md:items-start shrink-0">
        <div class="w-48 md:w-56">
          <NuxtLink to="/">
            <LogoBox class="!w-full !p-0" />
          </NuxtLink>
        </div>
        
        <div class="flex flex-col gap-3 items-center md:items-start text-gray-400">
           <a href="tel:+250788347428" class="font-body hover:text-cinema-gold transition-colors tracking-wide">+250 788 347 428</a>
           <div class="flex items-center gap-4">
             <div class="flex gap-3">
               <a href="https://instagram.com/thereborn" target="_blank" aria-label="Instagram" class="hover:text-cinema-gold transition-colors">
                 <Icon name="mdi:instagram" size="24" />
               </a>
               <a href="https://facebook.com/thereborn" target="_blank" aria-label="Facebook" class="hover:text-cinema-gold transition-colors">
                 <Icon name="mdi:facebook" size="24" />
               </a>
             </div>
           </div>
        </div>
      </div>

      <!-- Links Section -->
      <nav class="flex flex-col gap-3 text-center md:text-right items-center md:items-end">
        <NuxtLink 
          v-for="(link, index) in footerLinks" 
          :key="index" 
          :to="link.path"
          class="font-body text-gray-300 hover:text-cinema-gold transition-colors duration-300 text-sm md:text-base uppercase tracking-wider"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
    
    <div class="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-gray-500 text-xs font-body">
      &copy; {{ new Date().getFullYear() }} The Reborn Company. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
const footerLinks = [
  { label: 'The Reborn Company', path: '/' },
  { label: 'The Reborn Construction', path: '/construction' },
  { label: 'The Reborn Real Estate', path: '/real-estate' },
  { label: 'A Golden Pillar Pictures', path: '/golden-pillar' },
  { label: 'Rwandan Cinema Hub', path: '/cinema-hub' },
]
</script>

<style scoped>
/* Optional: specific overrides if tailwind isn't sufficient */
</style>
