import './theme/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import Drawer from '@/components/Common/Drawer.vue'

import App from './App.vue'
import router from './router'
import { setup } from './setup'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('Drawer', Drawer)

setup(app)

app.mount('#app')
