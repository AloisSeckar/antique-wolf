export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/admin/items' && !isAuth()) {
    useLoginStore().user = {}
    return navigateTo('/admin/login')
  }
})

function isAuth (): boolean {
  const user = useLoginStore().user
  console.log(user.login)
  console.log(typeof user.login)
  if (user.user) {
    const secondsSinceLogin = Math.floor(Date.now() / 1000) - user.login!
    return secondsSinceLogin <= user.expiration!
  }
  return false
}
