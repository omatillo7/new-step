import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { LoginDto, UserDto } from '@/types/auth';
import AccountService from '@/services/account';

export const useAuthStore = defineStore('AuthStore', () => {

    const router = useRouter()

    const isLoading = ref(false)
    const user = ref<UserDto | null>(null)

    const isLoggedIn = ref(null)

    const login = async (payload: LoginDto) => {

        isLoading.value = true
        try {
            const { data } = await AccountService.Login(payload)
            localStorage.setItem('access_token', data.token)
            user.value = data.user
            await router.push('/dashboard')
        } catch (err) {
            throw new Error(err as unknown as string)
        } finally {
            isLoading.value = false
        }

    }

    const logout = async () => {
        localStorage.remove('access_token')

        await router.push('Login')
    }

    const fetchUser = async () => {
        try {
            const res = await AccountService.GetUserInfo()
            user.value = res.data
        } catch (err) {
            console.error(err)
        }
    }

    return {
        isLoading,
        user,
        isLoggedIn,
        login,
        logout,
        fetchUser,
    }
})
