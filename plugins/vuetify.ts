import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import ru from 'date-fns/locale/ru'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    date: {
      locale: {
        ru,
      },
    },
  })

  app.vueApp.use(vuetify)
})
