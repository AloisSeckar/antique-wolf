// https://formkit.com/getting-started/installation#configuring-nuxt
import { en, de, cs } from '@formkit/i18n'
import { DefaultConfigOptions } from '@formkit/vue'

const config: DefaultConfigOptions = {
  locales: { en, de, cs },
  locale: 'en'
}

export default config
