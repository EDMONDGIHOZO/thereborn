<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useFileUpload } from '@/composables/useFileUpload'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { token } = useAuth()
const { uploadImage } = useFileUpload()
const config = useRuntimeConfig()
const API = `${config.public.apiBase}/notices`
const router = useRouter()

const form = reactive({
  title: '',
  content: '',
  coverImage: '',
  publishedBy: ''
})
const loading = ref(false)
const isUploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const triggerUpload = () => {
    fileInput.value?.click()
}

const handleImageUpload = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return

    isUploading.value = true
    try {
        const url = await uploadImage(file, token.value || '')
        form.coverImage = url
    } catch (e) {
        console.error('Upload failed', e)
        alert('Failed to upload image')
    } finally {
        isUploading.value = false
        if (fileInput.value) fileInput.value.value = ''
    }
}

async function submit() {
  if (!confirm('This will send an email to ALL users. Are you sure?')) return

  loading.value = true
  try {
    await $fetch(API, {
      method: 'POST',
      body: form,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    router.push('/admin/notices')
  } catch (e) {
    console.error(e)
    alert('Failed to create notice. Check console for details.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="px-4 lg:px-8 py-8 max-w-4xl">
    <div class="mb-8 border-b border-gray-200 pb-8">
       <NuxtLink to="/admin/notices" class="text-gray-500 hover:text-gray-900 mb-4 inline-flex items-center text-sm">
         <Icon name="ri:arrow-left-line" class="mr-1" /> Back to Notices
       </NuxtLink>
       <h1 class="text-3xl font-light text-gray-900 tracking-tighter">Create Announcement</h1>
       <p class="text-gray-500 mt-2 font-light">Publish a new notice to the platform and notify all users via email.</p>
    </div>

    <form @submit.prevent="submit" class="bg-white p-8 border border-gray-200 shadow-sm space-y-8">
       <div>
         <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
         <input v-model="form.title" type="text" required 
            class="w-full border border-gray-300 p-4 text-lg outline-none focus:border-black transition-colors bg-gray-50 focus:bg-white" 
            placeholder="e.g. Major Platform Update Available" />
       </div>

       <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Published By</label>
        <input v-model="form.publishedBy" type="text" 
           class="w-full border border-gray-300 p-4 outline-none focus:border-black transition-colors bg-gray-50 focus:bg-white" 
           placeholder="e.g. Cinema Hub Admin" />
       </div>

       <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
        <div class="flex flex-col gap-4">
          <div v-if="form.coverImage" class="w-full h-64 bg-gray-100 rounded overflow-hidden relative border border-gray-200 group">
            <img :src="form.coverImage" class="w-full h-full object-cover" alt="Preview" />
            <button type="button" @click="form.coverImage = ''" class="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="ri:delete-bin-line" />
            </button>
          </div>
          
          <div v-if="!form.coverImage" class="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-gray-400 transition-colors" @click="triggerUpload">
               <Icon name="ri:image-add-line" class="text-4xl text-gray-400 mb-2" />
               <p class="text-sm text-gray-500 font-medium">Click to upload cover image</p>
               <p class="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF</p>
          </div>

          <div v-else class="flex justify-end">
               <button type="button" @click="triggerUpload" class="text-sm text-blue-600 hover:text-blue-800 font-medium">Change Image</button>
          </div>

          <input ref="fileInput" type="file" class="hidden" accept="image/*" @change="handleImageUpload" />
          <p v-if="isUploading" class="text-sm text-blue-600 flex items-center"><Icon name="ri:loader-4-line" class="animate-spin mr-2" /> Uploading...</p>
        </div>
       </div>
       
       <div>
         <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
         <textarea v-model="form.content" rows="12" required 
            class="w-full border border-gray-300 p-4 outline-none focus:border-black transition-colors bg-gray-50 focus:bg-white font-light text-gray-800"
            placeholder="Write your announcement details here. This content will be sent in the email and displayed on the website."></textarea>
         <p class="text-xs text-gray-400 mt-2 text-right">Supports basic text formatting.</p>
       </div>
       
       <div class="pt-4 border-t border-gray-100 flex justify-end">
          <button type="button" @click="router.back()" class="px-6 py-3 text-gray-600 hover:bg-gray-50 mr-4 transition-colors">Cancel</button>
          
          <button type="submit" :disabled="loading" 
            class="bg-gray-900 text-white px-8 py-3 font-medium hover:bg-black transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
             <Icon v-if="loading" name="ri:loader-4-line" class="animate-spin mr-2" />
             {{ loading ? 'Publishing...' : 'Publish & Send Emails' }}
          </button>
       </div>
    </form>
  </div>
</template>
