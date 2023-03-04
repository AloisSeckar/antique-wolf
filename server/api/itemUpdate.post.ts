import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    console.log('item update server side')

    const item = await readBody(event)
    // item.description etc.

    const { data, error } = await serverSupabaseClient(event)
      .from('wolf_items')
      .insert(item)
      .select()

    console.log(data)
    console.log(error)

    return {
      data,
      error
    }
  } catch (error: any) {
    return {
      error: error.message
    }
  }
})
