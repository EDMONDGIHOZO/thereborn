<template>
  <div class="actor-profile-page bg-black min-h-screen">
    <!-- Breadcrumb / Back Navigation -->
    <div class="container-width pt-32 pb-12 px-6">
      <NuxtLink to="/cinema-hub" class="back-link group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
        <Icon name="ri:arrow-left-line" class="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Cinema Hub</span>
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center items-center h-[60vh]">
      <Icon name="ri:loader-4-line" class="animate-spin text-4xl text-white" />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container-width px-6 py-20 text-center">
      <h2 class="text-3xl font-bold text-white mb-4">Profile Not Found</h2>
      <p class="text-gray-400 mb-8">The actor profile you are looking for does not exist or has been removed.</p>
      <NuxtLink to="/cinema-hub" class="btn-gold">Return to Directory</NuxtLink>
    </div>

    <!-- Content -->
    <div v-else-if="actor" class="container-width px-6 pb-20">
      
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        <!-- LEFT COLUMN: Profile Info & Image -->
        <div class="flex flex-col lg:w-1/3 shrink-0">
          
          <!-- Image Container with Like Overlay -->
          <div class="relative w-full max-w-sm mx-auto lg:mx-0 aspect-[3/4] mb-8 group">
            <div class="w-full h-full overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl relative">
               <img 
                 v-if="actor.profileAvatarUrl" 
                 :src="actor.profileAvatarUrl" 
                 :alt="actor.fullName" 
                 class="w-full h-full object-cover"
               />
               <div v-else class="w-full h-full flex items-center justify-center text-gray-700">
                 <Icon name="ri:user-line" class="text-9xl" />
               </div>
            </div>

            <!-- Like Button Overlay (Bottom Right) -->
            <button 
              @click="likeActor" 
              @mouseenter="isHovered = true"
              @mouseleave="isHovered = false"
              class="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm border border-gray-700 text-white p-3 flex items-center gap-2 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all z-10 group-hover:scale-105 shadow-lg"
              :class="{'text-red-500 border-red-500/50': hasLiked}"
            >
               <Icon :name="hasLiked ? 'ri:heart-fill' : 'ri:heart-line'" class="text-xl" :class="{'text-red-500': hasLiked, 'text-white': !hasLiked && !isHovered}" />
               <span class="font-bold font-mono">{{ actor.likes || 0 }}</span>
            </button>
          </div>

          <!-- Name & Details (Centered on mobile, Left on Desktop) -->
          <div class="text-center lg:text-left mb-8">
             <div class="mb-4">
                <span v-if="formattedRoles && formattedRoles.length" class="inline-block py-1 px-3 border border-yellow-500/50 text-yellow-500 text-xs font-bold tracking-widest uppercase">
                  {{ formattedRoles.join(' • ') }}
                </span>
             </div>
             
             <h1 class="actor-name text-4xl lg:text-5xl text-white font-bold uppercase mb-6 leading-tight">
                {{ actor.fullName }}
             </h1>

              <div class="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-gray-400 border-t border-gray-800 pt-6">
                <div v-if="actor.location" class="flex items-center gap-2">
                  <Icon name="ri:map-pin-line" />
                  <span>{{ actor.location }}</span>
                </div>
                <div v-if="actor.birthday" class="flex items-center gap-2">
                  <Icon name="ri:cake-2-line" />
                  <span>{{ formatDate(actor.birthday) }}</span>
                </div>
                <div v-if="actor.gender" class="flex items-center gap-2">
                   <Icon name="ri:user-smile-line" />
                   <span class="capitalize">{{ actor.gender.toLowerCase() }}</span>
                </div>
              </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col gap-4 mb-12">
             <button @click="openMessageModal" class="btn-gold flex items-center justify-center gap-2 w-full">
                <Icon name="ri:mail-send-line" />
                <span>Message Actor</span>
             </button>
             <button @click="shareProfile" class="btn-outline flex items-center justify-center gap-2 w-full">
                <Icon :name="linkCopied ? 'ri:check-line' : 'ri:share-line'" />
                <span>{{ linkCopied ? 'Link Copied!' : 'Share Profile' }}</span>
             </button>
          </div>



        </div>

        <!-- RIGHT COLUMN: Biography & Gallery -->
        <div class="flex-1">
           
           <!-- Biography -->
           <div class="prose prose-invert max-w-none text-gray-300 font-light text-lg leading-relaxed mb-16 animate-slide-up">
              <h3 class="text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-gray-800 pb-2 inline-block">Biography</h3>
              <p>{{ actor.about || "No biography available." }}</p>
           </div>

           <!-- Gallery Grid -->
           <div v-if="actor.gallery && actor.gallery.length" class="animate-slide-up delay-100 mb-16">
              <div class="flex items-end justify-between mb-8 border-b border-gray-800 pb-4">
                 <h3 class="text-2xl font-bold text-white uppercase tracking-wide">Gallery</h3>
                 <span class="text-gray-500 font-mono">{{ actor.gallery.length }} Photos</span>
              </div>
              
              <div class="columns-2 md:columns-2 lg:columns-3 gap-4 space-y-4">
                <div 
                   v-for="(img, idx) in visibleGallery" 
                   :key="idx" 
                   class="break-inside-avoid group relative overflow-hidden bg-gray-900 border border-gray-800"
                >
                  <img 
                     :src="img" 
                     class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                     loading="lazy"
                  />
                </div>
              </div>

               <div v-if="actor.gallery.length > initialGalleryCount" class="mt-8 text-center border-t border-gray-800 pt-8">
                   <button 
                      @click="toggleGallery" 
                      class="text-yellow-500 hover:text-white font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-colors"
                   >
                      <span>{{ showAllGallery ? 'Show Less' : 'Load More Photos' }}</span>
                      <Icon :name="showAllGallery ? 'ri:arrow-up-s-line' : 'ri:arrow-down-s-line'" />
                   </button>
              </div>
           </div>

           <!-- Movies Section -->
           <div v-if="(actor.movies && actor.movies.length) || (actor.moviesParticipated && actor.moviesParticipated.length)" class="animate-slide-up delay-100">
              <div class="flex items-end justify-between mb-8 border-b border-gray-800 pb-4">
                 <h3 class="text-2xl font-bold text-white uppercase tracking-wide">Movies & Filmography</h3>
              </div>

              <!-- New Movie Objects -->
              <div v-if="actor.movies && actor.movies.length" class="space-y-4">
                 <div v-for="movie in actor.movies" :key="movie.id" class="flex gap-4 p-4 border border-gray-800 bg-[#0A0A16] hover:border-yellow-500/50 transition-colors group">
                    <!-- Poster if available -->
                    <div v-if="movie.posterUrl" class="w-16 h-24 shrink-0 bg-gray-900 border border-gray-800">
                        <img :src="movie.posterUrl" class="w-full h-full object-cover" />
                    </div>
                    <div v-else class="w-16 h-24 shrink-0 bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-700">
                        <Icon name="ri:movie-2-line" class="text-2xl" />
                    </div>

                    <div class="flex-1">
                        <h4 class="text-xl font-bold text-white group-hover:text-yellow-500 transition-colors">{{ movie.title }}</h4>
                        <div class="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
                            <span v-if="movie.releaseYear">{{ movie.releaseYear }}</span>
                            <span v-if="movie.director">Dir. {{ movie.director }}</span>
                        </div>
                        <p v-if="movie.description" class="text-gray-400 text-sm mt-2 line-clamp-2">{{ movie.description }}</p>
                        
                        <a v-if="movie.trailerUrl" :href="movie.trailerUrl" target="_blank" class="inline-flex items-center gap-1 text-yellow-500 text-sm mt-2 hover:underline">
                            <Icon name="ri:play-circle-line" />
                            <span>Watch Trailer</span>
                        </a>
                    </div>
                 </div>
              </div>

              <!-- Fallback to Legacy Strings if no objects -->
              <div v-else-if="actor.moviesParticipated && actor.moviesParticipated.length" class="space-y-3">
                 <div v-for="(movie, index) in actor.moviesParticipated" :key="index" class="p-4 border border-gray-800 bg-[#0A0A16] flex items-center justify-between group hover:border-gray-600 transition-colors">
                    <span class="text-white font-bold">{{ movie }}</span>
                    <Icon name="ri:film-line" class="text-gray-600" />
                 </div>
              </div>
           </div>

        </div>

      </div>

    </div>
  </div>

  <!-- Message Modal -->
  <div v-if="showMessageModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
    <div class="bg-[#0A0A16] border border-gray-700 w-full max-w-lg p-6 rounded-lg relative shadow-2xl">
       <button @click="showMessageModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-white">
          <Icon name="ri:close-line" class="text-2xl" />
       </button>
       
       <h3 class="text-2xl font-bold text-white mb-6">Message {{ actor.fullName }}</h3>
       
       <form @submit.prevent="sendMessage">
          <div class="mb-4">
             <label class="block text-gray-400 mb-2">Your Message</label>
             <textarea 
                v-model="messageContent" 
                rows="5" 
                class="w-full bg-gray-900 border border-gray-700 text-white p-3 rounded focus:border-yellow-500 outline-none"
                placeholder="Write your message here..."
                required 
             ></textarea>
          </div>
          
          <div class="flex justify-end gap-3">
             <button type="button" @click="showMessageModal = false" class="btn-outline">Cancel</button>
             <button type="submit" class="btn-gold flex items-center gap-2" :disabled="sendingMessage">
                <Icon v-if="sendingMessage" name="ri:loader-4-line" class="animate-spin" />
                <span>{{ sendingMessage ? 'Sending...' : 'Send Message' }}</span>
             </button>
          </div>
       </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const API = config.public.apiBase
