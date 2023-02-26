<template>
  <div>
    <h2>Editace nabídky předmětů</h2>
    <div>
      <ItemSelect @select-item="changeItem" />
    </div>
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

const saveItem = (item: WolfItem) => {
  useLoginStore().refresh()
  console.log(item + 'will be saved')
  // saving files - https://formkit.com/inputs/file#uploading-files
}
</script>
