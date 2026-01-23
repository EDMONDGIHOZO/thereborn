export const useCloudinary = () => {
    const config = useRuntimeConfig()
    const cloudName = config.public.cloudinaryCloudName
    const uploadPreset = config.public.cloudinaryUploadPreset

    const uploadImage = async (file: File) => {
        console.log("cloudname");
        if (!cloudName || !uploadPreset) {
            throw new Error('Cloudinary configuration missing')
        }

        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', uploadPreset)

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error?.message || 'Upload failed')
            }

            const data = await response.json()
            return data.secure_url
        } catch (error) {
            console.error('Cloudinary upload error:', error)
            throw error
        }
    }

    return {
        uploadImage
    }
}
