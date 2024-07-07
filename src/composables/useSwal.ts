import type { AxiosError } from 'axios';
import { inject } from 'vue';
import type Swal from 'sweetalert2/dist/sweetalert2.js';
declare type TVueSwalInstance = typeof Swal & typeof Swal.fire;

export const useSwal = () => {
    const swal = inject<TVueSwalInstance>('$swal')!;

    const swalError = (error: AxiosError<any>) => {
        if (swal) {
            if (error?.response?.data?.errors) {
                const errorMessage = Object.values(error.response?.data?.errors)[0];
                swal.showValidationMessage(`Ошибка: ${errorMessage}`);
            } else {
                swal.showValidationMessage(`Ошибка: ${error}`);
            }
        }
    }

    return {
        swalError,
        swal
    };
};