<template>
  <div>
    <FormKit
      id="selectItem"
      v-model="item"
      type="select"
      name="selectItem"
      label="Vyberte předmět pro editaci:"
      validation="required"
      :options="options"
      @change="$emit('selectItem', item)"
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
const item = ref(-1)

defineEmits<{(e: 'selectItem', option: number): void}>()
</script>
