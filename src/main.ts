import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/index.scss'

import { setupVuetify } from '@/plugins/vuetify'
import { setupPinia } from '@/plugins/pinia'
import { setupRouter } from '@/router'
import { setupI18n } from '@/i18n/i18n.config'
import { setupGlobalComponents } from '@/components/setup'
import { setupSwal } from './plugins/sweet-alerts';

const app = createApp(App)

setupGlobalComponents(app)

setupVuetify(app)

setupPinia(app)

setupRouter(app)

setupI18n(app)

setupSwal(app)


app.mount('#app')