<script setup lang="ts">
definePageMeta({
    middleware: ['auth']
})

const config = useRuntimeConfig()
const API = config.public.apiBase
const router = useRouter()

// Get token from cookie
const token = useCookie('auth_token')

const form = ref({
    fullName: '',
    location: '',
    province: '',
    gender: '',
    about: '',
    birthday: '',
    cinemaRoles: [] as string[]
})

const rolesOptions = ['Actor', 'Director', 'Producer', 'Screenwriter', 'Cinematographer', 'Editor', 'Other']
const selectedFile = ref<File | null>(null)
const imgPreviewUrl = computed(() => {
    if (selectedFile.value && typeof window !== 'undefined') {
        return URL.createObjectURL(selectedFile.value)
    }
    return ''
})
const isLoading = ref(false)
const errorMsg = ref('')

const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0]
    }
}

const toggleRole = (role: string) => {
    if (form.value.cinemaRoles.includes(role)) {
        form.value.cinemaRoles = form.value.cinemaRoles.filter(r => r !== role)
    } else {
        form.value.cinemaRoles.push(role)
    }
}

const submitForm = async () => {
    if (!form.value.fullName.trim()) {
        errorMsg.value = 'Full name is required'
        return
    }

    isLoading.value = true
    errorMsg.value = ''
    
    try {
        const formData = new FormData()
        formData.append('fullName', form.value.fullName)
        if (form.value.location) formData.append('location', form.value.location)
        if (form.value.province) formData.append('province', form.value.province)
        if (form.value.gender) formData.append('gender', form.value.gender)
        if (form.value.about) formData.append('about', form.value.about)
        if (form.value.birthday) formData.append('birthday', form.value.birthday)
        form.value.cinemaRoles.forEach(role => {
            formData.append('cinemaRoles', role)
        })
        if (selectedFile.value) {
            formData.append('profileImage', selectedFile.value)
        }

        await $fetch(`${API}/actors/me`, {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })

        // Redirect to dashboard or profile
        router.push('/dashboard')
    } catch (e: any) {
        console.error('Profile update error', e)
        errorMsg.value = e.data?.message || 'Failed to save profile. Please try again.'
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
  <div class="bg-black min-h-screen text-white pt-32 pb-20 px-4 md:px-8">
    <div class="max-w-2xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-special mb-2">Complete Your Profile</h1>
        <p class="text-gray-400 mb-10">Tell us about yourself to be discovered in Rwanda's cinema ecosystem.</p>

        <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Profile Image -->
            <div class="flex items-center space-x-6">
                <div class="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden border border-gray-700">
                    <img v-if="selectedFile" :src="imgPreviewUrl" class="w-full h-full object-cover" />
                    <Icon v-else name="ri:user-add-line" class="text-gray-500 text-3xl" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Profile Photo</label>
                    <input type="file" @change="handleFileChange" accept="image/*" class="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-gray-800 file:text-white
                      hover:file:bg-gray-700
                    "/>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-gray-400 mb-2 text-sm uppercase tracking-wide">Full Name *</label>
                    <input v-model="form.fullName" type="text" required class="w-full bg-gray-900 border border-gray-800 rounded p-3 text-white focus:border-white outline-none transition" />
                </div>
                <div>
                    <label class="block text-gray-400 mb-2 text-sm uppercase tracking-wide">Date of Birth</label>
                    <input v-model="form.birthday" type="date" class="w-full bg-gray-900 border border-gray-800 rounded p-3 text-white focus:border-white outline-none transition" />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-gray-400 mb-2 text-sm uppercase tracking-wide">Province</label>
                    <select v-model="form.province" class="w-full bg-gray-900 border border-gray-800 rounded p-3 text-white focus:border-white outline-none transition appearance-none">
                        <option value="" disabled>Select Province</option>
                        <option value="Kigali">Kigali City</option>
                        <option value="Northern">Northern Province</option>
                        <option value="Southern">Southern Province</option>
                        <option value="Eastern">Eastern Province</option>
                        <option value="Western">Western Province</option>
                    </select>
                </div>
                <div>
                    <label class="block text-gray-400 mb-2 text-sm uppercase tracking-wide">Location (District/Sector)</label>
                    <input v-model="form.location" type="text" placeholder="e.g. Kicukiro, Niboye" class="w-full bg-gray-900 border border-gray-800 rounded p-3 text-white focus:border-white outline-none transition" />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label class="block text-gray-400 mb-2 text-sm uppercase tracking-wide">Gender</label>
                     <select v-model="form.gender" class="w-full bg-gray-900 border border-gray-800 rounded p-3 text-white focus:border-white outline-none transition appearance-none">
                        <option value="" disabled>Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
                <div></div>
            </div>

            <div>
                <label class="block text-gray-400 mb-2 text-sm uppercase tracking-wide">Roles (Select all that apply)</label>
                <div class="flex flex-wrap gap-2">
                    <button type="button" v-for="role in rolesOptions" :key="role" 
                        @click="toggleRole(role)"
                        :class="[
                            'px-4 py-2 text-sm rounded-full border transition',
                            form.cinemaRoles.includes(role) 
                                ? 'bg-white text-black border-white' 
                                : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'
                        ]"
                    >
                        {{ role }}
                    </button>
                </div>
            </div>

            <div>
                <label class="block text-gray-400 mb-2 text-sm uppercase tracking-wide">Bio / About</label>
                <textarea v-model="form.about" rows="4" class="w-full bg-gray-900 border border-gray-800 rounded p-3 text-white focus:border-white outline-none transition"></textarea>
            </div>

            <div v-if="errorMsg" class="text-red-500 text-sm mt-2">{{ errorMsg }}</div>

            <div class="pt-4">
                <button type="submit" :disabled="isLoading" 
                    class="w-full bg-[#F5B700] hover:bg-[#d4a000] text-black font-special font-bold text-xl py-4 uppercase tracking-widest transition disabled:opacity-50 disabled:cursor-not-allowed">
                    {{ isLoading ? 'Saving...' : 'Complete Profile' }}
                </button>
            </div>
        </form>
    </div>
  </div>
</template>

<style scoped>
.font-special {
    font-family: 'Special Gothic Expanded One', sans-serif;
}
</style>
