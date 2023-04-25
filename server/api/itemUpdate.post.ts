import { ItemResult } from '../types/apiTypes'
import { WolfItem, WolfItemDB } from '../types/dbTypes'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event): Promise<ItemResult> => {
  try {
    const item: WolfItem = await readBody(event)
    const itemId = item.id

    item.id = undefined
    item.dbImage = undefined
    item.imageFile = undefined

    const { data, error } = await serverSupabaseClient<WolfItemDB>(event)
      .from('wolf_items')
      .update(item)
      .eq('id', itemId)
      .select()

    if (data && data[0]) {
      console.debug('update successful')
      return {
        itemId
      }
    } else if (error) {
      console.warn('update failed')
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
