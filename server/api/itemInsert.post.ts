import { ItemResult } from '../types/apiTypes'
import { WolfItemDB } from '../types/dbTypes'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event): Promise<ItemResult> => {
  try {
    const item = await readBody(event)

    item.dbImage = undefined
    item.imageFile = undefined

    const { data, error } = await serverSupabaseClient<WolfItemDB>(event)
      .from('wolf_items')
      .insert(item)
      .select()

    if (data && data[0]) {
      console.debug(`item ${data[0].id} successfuly inserted`)
      return {
        itemId: data[0].id
      }
    } else if (error) {
      console.warn('item insert failed')
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
    console.warn('item insert failed')
    console.error(error)
    return {
      error: error.message
    }
  }
})
