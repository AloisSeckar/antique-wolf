import { SupabaseClient } from '@supabase/supabase-js'
import { ItemResult } from '../types/apiTypes'
import { WolfItem } from '../types/dbTypes'
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
      console.debug('delete item successful')
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

async function deleteImage (supabase: SupabaseClient<WolfItem>, image: string) {
  const imageFile = image?.substring(image?.lastIndexOf('/') + 1)
  console.log(imageFile)
  if (imageFile) {
    const { data, error } = await supabase.storage
      .from('wolf-images')
      .remove([imageFile])
    if (data) {
      console.debug('item image removed from storage')
    } else {
      console.warn('failed to remove item image from storage')
      console.warn(error)
    }
  }
}
