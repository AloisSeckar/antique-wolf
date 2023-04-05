<template>
  <VueperSlides
    class="no-shadow"
    slide-image-inside
    bullets-outside
    :slide-ratio="4 / 5"
    :visible-slides="1"
    :dragging-distance="60"
    @previous="refresh"
    @next="refresh"
  >
    <VueperSlide
      v-for="(slide, i) in slides"
      :key="i"
      class="bg-slate-600 border-4 border-black rounded"
      :title="slide.description"
      :image="slide.image"
      :link="slide.image"
      open-in-new
    />
  </VueperSlides>
</template>

<script setup lang="ts">
const slides = computed(() => useItemStore().getValid())

const refresh = () => useLoginStore().refresh()
</script>

<style>
.ex--center-mode {
  width: 600px;
  max-width: 90%;
  margin: auto;
}

.vueperslide--active {
  border-color: rgb(185 28 28);
}

.vueperslides__arrow {
  color: rgb(185 28 28);
}
.vueperslides__arrow svg {stroke-width: 2}

.vueperslide__content-wrapper {
  justify-content: end !important;
}

.vueperslide__title {
  width: 100%;
  margin-bottom: 0;
  color: white;
  background-color: rgb(30 41 59);
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2rem;
  padding: 0.5rem;
}
.vueperslide__content {
  width: 100%;
  margin-bottom: 0;
  color: white;
  background-color: rgb(30 41 59);
  font-size: 1.25rem;
  line-height: 1.5rem;
  padding: 4px;
}

.vueperslide__image {
  margin: 1rem 5rem 4rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
