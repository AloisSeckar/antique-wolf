import { SupabaseClient } from '@supabase/supabase-js'
import { WolfItem } from '../types/dbTypes'

export async function deleteImage (supabase: SupabaseClient<WolfItem>, image: string) {
  const imageFile = image?.substring(image?.lastIndexOf('/') + 1)
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
