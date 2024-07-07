import { App } from 'vue';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export function setupToast(app: App) {
    app.use(Vue3Toastify, { autoClose: 3000, clearOnUrlChange: false, limit: 5 })
}