<template>
  <div>
    <FormKit type="form" submit-label="Edit" @submit="$emit('selectItem', item)">
      <FormKit
        id="selectItem"
        v-model="item"
        type="select"
        name="selectItem"
        label="Vyberte existující:"
        validation="required"
        :options="options"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { FormKitOptionsItem } from '@formkit/inputs'
import type { WolfItem } from '@/composables/useItemStore'

const options: FormKitOptionsItem[] = useItemStore().items.map((i: WolfItem) => { return { value: i.id, label: i.description } })
const item = ref(-1)

defineEmits<{(e: 'selectItem', option: String): void}>()
</script>
