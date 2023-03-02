<template>
  <div>
    <FormKit type="form" :submit-label="label" @submit="$emit('saveItem', wolfItem)">
      <FormKit
        id="description"
        v-model="wolfItem.description"
        type="text"
        name="description"
        label="Popis:"
        help="Text stručně charakterizující předmět"
        validation="required"
      />
      <FormKit
        id="price"
        v-model="wolfItem.price"
        type="number"
        name="cena"
        label="Cena (Kč):"
        help="Lze psát pouze čísla nebo použít šipky nahoru/dolu"
        validation="required"
      />
      <!-- TODO existujici image -->
      <FormKit
        id="image"
        v-model="wolfItem.imageFile"
        type="file"
        accept=".jpg,.png,.gif,.tif"
        multiple="false"
        label="Obrázek:"
        help="Fotografie, která se zobrazí u předmětu"
        validation="required"
      />
      <FormKit
        id="valid"
        v-model="wolfItem.valid"
        type="checkbox"
        name="valid"
        label="Zobrazovat na webu"
        help="Nezaškrtnuté předměty zde bude možné dále upravovat, ale veřejnost je neuvidí"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import type { WolfItem } from '@/composables/useItemStore'

const props = defineProps({
  itemId: { type: Number, required: true }
})

const wolfItem = computed(() => {
  if (props.itemId !== -1) {
    return useItemStore().getById(props.itemId)!
  } else {
    return {} as WolfItem
  }
})
const label = 'Uložit'

defineEmits<{(e: 'saveItem', option: WolfItem): void}>()
</script>
