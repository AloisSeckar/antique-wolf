export type ImageResult = {
    url?: string,
    error?: string,
    trace?: any,
}

export async function useImageUploader (image: File): Promise<ImageResult> {
  try {
    const supabaseAPI = useSupabaseClient().storage.from('wolf-images')

    const response = await supabaseAPI
      .upload(image.name, image, {
        contentType: image.type,
        upsert: true
      })

    if (response?.data && response?.data.path) {
      console.debug(`image ${image.name} successfuly uploaded`)
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
}
