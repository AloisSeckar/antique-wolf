import { ItemResult } from '../types/apiTypes'
import { WolfItemDB } from '../types/dbTypes'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event): Promise<ItemResult> => {
  try {
    const item = await readBody(event)
    const { data, error } = await serverSupabaseClient<WolfItemDB>(event)
      .from('wolf_items')
      .insert(item)
      .select()

    if (data && data[0]) {
      console.debug('insert successful')
      return {
        itemId: data[0].id
      }
    } else if (error) {
      console.warn('insert failed')
      console.error(error)
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
