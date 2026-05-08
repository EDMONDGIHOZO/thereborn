export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  router.afterEach((to, from) => {
    if (to.path !== '/cinema-hub' || to.path === from.path) {
      return
    }

    scrollToTop()

    nuxtApp.hooks.hookOnce('page:loading:end', () => {
      requestAnimationFrame(() => {
        scrollToTop()
        setTimeout(scrollToTop, 0)
        setTimeout(scrollToTop, 150)
      })
    })
  })
})