const { user } = useAuth()

const { data: actor, pending, error, refresh } = await useFetch<any>(`${API}/actors/${route.params.id}`, {
  key: `actor-${route.params.id}`
})

const initialGalleryCount = 6
const showAllGallery = ref(false)
const hasLiked = ref(false)
const isHovered = ref(false)

// Message Modal State
const showMessageModal = ref(false)
const messageContent = ref('')
const sendingMessage = ref(false)

// Check local storage for like status on mount
onMounted(() => {
    if (import.meta.client && actor.value) {
        const likedActors = JSON.parse(localStorage.getItem('liked_actors') || '[]')
        hasLiked.value = likedActors.includes(actor.value.id)
    }
})

const formattedRoles = computed(() => {
    if (!actor.value?.cinemaRoles) return []
    return actor.value.cinemaRoles.map((role: string) => {
        if (role.toLowerCase() === 'actor' && actor.value.gender === 'FEMALE') {
            return 'Actress'
        }
        return role
    })
})

const visibleGallery = computed(() => {
  if (!actor.value?.gallery) return []
  if (showAllGallery.value) return actor.value.gallery
  return actor.value.gallery.slice(0, initialGalleryCount)
})

const toggleGallery = () => {
  showAllGallery.value = !showAllGallery.value
}

const likeActor = async () => {
    if (hasLiked.value) return 

    try {
        await $fetch(`${API}/actors/${actor.value.id}/like`, { method: 'POST' })
        
        actor.value.likes = (actor.value.likes || 0) + 1
        hasLiked.value = true
        
        if (import.meta.client) {
            const likedActors = JSON.parse(localStorage.getItem('liked_actors') || '[]')
            if (!likedActors.includes(actor.value.id)) {
                likedActors.push(actor.value.id)
                localStorage.setItem('liked_actors', JSON.stringify(likedActors))
            }
        }

    } catch (e) {
        console.error('Failed to like actor', e)
    }
}

