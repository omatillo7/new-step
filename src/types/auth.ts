export interface LoginDto {
    userName: string; password: string
}

export interface UserDto {
    id: 1,
    userName: string,
    fullName: string,
}

export interface ChangePasswordDto {
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
}


export interface ChangeLanguageDto {
    languageId: number
}
export interface OneIdLogin {
    languageId: number
}