import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance } from 'axios'
import { toast } from 'vue3-toastify'


let API_URL = "https://billingnext-api.edu.uz"

if (window.location.href.indexOf("https://billingnext.edu.uz:3000") > -1) {
    API_URL = "https://billingnext-api.edu.uz";
}

axios.defaults.baseURL = API_URL;

export { API_URL }

const axiosInstance: AxiosInstance = axios.create({
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
})

/** request interceptor  */
axiosInstance.interceptors.request.use(
    (config) => {
        const acces_token = localStorage.getItem('access_token')
        config.headers.Authorization = `Bearer ${acces_token}`
        return config
    },
    (err: any) => err
)

function makeToast(title: string, type: string) {
    console.log(title, type)
    toast.error(title)
}


/** response interceptor */
axiosInstance.interceptors.response.use(
    (res) => {
        return res
    },
    (error) => {
        console.log(error, 'interceptors')

        // Cancelling requests
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
            return Promise.reject(error);
        }

        if (error.response) {
            // client received an error response (5xx, 4xx)
            const errResp = error.response;

            if (errResp.status === 500) {
                // If the server returned an error 500
                makeToast(`500 Ошибка сервера`, "danger");
                return Promise.reject(error);
            }
            else if (errResp.status === 429) {
                // If the server returned error 429
                makeToast(`Вы посылаете слишком много запросов`, "danger");
                return Promise.reject(error);
            }
            if (errResp.status == 401) {
                // If the server returned error 401
                window.location.href = "/auth/login";
                return Promise.reject(error);
            }
            if (errResp.status == 403) {
                // If the server returned error 403
                window.location.href = "/error/403";
                return Promise.reject(error);
            }
            else if (errResp.status === 400) {
                // If you enter incorrect data in the fields
                const errList = errResp.data.errors;
                // @ts-ignore
                Object.values(errList).forEach((el) => {
                    makeToast(`${el}`, "danger");
                });
                return Promise.reject(error);
            }


        } else if (error.request) {
            // client never received a response, or request never left 
            console.log('error.request', error.request)
            // Error on setting up the request
            console.log('Error', error);
            if (error.code === "ERR_NETWORK") {
                makeToast("Ошибка сети, проверьте подключение к интернету или свяжитесь с разработчиками", "danger");
                return Promise.reject(error);
            }

        } else {
            // Default
            if (!navigator.onLine) {
                makeToast(`Нет связи с интернетом, проверьте подключение к сети`, "danger");
                return Promise.reject(error);
            } else {
                makeToast(`Произошла ошибка, свяжитесь с разработчиками`, "danger");
                return Promise.reject(error);
            }
        }
    }
)

const service = {
    get: <T = any>(url: string, config?: AxiosRequestConfig<any> | undefined) => {
        return axiosInstance.get<T>(url, config)
    },
    post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined) => {
        return axiosInstance.post<T>(url, data, config)
    },
    delete: <T = any>(url: string, config?: AxiosRequestConfig<any> | undefined) => {
        return axiosInstance.delete<T>(url, config)
    },
    put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined) => {
        return axiosInstance.put<T>(url, data, config)
    },
    formData: <T = any>(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined) => {
        return axiosInstance.post<T>(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            ...config
        })
    },
    print: <T = any>(url: string, config?: AxiosRequestConfig<any>) => {
        return axios.get<T>(url, {
            responseType: 'blob',
            ...config
        });
    },
    printTemp: <T = any>(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined) => {
        return axiosInstance.post<T>(url, data, {
            responseType: 'blob',
            ...config
        })
    },
}

export default service