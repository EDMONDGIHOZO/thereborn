export const useFileUpload = () => {
    const config = useRuntimeConfig()
    const API = config.public.apiBase

    const uploadImage = async (file: File, token: string): Promise<string> => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch(`${API}/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Upload failed')
        }

        const data = await response.json()
        return data.url
    }

    return {
        uploadImage
    }
}
