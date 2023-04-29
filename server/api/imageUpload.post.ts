import { ImageResult } from '../types/apiTypes'
import { serverSupabaseClient } from '#supabase/server'

// TODO
// currently not used, because `await readMultipartFormData(event)` doesn't work on Netlify
// should change back if help appears in https://github.com/unjs/h3/issues/330
export default defineEventHandler(async (event): Promise<ImageResult> => {
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
      trace: error
    }
  }
})
