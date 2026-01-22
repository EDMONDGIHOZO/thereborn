export const useAuth = () => {
    const token = useCookie('auth_token')
    const user = useState<any>('user', () => null)
    const router = useRouter()
    const config = useRuntimeConfig()
    const route = useRoute()

    const fetchUser = async () => {
        if (!token.value) return
        try {
            const { data, error } = await useFetch(`${config.public.apiBase}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })
            if (data.value) {
                user.value = data.value
            } else {
                // If fetch fails (e.g. 401), clear token
                token.value = null
                user.value = null
            }
        } catch (e) {
            token.value = null
            user.value = null
        }
    }

    const handleRedirect = async () => {
        const redirectPath = route.query.redirect as string
        if (redirectPath) {
            await router.push(redirectPath)
            return
        }

        if (user.value) {
            const roles = user.value.roles || []
            if (roles.includes('ACTOR')) {
                await router.push('/dashboard')
            } else {
                await router.push('/dashboard') // Fans also go to dashboard
            }
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const { data, error } = await useFetch<any>(`${config.public.apiBase}/auth/authenticate`, {
                method: 'POST',
                body: { email, password }
            })

            if (error.value) {
                console.error('Login failed:', error.value)
                return false
            }

            if (data.value && data.value.token) {
                token.value = data.value.token
                await fetchUser()
                await handleRedirect()
                return true
            }
        } catch (e) {
            console.error('Login error:', e)
            return false
        }
        return false
    }

    const registerFan = async (email: string, password: string) => {
        try {
            const { data, error } = await useFetch<any>(`${config.public.apiBase}/auth/register/fan`, {
                method: 'POST',
                body: { email, password }
            })

            if (error.value) {
                console.error('Registration failed:', error.value)
                return false
            }

            if (data.value && data.value.token) {
                token.value = data.value.token
                await fetchUser()
                await handleRedirect()
                return true
            }
        } catch (e) {
            console.error('Registration error:', e)
            return false
        }
        return false
    }

    const logout = () => {
        token.value = null
        user.value = null
        router.push('/auth/login')
    }

    // Init check
    if (token.value && !user.value) {
        fetchUser()
    }

    return {
        token,
        user,
        login,
        registerFan,
        logout,
        fetchUser
    }
}
