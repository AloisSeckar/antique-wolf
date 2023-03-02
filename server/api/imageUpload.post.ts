import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    console.log('image upload server side')

    const body = await readMultipartFormData(event)

    const fileName = body!.at(0)!.data.toString()
    const fileType = body!.at(1)!.type
    const fileData = body!.at(1)!.data

    const response = await serverSupabaseClient(event).storage
      .from('wolf-images')
      .upload(fileName, fileData, {
        contentType: fileType,
        upsert: true
      })

    return {
      data: response.data,
      error: response.error?.message
    }
  } catch (error: any) {
    return { error: error.message }
  }
})
