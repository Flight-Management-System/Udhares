import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import ganttastic from '@infectoone/vue-ganttastic'

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(ganttastic)
  .mount('#app')
