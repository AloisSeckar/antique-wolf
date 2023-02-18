<template>
  <VueperSlides>
    <VueperSlide
      v-for="(slide, i) in slides"
      :key="i"
      :title="slide.title"
      :content="slide.content"
    />
  </VueperSlides>
</template>

<script setup lang="ts">
const slides = [
  {
    title: 'Slide #1',
    content: 'Slide 1 content.'
  },
  {
    title: 'Slide #2',
    content: 'Slide 2 content.'
  }
]
</script>
