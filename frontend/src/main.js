import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuth } from "@/stores/auth.js";

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

if (localStorage.getItem('token')) {
  (async () => {
    const auth = useAuth();
    try {
      auth.setIsAuth(true);
      await auth.checkToken();
    } catch (error) {
      auth.setIsAuth(false);
    }
  })()
}

app.mount('#app')
