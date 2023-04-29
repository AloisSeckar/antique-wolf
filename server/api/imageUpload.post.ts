import { ImageResult } from '../types/apiTypes'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event): Promise<ImageResult> => {
  console.log(event)

  let body
  try {
    body = await readMultipartFormData(event)
    console.log(body)

    if (!body!.at(0)) {
      throw new Error('No body at 0!')
    }
    if (!body!.at(1)) {
      throw new Error('No body at 1!')
    }

    const fileName = body!.at(0)!.data.toString()
    const fileType = body!.at(1)!.type
    const fileData = body!.at(1)!.data

    const supabaseAPI = serverSupabaseClient(event).storage.from('wolf-images')

    const response = await supabaseAPI
      .upload(fileName, fileData, {
        contentType: fileType,
        upsert: true
      })

    if (response?.data && response?.data.path) {
      console.debug(`image ${fileName} successfuly uploaded`)
      return {
        url: supabaseAPI.getPublicUrl(response.data.path).data?.publicUrl
      }
    } else if (response?.error) {
      return {
        error: response.error.message,
        trace: response.error
      }
    } else {
      return {
        error: 'No response from Supabase'
      }
    }
  } catch (error: any) {
    console.warn('upload image failed')
    console.error(error)
    return {
      error: error.message,
      trace: event
    }
  }
})
