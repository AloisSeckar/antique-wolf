<template>
  <div>
    <FormKit
      id="selectItem"
      v-model="useItemStore().editedItem"
      type="select"
      name="selectItem"
      label="Vyberte předmět pro editaci:"
      validation="required"
      :options="options"
      @change="useLoginStore().refresh()"
    />
  </div>
</template>

<script setup lang="ts">
import type { WolfItem } from '@/server/types/dbTypes'

const options = computed(() => {
  const items = useItemStore().items.map((i: WolfItem) => { return { value: i.id, label: i.description } })
  items.unshift({ value: -1, label: '(založit nový předmět)' })
  return items
})
</script>
