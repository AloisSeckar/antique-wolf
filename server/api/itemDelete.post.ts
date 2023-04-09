import { ItemResult } from '../types/apiTypes'
import { serverSupabaseClient } from '#supabase/server'
import { WolfItem } from '@/composables/useItemStore'

export default defineEventHandler(async (event): Promise<ItemResult> => {
  try {
    const input = await readBody(event)

    // TODO del image from bucket

    const { data, error } = await serverSupabaseClient<WolfItem>(event)
      .from('wolf_items')
      .delete()
      .eq('id', input.itemId)
      .select()

    if (data && data[0]) {
      console.debug('update successful')
      return {
        result: 'OK'
      }
    } else if (error) {
      console.warn('update failed')
      console.error(error)
      return {
        result: error.message
      }
    } else {
      return {
        result: 'No response from Supabase'
      }
    }
  } catch (error: any) {
    return {
      result: error.message
    }
  }
})