const linkCopied = ref(false)

const shareProfile = async () => {
  const url = window.location.href
  const title = `${actor.value?.fullName || 'Actor'} | Rwanda Cinema Hub`
  const text = `Check out ${actor.value?.fullName} on The Reborn Cinema Hub.`

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url })
    } catch (err) {
      console.error('Share failed:', err)
    }
  } else {
    try {
      await navigator.clipboard.writeText(url)
      linkCopied.value = true
      setTimeout(() => {
        linkCopied.value = false
      }, 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }
}

const openMessageModal = () => {
    if (!user.value) {
        router.push(`/auth/login?redirect=${route.path}`)
        return
    }
    showMessageModal.value = true
}

const sendMessage = async () => {
    if (!messageContent.value.trim()) return
    
    sendingMessage.value = true
    try {
        const token = useCookie('auth_token').value
        await $fetch(`${API}/messages`, {
            method: 'POST',
            body: {
                receiverId: actor.value.user.id, 
                content: messageContent.value
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        alert('Message sent successfully!')
        showMessageModal.value = false
        messageContent.value = ''
    } catch (e) {
        console.error(e)
        alert('Failed to send message. Please try again.')
    }
    sendingMessage.value = false
}

const formatDate = (date: any) => {
  if (!date) return ''
  let dVal = new Date(date)
  if (Array.isArray(date)) {
    dVal = new Date(Date.UTC(date[0], date[1] - 1, date[2]))
  }
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' }).format(dVal)
}

useHead({
  title: computed(() => actor.value ? `${actor.value.fullName} | Rwanda Cinema Hub` : 'Actor Profile'),
  meta: [
    { name: 'description', content: computed(() => actor.value?.about || 'View full actor profile on Rwanda Cinema Hub.') }
  ]
})
</script>

<style scoped>
.actor-profile-page {
  font-family: 'IBM Plex Sans', sans-serif;
  color: white;
}

.container-width {
  max-width: 80rem;
  margin: 0 auto;
}

.actor-name {
  font-family: 'Special Gothic Expanded One', sans-serif;
  letter-spacing: -0.02em;
}

.section-heading {
  font-family: 'Special Gothic Expanded One', sans-serif;
  color: white;
  text-transform: uppercase;
  border-left: 4px solid #F5B700;
  padding-left: 1rem;
}

.btn-gold {
  background-color: #F5B700;
  color: black;
  font-weight: 700;
  text-transform: uppercase;
  padding: 1rem 2rem;
  letter-spacing: 0.05em;
  transition: all 0.3s;
}

.btn-gold:hover {
  background-color: white;
  transform: translateY(-2px);
}

.btn-outline {
  border: 1px solid #374151;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  padding: 1rem 2rem;
  letter-spacing: 0.05em;
  transition: all 0.3s;
}

.btn-outline:hover {
  border-color: white;
  background-color: rgba(255,255,255,0.05);
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.8s ease-out forwards;
}

.delay-100 {
  animation-delay: 0.2s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(30px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
}
</style>
