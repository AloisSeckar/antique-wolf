<template>
  <VueperSlides
    class="no-shadow"
    slide-image-inside
    :gap="3"
    :slide-ratio="1 / 3"
    :visible-slides="3"
    :dragging-distance="60"
    :breakpoints="{ 950: { visibleSlides: 2, slideRatio: 1/2 }, 600: { visibleSlides: 1, slideRatio: 1/1 } }"
  >
    <VueperSlide
      v-for="(slide, i) in slides"
      :key="i"
      class="bg-slate-600 border-4 border-black rounded"
      :title="slide.title"
      :content="slide.content"
      :image="slide.image"
    />
  </VueperSlides>
</template>

<script setup lang="ts">
import slides from '@/test/data.json'
</script>

<style>
.ex--center-mode {
  width: 600px;
  max-width: 90%;
  margin: auto;
}

.vueperslide--active {
  border-color: rgb(185 28 28 / 1);
}

.vueperslide__image {
  margin: 12px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
