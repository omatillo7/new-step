import ApiService from '@/services/base';
import { ChangeLanguageDto, ChangePasswordDto, LoginDto, OneIdLogin } from '@/types/auth';

const AccountService = {
    Login(params: LoginDto) {
        return ApiService.post(`/account/Login`, params);
    },
    ChangePassword(params: ChangePasswordDto) {
        return ApiService.post(`/account/ChangePassword`, params);
    },
    ChangeLanguage(params: ChangeLanguageDto) {
        return ApiService.post(`/account/ChangeLanguage`, params);
    },
    GetUserInfo() {
        return ApiService.get(`/account/GetUserInfo`);
    },
    OneIdLogin(params: OneIdLogin){
        return ApiService.post(`/account/OneIdLogin`,params)
    },
};

export default AccountService;
