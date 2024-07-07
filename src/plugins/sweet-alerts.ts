import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import type { App } from 'vue'
import { LOCALE } from '@/i18n/i18n.config';

export function setupSwal(app: App) {
    app.use(VueSweetalert2, {
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: LOCALE == 'ru' ? 'Принимать' : LOCALE == 'uz' ? 'Qabul qiling' : 'Қабул қилинг',
        cancelButtonText: LOCALE == 'ru' ? 'Назад' : LOCALE == 'uz' ? 'Orqaga' : 'Орқага',
        confirmButtonColor: '#41b882',
        cancelButtonColor: '#ff7674'
    });
}
