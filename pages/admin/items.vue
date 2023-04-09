<template>
  <div>
    <div>
      <ItemSelect @select-item="changeItem" />
    </div>
    <h2>Editace údajů předmětu</h2>
    <div>
      <ItemEditor :item-id="itemId" @save-item="saveItem" @delete-item="deleteItem" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { WolfItem } from '@/server/types/dbTypes'

useLoginStore().refresh()

definePageMeta({
  middleware: 'admin-items'
})

const itemId = ref(-1)
const changeItem = (item: number) => {
  useLoginStore().refresh()
  itemId.value = item
}

const saveItem = async (item: WolfItem) => {
  useLoginStore().refresh()

  try {
    // image
    // TODO change existing
    if (!item.id) {
      const formBody = new FormData()
      formBody.append('fileName', item.imageFile!.at(0)!.name)
      formBody.append('fileData', item.imageFile!.at(0)!.file!)
      const { data: imgData } = await useFetch('/api/imageUpload', { method: 'POST', body: formBody })
      if (imgData?.value?.url) {
        item.image = imgData.value.url
      } else {
        console.error('Failed to save image')
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
    delete item.imageFile

    // db entry
    const { data: itemData } = await processItem(item)
    if (itemData?.value?.itemId) {
      console.debug('item ' + itemData.value.itemId + ' processed')
      useItemStore().reloadItem(itemData.value.itemId)
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

const deleteItem = async (delId: number) => {
  useLoginStore().refresh()
  try {
    const { data: result } = await useFetch('/api/itemDelete', { method: 'POST', body: { itemId: delId } })
    console.log(result.value)
    if (result.value?.result === 'OK') {
      itemId.value = -1
      console.debug('item ' + delId + ' processed')
      useItemStore().loadItems() // TODO only remove the one
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
