import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const body = await readMultipartFormData(event)

    const fileName = body!.at(0)!.data.toString()
    const fileType = body!.at(1)!.type
    const fileData = body!.at(1)!.data

    const supabaseAPI = serverSupabaseClient(event).storage.from('wolf-images')

    const response = await supabaseAPI
      .upload(fileName, fileData, {
        contentType: fileType,
        upsert: true
      })

    if (response.data && response.data.path) {
      return {
        url: supabaseAPI.getPublicUrl(response.data.path).data?.publicUrl
      }
    } else if (response.error) {
      return {
        error: response.error.message
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
