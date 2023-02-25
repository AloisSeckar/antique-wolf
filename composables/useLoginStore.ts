export type WolfUser = {
  user?: string,
  loginExp?: number,
  lastAction?: number
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
          this.user.loginExp = 600
          this.user.lastAction = getCurrentTimestamp()
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
    },
    refresh () {
      if (this.isAuth) {
        this.user.lastAction = getCurrentTimestamp()
      } else {
        this.logout()
      }
    }
  },
  getters: {
    isAuth (): boolean {
      if (this.user.user) {
        const secondsSinceLogin = Math.floor(Date.now() / 1000) - this.user.lastAction!
        return secondsSinceLogin <= this.user.loginExp!
      }
      return false
    }
  }
})

function getCurrentTimestamp (): number {
  return Math.floor(Date.now() / 1000)
}
