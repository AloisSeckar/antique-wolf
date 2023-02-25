export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/admin/items' && !useLoginStore().isAuth) {
    useLoginStore().user = {}
    return navigateTo('/admin/login')
  }
})
