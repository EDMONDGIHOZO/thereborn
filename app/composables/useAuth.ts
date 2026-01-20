export const useAuth = () => {
    const token = useCookie('auth_token')
    const user = useState('user', () => null)
    const router = useRouter()

    const config = useRuntimeConfig()

    const login = async (email, password) => {
        try {
            const { data, error } = await useFetch(`${config.public.apiBase}/auth/authenticate`, {
                method: 'POST',
                body: { email, password }
            })

            if (error.value) {
                console.error('Login failed:', error.value)
                return false
            }

            if (data.value && data.value.token) {
                token.value = data.value.token
                // Ideally fetch user details here using the token if needed
                // For now, assume success means admin if we logged in via admin page (simplified)
                await router.push('/admin')
                return true
            }
        } catch (e) {
            console.error('Login error:', e)
            return false
        }
    }

    const logout = () => {
        token.value = null
        user.value = null
        router.push('/admin/login')
    }

    return {
        token,
        user,
        login,
        logout
    }
}
