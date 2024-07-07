import ApiService from '@/services/base';

const ManualService = {
    GetModuleSelectList() {
        return ApiService.get(`/Manual/GetModuleSelectList`);
    },
    StateSelectList() {
        return ApiService.get(`/Manual/StateSelectList`);
    },
    LanguageSelectList() {
        return ApiService.get(`/Manual/LanguageSelectList`);
    },
    GenderSelectList() {
        return ApiService.get(`/Manual/GenderSelectList`);
    },
    StatusSelectList() {
        return ApiService.get(`/Manual/StatusSelectList`);
    },
    RegionSelectList() {
        return ApiService.get(`/Manual/RegionSelectList`);
    },
    DistrictSelectList() {
        return ApiService.get(`/Manual/DistrictSelectList`);
    }
};

export default ManualService;
