import { WolfItem } from '~/server/types/dbTypes'

export const useItemStore = defineStore({
  id: 'item-store',
  state: () => {
    return {
      items: [] as WolfItem[],
      editedItem: -1
    }
  },
  actions: {
    async loadItems () {
      const { data, error } = await useSupabaseClient<WolfItem>()
        .from('wolf_items')
        .select('id, description, price, image, created, edited, author, valid')

      if (data) {
        console.debug("'wolf_items' loaded from Supabase")
        this.items = data
      } else {
        console.error("failed to load 'wolf_items' from Supabase")
        console.error(error)
      }
    },
    async reloadItem (itemId: number) {
      const { data, error } = await useSupabaseClient<WolfItem>()
        .from('wolf_items')
        .select('id, description, price, image, created, edited, author, valid')
        .eq('id', itemId)

      if (data?.[0]) {
        console.debug(`item id = '${itemId}' loaded from Supabase`)
        let existing = null
        for (let i = 0; i < this.items.length; i++) {
          const current = this.items[i]
          if (current.id === itemId) {
            existing = i
            break
          }
        }
        if (existing) {
          this.items[existing] = data[0]
        } else {
          this.items.push(data[0])
        }
      } else {
        console.error(`failed to load item id = '${itemId}' from Supabase`)
        console.error(error)
      }
    }
  },
  getters: {
    getById: (state) => {
      return (itemId: number) => state.items.find((i: WolfItem) => i.id === itemId)
    },
    getValid: (state) => {
      return () => state.items.filter((i: WolfItem) => i.valid === true)
    }
  }
})
