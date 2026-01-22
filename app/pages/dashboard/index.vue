<template>
  <div class="dashboard-page bg-black min-h-screen pt-32 pb-20 px-6">
    <div class="container mx-auto max-w-6xl">
       <div class="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <h1 class="text-3xl font-bold text-white uppercase font-special">Dashboard</h1>
          <button @click="handleLogout" class="text-gray-400 hover:text-white flex items-center gap-2">
             <Icon name="ri:logout-box-line" />
             <span>Logout</span>
          </button>
       </div>

       <div v-if="loading" class="text-center py-20">
          <Icon name="ri:loader-4-line" class="animate-spin text-4xl text-white" />
       </div>
       
       <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Sidebar / Navigation -->
          <div class="md:col-span-1 space-y-2">
             <div class="p-4 bg-gray-900 border border-gray-800 rounded-lg mb-6">
                 <div class="flex items-center gap-3 mb-4">
                     <div class="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                        {{ user?.email?.charAt(0).toUpperCase() }}
                     </div>
                     <div>
                        <div class="text-white font-bold truncate max-w-[140px]">{{ user?.email }}</div>
                        <div class="text-xs text-yellow-500 font-bold tracking-widest">{{ isActor ? 'ACTOR' : 'FAN' }}</div>
                     </div>
                 </div>
             </div>

             <button 
               v-if="isActor"
               @click="activeTab = 'profile'"
               class="w-full text-left p-3 rounded hover:bg-gray-800 transition-colors flex items-center gap-3"
               :class="{'bg-gray-800 text-white': activeTab === 'profile', 'text-gray-400': activeTab !== 'profile'}"
             >
                <Icon name="ri:user-settings-line" />
                <span>Edit Profile</span>
             </button>
             
             <button 
               v-if="isActor"
               @click="activeTab = 'gallery'"
               class="w-full text-left p-3 rounded hover:bg-gray-800 transition-colors flex items-center gap-3"
               :class="{'bg-gray-800 text-white': activeTab === 'gallery', 'text-gray-400': activeTab !== 'gallery'}"
             >
                <Icon name="ri:image-edit-line" />
                <span>Manage Gallery</span>
             </button>

             <button 
               @click="activeTab = 'messages'"
               class="w-full text-left p-3 rounded hover:bg-gray-800 transition-colors flex items-center gap-3"
               :class="{'bg-gray-800 text-white': activeTab === 'messages', 'text-gray-400': activeTab !== 'messages'}"
             >
                <Icon name="ri:message-3-line" />
                <span>Messages</span>
             </button>
          </div>

          <!-- Main Content -->
          <div class="md:col-span-3 bg-gray-900/50 border border-gray-800 rounded-lg p-6 min-h-[500px]">
             
             <!-- ACTOR: Edit Profile -->
             <div v-if="activeTab === 'profile' && isActor">
                 <h2 class="text-2xl font-bold text-white mb-6">Edit Profile</h2>
                 <form @submit.prevent="updateProfile" class="space-y-6 max-w-2xl">
                     <div>
                       <label class="block text-gray-400 mb-1 text-sm">Full Name</label>
                       <input v-model="profileForm.fullName" type="text" class="input-field" />
                     </div>
                     <div class="grid grid-cols-2 gap-4">
                        <div>
                           <label class="block text-gray-400 mb-1 text-sm">Location</label>
                           <input v-model="profileForm.location" type="text" class="input-field" />
                        </div>
                        <div>
                           <label class="block text-gray-400 mb-1 text-sm">Birthday</label>
                           <input v-model="profileForm.birthday" type="date" class="input-field" />
                        </div>
                     </div>
                     <div>
                        <label class="block text-gray-400 mb-1 text-sm">Avatar URL</label>
                        <input v-model="profileForm.profileAvatarUrl" type="text" class="input-field" />
                     </div>
                     <div>
                        <label class="block text-gray-400 mb-1 text-sm">About</label>
                        <textarea v-model="profileForm.about" rows="5" class="input-field"></textarea>
                     </div>
                     <button type="submit" class="btn-gold" :disabled="saving">
                        {{ saving ? 'Saving...' : 'Save Changes' }}
                     </button>
                 </form>
             </div>

             <!-- ACTOR: Manage Gallery -->
             <div v-if="activeTab === 'gallery' && isActor">
                 <h2 class="text-2xl font-bold text-white mb-6">Manage Gallery</h2>
                 
                 <form @submit.prevent="addPhoto" class="flex gap-4 mb-8">
                    <input v-model="newPhotoUrl" type="text" placeholder="Enter image URL" class="input-field flex-1" required />
                    <button type="submit" class="btn-outline whitespace-nowrap">Add Photo</button>
                 </form>

                 <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div v-for="photo in myProfile?.gallery || []" :key="photo" class="relative group aspect-square bg-gray-800">
                       <img :src="photo" class="w-full h-full object-cover" />
                       <button @click="removePhoto(photo)" class="absolute top-2 right-2 bg-red-500 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon name="ri:delete-bin-line" />
                       </button>
                    </div>
                 </div>
             </div>

             <!-- MESSAGES (Both) -->
             <div v-if="activeTab === 'messages'">
                 <h2 class="text-2xl font-bold text-white mb-6">{{ isActor ? 'Inbox' : 'Sent Messages' }}</h2>
                 <div v-if="messagesLoading" class="text-center py-10">
                     <Icon name="ri:loader-4-line" class="animate-spin text-2xl text-gray-500" />
                 </div>
                 <div v-else-if="messages.length === 0" class="text-center py-10 text-gray-500">
                     {{ isActor ? 'No messages received yet.' : 'You haven\'t sent any messages yet.' }}
                 </div>
                 <div v-else class="space-y-4">
                     <div v-for="msg in messages" :key="msg.id" class="bg-gray-800 p-4 rounded border border-gray-700">
                        <div class="flex justify-between items-start mb-2">
                           <span class="font-bold text-yellow-500">{{ isActor ? (msg.senderName || 'Fan') : 'To Actor' }}</span>
                           <span class="text-xs text-gray-500">{{ new Date(msg.sentAt).toLocaleString() }}</span>
                        </div>
                        <p class="text-gray-300">{{ msg.content }}</p>
                     </div>
                 </div>
             </div>
             
          </div>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, logout, token } = useAuth()
