<template>
  <div>
    <div>
      <ItemSelect @select-item="changeItem" />
    </div>
    <h2>Editace údajů předmětu</h2>
    <div>
      <ItemEditor :item-id="itemId" @save-item="saveItem" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { WolfItem } from '@/composables/useItemStore'

useLoginStore().refresh()

definePageMeta({
  middleware: 'admin-items'
})

const itemId = ref(-1)
const changeItem = (item: number) => {
  useLoginStore().refresh()
  itemId.value = item
}

const saveItem = async (formData: WolfItem) => {
  useLoginStore().refresh()

  // https://formkit.com/inputs/form#submitting-as-a-page-request

  const formBody = new FormData()
  formBody.append('fileName', formData.imageFile!.at(0)!.name)
  formBody.append('fileData', formData.imageFile!.at(0)!.file!)

  const { data, error } = await useFetch('/api/imageUpload', {
    method: 'POST',
    body: formBody
  })

  console.log(data.value)
  console.log(error.value)

  /*
  // saving item data
  formData.image = formData.imageFile!.name
  console.log(formData)

  // saving file
  const path = formData.imageFile!.name
  console.log(formData.imageFile)
  console.log(formData.imageFile.fileData)
  const base64file = await getBase64(formData.imageFile!.fileData!)

  await useSupabaseClient()?.storage?.from('wolf-images')?.upload(path, getArrayBuffer(base64file), { upsert: true })?.then(() => console.log('yay'))
    .catch(e => console.log('error' + e))
    */
}
</script>
