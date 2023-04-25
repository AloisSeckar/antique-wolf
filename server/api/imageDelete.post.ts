import { ItemResult } from '../types/apiTypes'
import { WolfItem } from '../types/dbTypes'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event): Promise<ItemResult> => {
  try {
    const supabase = serverSupabaseClient<WolfItem>(event)
    const input = await readBody(event)

    deleteImage(supabase, input.image)

    return {
      result: 'OK'
    }
  } catch (error: any) {
    console.warn('delete item failed')
    console.error(error)
    return {
      result: error.message
    }
  }
})
