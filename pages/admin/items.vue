<template>
  <div>
    <div>
      Do admin stuff here
    </div>
    <div>
      <ItemSelect />
    </div>
    <div>
      <ItemEditor />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'admin-items'
})
</script>
