<template>
  <div>
    <h1>Jaroslav Wolf, Antikvariát Hobby</h1>
    <NuxtPage />
    <footer class="text-xs text-white">
    <NuxtLink to="http://alois-seckar.cz" class="mr-1 hover:text-amber-200">
      Web by Alois Sečkár
    </NuxtLink>
    |
    <NuxtLink to="https://www.vecteezy.com/free-vector/wolf" class="ml-1 hover:text-amber-200">
      Wolf by Vecteezy
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
</script>
