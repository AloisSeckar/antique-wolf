import { ItemResult } from '../types/apiTypes'
import { WolfItem } from '../types/dbTypes'
import { deleteImage } from '../utils/imageUtils'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event): Promise<ItemResult> => {
  try {
    const supabase = serverSupabaseClient<WolfItem>(event)
    const input = await readBody(event)

    const { data, error } = await supabase
      .from('wolf_items')
      .delete()
      .eq('id', input.itemId)
      .select()

    if (data && data[0]) {
      deleteImage(supabase, input.image)
      console.debug(`item ${input?.itemId} successfuly deleted`)
      return {
        result: 'OK'
      }
    } else if (error) {
      throw new Error(error.message)
    } else {
      throw new Error('No response from Supabase')
    }
  } catch (error: any) {
    console.warn('delete item failed')
    console.error(error)
    return {
      result: error.message
    }
  }
})
