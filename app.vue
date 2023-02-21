<template>
  <div>
    <NuxtLink to="/">
      <h1>Jaroslav Wolf, Antikvariát Hobby</h1>
    </NuxtLink>
    <NuxtPage />
    <footer class="mt-8 text-xs text-white">
      <NuxtLink to="http://alois-seckar.cz" :external="true" class="mr-1 hover:text-amber-200">
        Web by Alois Sečkár
      </NuxtLink>
      |
      <NuxtLink to="https://www.vecteezy.com/free-vector/wolf" :external="true" class="ml-1 hover:text-amber-200">
        Wolf by Vecteezy
      </NuxtLink>
      |
      <NuxtLink to="/admin/login" class="ml-1 hover:text-amber-200">
        A
      </NuxtLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Jaroslav Wolf, Antikvariát Hobby',
  htmlAttrs: {
    lang: 'cs'
  }
})
useItemStore().loadItems()
</script>

<style>
/* otherwise `genesis` theme changes to "blank" after an input */
input:not([type=button]) {
    background-color: rgb(232, 240, 254) !important;
}
</style>
