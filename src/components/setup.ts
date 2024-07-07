import { App } from "vue"

// form
import FormInput from '@/components/form/Input.vue'
import FormSelect from '@/components/form/Select.vue'
import FromDatePicker from '@/components/form/DatePicker.vue'


export const setupGlobalComponents = (app: App<Element>) => {
    app.component('FormInput', FormInput)
    app.component('FormSelect', FormSelect)
    app.component('FromDatePicker', FromDatePicker)
}
