export type WolfFile = {
  name: string,
  type: string,
  file?: File,
  base64File?: string,
}

export type WolfItem = {
    id?: number,
    description: string,
    price: number,
    image: string,
    imageFile?: WolfFile[]
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
      items: [] as WolfItem[]
    }
  },
  actions: {
    async loadItems () {
      const supabase = useSupabaseClient<WolfItem>()
      const { data, error } = await supabase
        .from('wolf_items')
        .select('id, description, price, image, created, edited, author, valid')

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
    getById: (state) => {
      return (itemId: number) => state.items.find((i: WolfItem) => i.id === itemId)
    },
    getValid: (state) => {
      return () => state.items.filter((i: WolfItem) => i.valid === true)
    }
  }
})
