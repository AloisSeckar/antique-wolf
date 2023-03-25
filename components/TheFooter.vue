<template>
  <footer class="mt-8 text-xs text-white">
    <NuxtLink to="http://alois-seckar.cz" :external="true" class="mr-1 hover:text-amber-200">
      Web by Alois Sečkár
    </NuxtLink>
    |
    <NuxtLink to="https://www.vecteezy.com/free-vector/wolf" :external="true" class="ml-1 hover:text-amber-200">
      Wolf by Vecteezy
    </NuxtLink>
    |
    <NuxtLink v-if="useRoute().path === '/admin/items'" to="/">
      <div class="inline ml-1 text-xs text-white hover:text-amber-200" title="Index">
        Index
      </div>
    </NuxtLink>
    <NuxtLink v-else to="/admin/items">
      <div class="inline ml-1 text-xs text-white hover:text-amber-200" title="Administrace">
        A
      </div>
    </NuxtLink>
  </footer>
</template>
