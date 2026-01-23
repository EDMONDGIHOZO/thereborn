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
            if (roles.includes('ADMIN') || roles.includes('SUPER_ADMIN')) {
                await router.push('/admin')
            } else if (roles.includes('ACTOR')) {
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
                return { success: false, error: 'Invalid email or password' }
            }

            if (data.value && data.value.token) {
                token.value = data.value.token

                // Check email verification
                if (!data.value.emailVerified) {
                    return {
                        success: false,
                        error: 'Please verify your email before logging in. Check your inbox.',
                        needsVerification: true,
                        email
                    }
                }

                await fetchUser()

                // Check profile completion for actors
                if (data.value.role === 'ACTOR' && !data.value.profileComplete) {
                    await router.push('/profile/setup')
                    return { success: true, redirected: true }
                }

                await handleRedirect()
                return { success: true }
            }
        } catch (e) {
            console.error('Login error:', e)
            return { success: false, error: 'An error occurred. Please try again.' }
        }
        return { success: false, error: 'Login failed' }
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
