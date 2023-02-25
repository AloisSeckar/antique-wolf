export type WolfUser = {
  user?: string,
  login?: number,
  expiration?: number
}

export const useLoginStore = defineStore({
  id: 'login-store',
  state: () => {
    return {
      user: useLocalStorage('antique-wolf-user', {} as WolfUser)
    }
  },
  actions: {
    async login (email: string, password: string) {
      const { data, error } = await useSupabaseClient().auth.signInWithPassword({ email, password })
      if (data) {
        if (data.user?.email) {
          this.user.user = data.user.email
          this.user.login = Math.floor(Date.now() / 1000)
          this.user.expiration = 600
          return navigateTo('/admin/items')
        } else {
          console.error('User undefined!')
        }
      } else {
        console.error(error)
      }
    },
    logout () {
      this.user = {}
    }
  },
  getters: {
  }
})
