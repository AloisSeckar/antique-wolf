import { serverSupabaseClient } from '#supabase/server'
import { WolfItemDB } from '@/composables/useItemStore'

export default defineEventHandler(async (event) => {
  try {
    const item = await readBody(event)
    const { data, error } = await serverSupabaseClient<WolfItemDB>(event)
      .from('wolf_items')
      .insert(item)
      .select()

    if (data && data[0]) {
      return {
        itemId: data[0].id
      }
    } else if (error) {
      return {
        error: error.message
      }
    } else {
      return {
        error: 'No response from Supabase'
      }
    }
  } catch (error: any) {
    return {
      error: error.message
    }
  }
})
