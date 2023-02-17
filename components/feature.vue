<template>
  <div class="features">
    {{ text }}
    <IconesSmiley />
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: { type: String, required: true },
  optionalText: { type: String, default: 'default' }
})
</script>
