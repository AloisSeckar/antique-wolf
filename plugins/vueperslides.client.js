// https://antoniandre.github.io/vueper-slides/
import { VueperSlides, VueperSlide } from 'vueperslides'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp
      .component("VueperSlides", VueperSlides)
      .component("VueperSlide", VueperSlide)
})
