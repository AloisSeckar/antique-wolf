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
      <!-- not used atm
      <FormKit
        id="price"
        v-model="wolfItem.price"
        type="number"
        name="cena"
        label="Cena (Kč):"
        help="Lze psát pouze čísla nebo použít šipky nahoru/dolu"
        validation="required"
      />
      -->
      <FormKit
        id="image"
        v-model="wolfItem.imageFile"
        type="file"
        accept=".jpg,.png,.gif,.tif"
        multiple="false"
        label="Obrázek:"
        :help="imageHint"
        validation="required"
        @input="imageFileChanged"
      />
      <div class="w-[300px] mx-auto mb-6">
        <img v-show="hasImage" :src="wolfItem.image" width="300" height="250">
      </div>
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
      :disabled="useItemStore().pending"
      @click="$formkit.submit('wolf')"
    />
    <FormKit
      v-if="wolfItem.id"
      id="delete"
      type="button"
      label="Smazat"
      help="Zcela odstraní tento záznam z databáze"
      :disabled="useItemStore().pending"
      @click="$emit('deleteItem', wolfItem.id, wolfItem.image)"
    />
  </div>
</template>

<script setup lang="ts">
import type { WolfFile, WolfItem } from '@/server/types/dbTypes'

const wolfItem = computed(() => {
  const itemId = useItemStore().editedItem
  if (itemId !== -1) {
    const storeItem = useItemStore().getById(itemId)
    if (storeItem) {
      return reactive(storeItem)
    }
  }
  // fallback
  return reactive({} as WolfItem)
})

defineEmits<{(e: 'saveItem', option: WolfItem): void, (e: 'deleteItem', itemId: number): void}>()

const imageFileChanged = (e: WolfFile[]) => {
  const imageData = e[0]
  if (imageData) {
    if (imageData.file) {
      wolfItem.value.image = URL.createObjectURL(imageData.file!)
    } else {
      wolfItem.value.image = imageData.name
    }
  } else {
    wolfItem.value.image = ''
  }
}

const hasImage = computed(() => !!wolfItem.value.image)
const imageHint = computed(() => 'Fotografie, která se zobrazí u předmětu' + (wolfItem.value.image ? ' (viz náhled níže)' : ''))
</script>

<style>
#delete {
  background-color: rgb(185 28 28);
}
</style>
