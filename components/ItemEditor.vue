<template>
  <div>
    <FormKit
      id="wolf"
      type="form"
      :actions="false"
      @submit="$emit('saveItem', wolfItem)"
    >
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
    <FormKit
      id="save"
      type="submit"
      submit-label="Uložit"
      help="Uloží změny do databáze"
      @click="$formkit.submit('wolf')"
    />
    <FormKit
      v-if="wolfItem.id"
      id="delete"
      type="button"
      label="Smazat"
      help="Zcela odstraní tento záznam z databáze"
      @click="$emit('deleteItem', wolfItem.id)"
    />
  </div>
</template>

<script setup lang="ts">
import type { WolfItem } from '@/server/types/dbTypes'

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

defineEmits<{(e: 'saveItem', option: WolfItem): void, (e: 'deleteItem', itemId: number): void}>()
</script>

<style>
#delete {
  background-color: rgb(185 28 28);
}
</style>
