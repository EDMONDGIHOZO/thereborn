export const useFileUpload = () => {
    const config = useRuntimeConfig()
    const API = config.public.apiBase

    const uploadImage = async (file: File, token: string): Promise<string> => {
        const formData = new FormData()
        formData.append('file', file)

        try {
            const data = await $fetch<{ url: string }>(`${API}/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return data.url
        } catch (e: any) {
            console.error('Upload error:', e)
            throw new Error(e.message || 'Failed to upload file')
        }
    }

    return {
        uploadImage
    }
}
