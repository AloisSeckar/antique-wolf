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
      <NuxtLink to="/admin/items">
        <div class="inline ml-1 text-xs text-white hover:text-amber-200" title="Administrace">
          A
        </div>
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
input:not([type=button]):not([type=file]) {
    background-color: rgb(232, 240, 254) !important;
}
select {
    background-color: rgb(232, 240, 254) !important;
}
/* default help-font is "black" */
.formkit-help {
  color: rgb(156 163 175) !important;
  margin-bottom: 25px !important;
}
/* default checkbox is shifted left */
.formkit-outer[data-type="checkbox"] {
  max-width: 525px !important;
  margin: 0 auto;
}
.formkit-outer[data-type="checkbox"] > .formkit-wrapper {
  max-width: 200px !important;
  margin: 0 auto;
}
.formkit-outer[data-type="checkbox"] > .formkit-inner {
  margin-left: 120px !important;
  margin-right: 5px !important;
}
/* long file names overflow */
.formkit-file-name {
  word-break: break-all;
}
</style>
