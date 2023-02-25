export type WolfItem = {
    id: number,
    description: string,
    price: number,
    image: string,
    created: Date,
    edited: Date,
    author: string,
    valid: boolean
}

export type WolfItemDB = Omit<WolfItem, 'id'>

export const useItemStore = defineStore({
  id: 'item-store',
  state: () => {
    return {
      items: [] as WolfItem[],
      selected: -1
    }
  },
  actions: {
    async loadItems () {
      const supabase = useSupabaseClient<WolfItem>()
      const { data, error } = await supabase
        .from('wolf_items')
        .select('id, description, price, image, created, edited, author, valid')
        .eq('valid', true)

      if (data) {
        console.debug("'wolf_items' loaded from Supabase")
        this.items = data
      } else {
        console.error("failed to load 'wolf_items' from Supabase")
        console.error(error)
      }
    }
  },
  getters: {
  }
})
