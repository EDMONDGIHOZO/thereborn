<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useFileUpload } from '@/composables/useFileUpload'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { token } = useAuth()
const config = useRuntimeConfig()
const ADMIN_API = `${config.public.apiBase}/admin`
const route = useRoute()
const router = useRouter()
const id = route.params.id

type ActorStatus = 'PENDING' | 'APPROVED' | 'DISABLED'

const isLoading = ref(false)
const actor = ref<any>(null)
const originalForm = ref<any>(null)

// Form State
const form = reactive({
    status: 'PENDING' as ActorStatus,
    fullName: '',
    birthday: '',
    gender: 'MALE',
    location: '',
    province: '',
    about: '',
    profileAvatarUrl: '',
    cinemaRoles: [] as string[],
    gallery: [] as string[]
})

const getActorStatus = (data: any): ActorStatus => {
    if (
        data?.status === 'DISABLED' ||
        data?.disabled === true ||
        data?.isDisabled === true ||
        data?.user?.disabled === true ||
        data?.user?.isDisabled === true ||
        data?.user?.enabled === false ||
        data?.user?.active === false
    ) {
        return 'DISABLED'
    }

    return data?.approved ? 'APPROVED' : 'PENDING'
}

const canDisableActor = computed(() => {
    return Boolean(
        typeof actor.value?.status === 'string' ||
        Object.prototype.hasOwnProperty.call(actor.value ?? {}, 'disabled') ||
        Object.prototype.hasOwnProperty.call(actor.value ?? {}, 'isDisabled') ||
        (actor.value?.user && Object.prototype.hasOwnProperty.call(actor.value.user, 'enabled')) ||
        (actor.value?.user && Object.prototype.hasOwnProperty.call(actor.value.user, 'active'))
    )
})

const statusOptions = computed<Array<{ value: ActorStatus; label: string; hint: string }>>(() => [
    {
        value: 'PENDING',
        label: 'Pending Approval',
        hint: 'The actor stays hidden from the public directory until you approve them.'
    },
    {
        value: 'APPROVED',
        label: 'Approved',
        hint: 'The actor can appear in the public directory and use the approved profile state.'
    },
    {
        value: 'DISABLED',
        label: 'Disabled',
        hint: canDisableActor.value
            ? 'Use this when you want to deactivate the actor from admin.'
            : 'Disable needs backend support for a disable field before it can be saved.'
    }
])

const currentStatusMeta = computed(() => {
    return statusOptions.value.find((option) => option.value === form.status) ?? statusOptions.value[0]
})

// Helper for Tag Input (Roles)
const newRole = ref('')
const addRole = () => {
    if (newRole.value.trim() && !form.cinemaRoles.includes(newRole.value.trim())) {
        form.cinemaRoles.push(newRole.value.trim())
    }
    newRole.value = ''
}
const removeRole = (index: number) => {
    form.cinemaRoles.splice(index, 1)
}

// Helper for Gallery
const { uploadImage } = useFileUpload()
const isUploadingGallery = ref(false)
const galleryFileInput = ref<HTMLInputElement | null>(null)

const triggerGalleryUpload = () => {
    galleryFileInput.value?.click()
}

const handleGalleryUpload = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return

    isUploadingGallery.value = true
    try {
        const url = await uploadImage(file, token.value || '')
        form.gallery.push(url)
    } catch (e) {
        console.error('Gallery upload failed', e)
        toast.error('Failed to upload image')
    } finally {
        isUploadingGallery.value = false
        if (galleryFileInput.value) galleryFileInput.value.value = ''
    }
}

const removeGalleryUrl = (index: number) => {
    form.gallery.splice(index, 1)
}

// Helper for Avatar
const isUploadingAvatar = ref(false)
const avatarFileInput = ref<HTMLInputElement | null>(null)

const triggerAvatarUpload = () => {
    avatarFileInput.value?.click()
}

const handleAvatarUpload = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return

    isUploadingAvatar.value = true
    try {
        const url = await uploadImage(file, token.value || '')
        form.profileAvatarUrl = url
    } catch (e) {
        console.error('Avatar upload failed', e)
        toast.error('Failed to upload avatar')
    } finally {
        isUploadingAvatar.value = false
        if (avatarFileInput.value) avatarFileInput.value.value = ''
    }
}

