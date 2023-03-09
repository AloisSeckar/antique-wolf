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

  // image
  const formBody = new FormData()
  formBody.append('fileName', formData.imageFile!.at(0)!.name)
  formBody.append('fileData', formData.imageFile!.at(0)!.file!)
  const { data: imgData } = await useFetch('/api/imageUpload', {
    method: 'POST',
    body: formBody
  })

  // db entry
  if (imgData.value?.url) {
    const testItem: WolfItem = {
      description: formData.description,
      price: formData.price,
      image: imgData.value?.url,
      created: new Date(),
      edited: new Date(),
      author: useLoginStore().user.user!,
      valid: !!formData.valid
    }
    const { data: itemData } = await useFetch('/api/itemUpdate', {
      method: 'POST',
      body: testItem
    })

    if (itemData.value?.itemId) {
      alert('inserted ' + itemData.value?.itemId)
    } else {
      // handle itemData.value?.error
    }
  } else {
    // handle imgData.value?.error
  }
}
</script>
