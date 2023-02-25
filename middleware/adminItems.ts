export default defineNuxtRouteMiddleware((to) => {
  console.log(to.path)
  console.log(useLoginStore().user)
  if (to.path === '/admin/items' && !useLoginStore().user) {
    return navigateTo('/admin/login')
  }
})