const config = useRuntimeConfig()
const API = config.public.apiBase
const router = useRouter()

const loading = ref(true)
const activeTab = ref('messages') // Default tab
const isActor = computed(() => user.value?.roles?.includes('ACTOR'))

// Profile Data
const myProfile = ref<any>(null)
const profileForm = reactive({
   fullName: '',
   location: '',
   about: '',
   profileAvatarUrl: '',
   birthday: ''
})
const saving = ref(false)

// Gallery Data
const newPhotoUrl = ref('')

// Messages Data
const messages = ref<any[]>([])
const messagesLoading = ref(false)

const loadProfile = async () => {
    try {
        const { data } = await useFetch<any>(`${API}/actors/me`, {
            headers: { Authorization: `Bearer ${token.value}` }
        })
        if (data.value) {
            myProfile.value = data.value
            // Fill form
            profileForm.fullName = data.value.fullName || ''
            profileForm.location = data.value.location || ''
            profileForm.about = data.value.about || ''
            profileForm.profileAvatarUrl = data.value.profileAvatarUrl || ''
            profileForm.birthday = data.value.birthday || ''
        }
    } catch(e) { console.error(e) }
}

const updateProfile = async () => {
    saving.value = true
    try {
        await $fetch(`${API}/actors/me`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token.value}` },
            body: profileForm
        })
        await loadProfile() // Refresh
        alert('Profile updated!')
    } catch(e) {
        alert('Failed to update profile')
    }
    saving.value = false
}

const addPhoto = async () => {
    if (!newPhotoUrl.value) return
    try {
        await $fetch(`${API}/actors/me/gallery`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token.value}` },
            params: { photoUrl: newPhotoUrl.value }
        })
        newPhotoUrl.value = ''
        await loadProfile()
    } catch(e) { alert('Failed to add photo') }
}

const removePhoto = async (url: string) => {
    if(!confirm('Delete this photo?')) return
    try {
        await $fetch(`${API}/actors/me/gallery`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token.value}` },
            params: { photoUrl: url }
        })
        await loadProfile()
    } catch(e) { alert('Failed to remove photo') }
}

const loadMessages = async () => {
    messagesLoading.value = true
    try {
        // Actors see received messages, fans see sent messages
        const endpoint = isActor.value ? `${API}/messages` : `${API}/messages/sent`
        const { data } = await useFetch<any[]>(endpoint, {
            headers: { Authorization: `Bearer ${token.value}` }
        })
        if (data.value) {
            messages.value = data.value
        }
    } catch(e) { console.error(e) }
    messagesLoading.value = false
}

onMounted(async () => {
   if (!user.value) {
       router.push('/auth/login')
       return
   }
   
   if (isActor.value) {
       activeTab.value = 'profile' // Actors start on profile
       await loadProfile()
   } else {
       activeTab.value = 'messages'
   }
   
   await loadMessages()
   loading.value = false
})

const handleLogout = () => {
    logout()
}
</script>

<style scoped>
.font-special {
  font-family: 'Special Gothic Expanded One', sans-serif;
}
.input-field {
  width: 100%;
  background: #1f2937;
  border: 1px solid #374151;
  padding: 0.75rem;
  color: white;
  border-radius: 4px;
}
.input-field:focus {
  border-color: #F5B700;
  outline: none;
}
.btn-gold {
  background-color: #F5B700;
  color: black;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  text-transform: uppercase;
  border-radius: 4px;
}
.btn-outline {
  border: 1px solid #374151;
  color: white;
  padding: 0.75rem 1.5rem;
  text-transform: uppercase;
  font-weight: 600;
  border-radius: 4px;
}
.btn-outline:hover {
  border-color: white;
}
</style>
