<template>
  <div>
    <div>
      <ItemSelect />
    </div>
    <h2>Editace údajů předmětu</h2>
    <div>
      <ItemEditor @save-item="saveItem" @delete-item="deleteItem" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { WolfItem } from '@/server/types/dbTypes'

useLoginStore().refresh()

definePageMeta({
  middleware: 'admin-items'
})

const saveItem = async (item: WolfItem) => {
  useLoginStore().refresh()

  try {
    // image
    const newItem = !item.id
    const newImage = item.id && item.image !== item.dbImage

    if (newItem || newImage) {
      if (newImage) {
        // delete old
        const { data: imgDelData } = await useFetch('/api/imageDelete', { method: 'POST', body: { image: item.dbImage } })
        if (imgDelData.value?.result !== 'OK') {
          console.warn('Failed to delete old image')
        }
      }

      // save new
      const formBody = new FormData()
      formBody.append('fileName', item.imageFile!.at(0)!.name)
      formBody.append('fileData', item.imageFile!.at(0)!.file!)
      console.log(item)
      console.log(formBody.get('fileName'))
      console.log(formBody.get('fileData'))
      const { data: imgData } = await useFetch('/api/imageUpload', { method: 'POST', headers: { 'Content-Type': 'multipart/form-data' }, body: formBody })
      if (imgData?.value?.url) {
        item.image = imgData.value.url
      } else {
        console.error('Failed to save image')
        console.log(imgData?.value?.error)
        console.log(imgData?.value?.trace)
        throw new Error(imgData?.value?.error)
      }
    }

    // sanitize data
    if (!item.valid) {
      item.valid = false
    }
    if (!item.created) {
      item.created = new Date()
    }
    item.edited = new Date()
    item.author = useLoginStore().user.user!
    item.price = 0 // not used atm

    // db entry
    const { data: itemData } = await processItem(item)
    const itemId = itemData?.value?.itemId
    if (itemId) {
      console.debug('item ' + itemId + ' processed')
      await useItemStore().reloadItem(itemId)
      useItemStore().editedItem = itemId
      useModalStore().showModal('Informace', 'Změny byly úspěšně uloženy')
    } else {
      console.error('Failed to save db entry')
      throw new Error(itemData?.value?.error)
    }
  } catch (error) {
    console.error('Failed to save item')
    useModalStore().showModal('Chyba', 'Změny se nepodařilo uložit :(')
  }
}

const deleteItem = async (itemId: number, image: string) => {
  useLoginStore().refresh()
  try {
    const { data: result } = await useFetch('/api/itemDelete', { method: 'POST', body: { itemId, image } })
    if (result.value?.result === 'OK') {
      console.debug('item ' + itemId + ' deleted')
      await useItemStore().loadItems() // TODO only remove the one
      useItemStore().editedItem = -1
      useModalStore().showModal('Informace', 'Záznam byl úspěšně smazán')
    } else {
      console.error('Failed to save db entry')
      throw new Error(result.value?.result)
    }
  } catch (error) {
    console.error('Failed to delete item')
    useModalStore().showModal('Chyba', 'Záznam se nepodařilo smazat :(')
  }
}

async function processItem (body: WolfItem) {
  if (body.id) {
    return await useFetch('/api/itemUpdate', { method: 'POST', body })
  } else {
    return await useFetch('/api/itemInsert', { method: 'POST', body })
  }
}
</script>
