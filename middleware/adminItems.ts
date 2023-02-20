export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/admin/items' && !useLoginStore().user) {
    return navigateTo('/admin/login')
  }
})