// Data Fetching
const fetchActor = async () => {
    try {
        const data = await $fetch<any>(`${ADMIN_API}/actors/${id}`, {
            headers: { Authorization: `Bearer ${token.value}` }
        })
        actor.value = data
        
        // Populate Form
        form.status = getActorStatus(data)
        form.fullName = data.fullName || ''
        form.birthday = data.birthday ? new Date(data.birthday).toISOString().split('T')[0] : ''
        form.gender = data.gender || 'MALE'
        form.location = data.location || ''
        form.province = data.province || ''
        form.about = data.about || ''
        form.profileAvatarUrl = data.profileAvatarUrl || ''
        form.cinemaRoles = data.cinemaRoles ? [...data.cinemaRoles] : []
        form.gallery = data.gallery ? [...data.gallery] : []
        
        // Deep copy for comparison
        originalForm.value = JSON.parse(JSON.stringify(form))
        
    } catch (e) {
        console.error('Failed to fetch actor', e)
        toast.error('Failed to load actor profile')
        router.push('/admin/actors')
    }
}

onMounted(() => {
    fetchActor()
})

const updateActor = async () => {
    isLoading.value = true
    try {
        if (form.status === 'DISABLED' && !canDisableActor.value) {
            toast.error('This actor cannot be disabled yet because the API does not expose a disable field.')
            return
        }

        const payload: any = {}
        let hasChanges = false

        // Helper to check for equality
        const isEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b)

        if (form.fullName !== originalForm.value.fullName) { payload.fullName = form.fullName; hasChanges = true }
        if (form.birthday !== originalForm.value.birthday) { payload.birthday = form.birthday ? form.birthday : null; hasChanges = true }
        if (form.gender !== originalForm.value.gender) { payload.gender = form.gender; hasChanges = true }
        if (form.location !== originalForm.value.location) { payload.location = form.location; hasChanges = true }
        if (form.province !== originalForm.value.province) { payload.province = form.province; hasChanges = true }
        if (form.about !== originalForm.value.about) { payload.about = form.about; hasChanges = true }
        if (form.profileAvatarUrl !== originalForm.value.profileAvatarUrl) { payload.profileAvatarUrl = form.profileAvatarUrl; hasChanges = true }
        if (!isEqual(form.cinemaRoles, originalForm.value.cinemaRoles)) { payload.cinemaRoles = form.cinemaRoles; hasChanges = true }
        if (!isEqual(form.gallery, originalForm.value.gallery)) { payload.gallery = form.gallery; hasChanges = true }
        if (form.status !== originalForm.value.status) {
            const isApproved = form.status === 'APPROVED'
            const isDisabled = form.status === 'DISABLED'

            payload.approved = isApproved

            if (typeof actor.value?.status === 'string') {
                payload.status = form.status
            }
            if (Object.prototype.hasOwnProperty.call(actor.value ?? {}, 'disabled')) {
                payload.disabled = isDisabled
            }
            if (Object.prototype.hasOwnProperty.call(actor.value ?? {}, 'isDisabled')) {
                payload.isDisabled = isDisabled
            }
            if (actor.value?.user && Object.prototype.hasOwnProperty.call(actor.value.user, 'enabled')) {
                payload.enabled = !isDisabled
            }
            if (actor.value?.user && Object.prototype.hasOwnProperty.call(actor.value.user, 'active')) {
                payload.active = !isDisabled
            }

            hasChanges = true
        }

        if (!hasChanges) {
            toast.info('No changes to save.')
            isLoading.value = false
            return
        }

        await $fetch(`${ADMIN_API}/actors/${id}`, {
            method: 'PUT',
            body: payload,
            headers: { Authorization: `Bearer ${token.value}` }
        })

        // Refresh the form first, then show a persistent success toast.
        await fetchActor()
        await nextTick()
        toast.success('Profile updated successfully!', {
            duration: 4000
        })
        
    } catch (e) {
        console.error('Failed to update actor', e)
        toast.error('Failed to update actor')
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
  <div class="max-w-6xl mx-auto pb-20">
    <!-- Header -->
    <header class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 bg-white p-6 shadow-sm border border-gray-100 rounded-lg">
        <div>
            <div class="flex items-center gap-3 mb-2">
                 <NuxtLink to="/admin/actors" class="text-gray-400 hover:text-gray-600 transition-colors">
                    <Icon name="ri:arrow-left-line" />
                 </NuxtLink>
                 <h1 class="text-2xl font-bold text-gray-800">Edit Actor Profile</h1>
            </div>
            <p v-if="actor" class="text-gray-500 text-sm">
                Linked User: <span class="font-mono text-blue-600">{{ actor.user?.email }}</span> • ID: {{ actor.id }}
            </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <a v-if="actor" :href="`/cinema-hub/actor/${actor.id}`" target="_blank" class="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md transition-colors text-sm font-medium w-full sm:w-auto">
                <Icon name="ri:external-link-line" />
                View Public Profile
            </a>
            <button @click="updateActor" :disabled="isLoading" 
                class="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed font-medium w-full sm:w-auto">
                <Icon v-if="isLoading" name="ri:loader-4-line" class="animate-spin" />
                <span>{{ isLoading ? 'Saving…' : 'Save Changes' }}</span>
            </button>
        </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- MAIN FORM -->
        <div class="lg:col-span-2 space-y-8">
            
            <!-- Basic Details Card -->
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Basic Information</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="group col-span-2">
                        <label class="block text-sm font-semibold text-gray-600 mb-2">Full Name</label>
                        <input v-model="form.fullName" type="text" class="input-field" placeholder="e.g. John Doe" />
                    </div>

                    <div class="group">
                        <label class="block text-sm font-semibold text-gray-600 mb-2">Gender</label>
                        <select v-model="form.gender" class="input-field">
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <div class="group">
                        <label class="block text-sm font-semibold text-gray-600 mb-2">Birthday</label>
                        <input v-model="form.birthday" type="date" class="input-field" />
                    </div>

                    <div class="group">
                        <label class="block text-sm font-semibold text-gray-600 mb-2">Detailed Location</label>
                        <input v-model="form.location" type="text" class="input-field" placeholder="e.g. Kicukiro, Kigali" />
                    </div>

                    <div class="group">
                        <label class="block text-sm font-semibold text-gray-600 mb-2">Province</label>
                        <select v-model="form.province" class="input-field">
                            <option value="">Select Province</option>
                            <option value="Kigali">Kigali City</option>
                            <option value="Northern">Northern Province</option>
                            <option value="Southern">Southern Province</option>
                            <option value="Eastern">Eastern Province</option>
                            <option value="Western">Western Province</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Professional Details -->
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Professional Profile</h3>
                
                <div class="space-y-6">
                    <!-- Cinema Roles -->
                    <div class="group">
                        <label class="block text-sm font-semibold text-gray-600 mb-2">Cinema Roles</label>
                        <div class="flex flex-wrap gap-2 mb-3">
                            <span v-for="(role, idx) in form.cinemaRoles" :key="idx" class="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium flex items-center gap-2">
                                {{ role }}
                                <button @click="removeRole(idx)" class="hover:text-amber-900"><Icon name="ri:close-line" /></button>
                            </span>
                        </div>
                        <div class="flex gap-2">
                            <input v-model="newRole" type="text" 
                                placeholder="Add a role (e.g. Actor, Director)" 
                                class="input-field flex-1"
                                @keyup.enter="addRole"
                            />
                            <button @click="addRole" type="button" class="btn-secondary">Add</button>
                        </div>
                    </div>

                    <!-- About / Bio -->
                    <div class="group">
                        <label class="block text-sm font-semibold text-gray-600 mb-2">Biography</label>
                        <textarea v-model="form.about" rows="6" class="input-field" placeholder="Actor's biography..."></textarea>
                    </div>
                </div>
            </div>
            
             <!-- Gallery Management -->
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                 <h3 class="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Gallery Images</h3>
                 
                 <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                     <div v-for="(img, idx) in form.gallery" :key="idx" class="group relative aspect-[3/4] bg-gray-100 rounded overflow-hidden border border-gray-200">
                         <img :src="img" class="w-full h-full object-cover" />
                         <button @click="removeGalleryUrl(idx)" class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                             <Icon name="ri:delete-bin-line" />
                         </button>
                     </div>
                 </div>

                 <div class="flex gap-2">
                     <button @click="triggerGalleryUpload" type="button" class="btn-secondary flex items-center gap-2" :disabled="isUploadingGallery">
                        <Icon v-if="isUploadingGallery" name="ri:loader-4-line" class="animate-spin" />
                        <Icon v-else name="ri:upload-cloud-line" />
                        <span>Upload Image</span>
                     </button>
                     <input ref="galleryFileInput" type="file" class="hidden" accept="image/*" @change="handleGalleryUpload" />
                 </div>
            </div>

        </div>

        <!-- SIDEBAR -->
        <div class="space-y-8">

            <!-- Status Card -->
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Actor Status</h3>

                <div class="space-y-3">
                    <label for="actor-status" class="block text-sm font-semibold text-gray-600">Status</label>
                    <select id="actor-status" v-model="form.status" name="status" class="input-field">
                        <option
                            v-for="option in statusOptions"
                            :key="option.value"
                            :value="option.value"
                            :disabled="option.value === 'DISABLED' && !canDisableActor"
                        >
                            {{ option.label }}
                        </option>
                    </select>
                    <p aria-live="polite" class="text-sm text-gray-500">
                        {{ currentStatusMeta.hint }}
                    </p>
                </div>
            </div>
            
            <!-- Avatar Card -->
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Profile Picture</h3>
                
                <div class="mb-6 flex justify-center">
                    <div class="h-64 w-48 bg-gray-100 rounded overflow-hidden border border-gray-200">
                        <img v-if="form.profileAvatarUrl" :src="form.profileAvatarUrl" class="w-full h-full object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                            <Icon name="ri:user-line" class="text-6xl" />
                        </div>
                    </div>
                </div>

                <div class="group">
                    <label class="block text-sm font-semibold text-gray-600 mb-2">Avatar Image</label>
                    <div class="flex flex-col gap-2">
                         <button @click="triggerAvatarUpload" type="button" class="btn-secondary w-full flex justify-center items-center gap-2" :disabled="isUploadingAvatar">
                            <Icon v-if="isUploadingAvatar" name="ri:loader-4-line" class="animate-spin" />
                            <Icon v-else name="ri:upload-line" />
                            <span>{{ form.profileAvatarUrl ? 'Replace Image' : 'Upload Image' }}</span>
                         </button>
                         <input ref="avatarFileInput" type="file" class="hidden" accept="image/*" @change="handleAvatarUpload" />
                    </div>
                </div>
            </div>

            <!-- Stats / Metadata (Read Only) -->
            <div v-if="actor" class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                 <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">System Data</h3>
                 <div class="space-y-3 text-sm">
                     <div class="flex justify-between">
                         <span class="text-gray-500">Likes</span>
                         <span class="font-mono font-bold">{{ actor.likes || 0 }}</span>
                     </div>
                     <div class="flex justify-between">
                         <span class="text-gray-500">Status</span>
                         <span
                             :class="{
                                 'text-green-600': form.status === 'APPROVED',
                                 'text-amber-600': form.status === 'PENDING',
                                 'text-red-600': form.status === 'DISABLED'
                             }"
                             class="font-bold"
                         >
                             {{ currentStatusMeta.label }}
                         </span>
                     </div>
                     <div class="flex justify-between">
                         <span class="text-gray-500">Movies Linked</span>
                         <span class="font-mono font-bold">{{ actor.movies ? actor.movies.length : 0 }}</span>
                     </div>
                 </div>
            </div>

        </div>
    </div>
  </div>
</template>

<style scoped>
.input-field {
    width: 100%;
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    color: #1f2937;
    transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;
}

.input-field:focus-visible {
    border-color: #2563eb;
    background-color: white;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.btn-secondary {
    padding: 0.75rem 1.5rem;
    background-color: #e5e7eb;
    color: #374151;
    font-weight: 500;
    border-radius: 0.375rem;
    transition: background-color 0.2s;
}

.btn-secondary:hover {
    background-color: #d1d5db;
}
</style>
