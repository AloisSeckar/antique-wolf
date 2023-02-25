<template>
  <div>
    <FormKit type="form" :submit-label="label" @submit="$emit('saveItem', item)">
      <FormKit
        id="description"
        v-model="item.description"
        type="text"
        name="description"
        label="Popis:"
        help="Text stručně charakterizující předmět"
        validation="required"
      />
      <FormKit
        id="price"
        v-model="item.price"
        type="number"
        name="cena"
        label="Cena (Kč):"
        help="Lze psát pouze čísla nebo použít šipky nahoru/dolu"
        validation="required"
      />
      <!-- TODO existujici image -->
      <FormKit
        id="image"
        type="file"
        accept=".jpg,.png,.gif,.tif"
        multiple="false"
        label="Obrázek:"
        help="Fotografie, která se zobrazí u předmětu"
        validation="required"
      />
      <FormKit
        id="valid"
        v-model="item.valid"
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

const item = ref({} as WolfItem)
const label = 'Uložit'

defineEmits<{(e: 'saveItem', option: WolfItem): void}>()
</script>
