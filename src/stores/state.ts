import { defineStore } from 'pinia';
import { ILanguageList, StateId, ISelectList } from '@/types/base';
import ManualService from '@/services/Manual';

export const useStateStore = defineStore({
    id: 'state',
    state: () => ({
        StateList: [] as { id: StateId; name: string }[],
        LanguageList: [] as ILanguageList[],
        LanguageListLoading: false,
        RegionList: [] as ISelectList[],
        RegionListLoading: false,
        DistrictList: [] as ISelectList[],
        DistrictListLoading: false
    }),
    actions: {
        async GetStateList() {
            if (!this.StateList.length) {
                ManualService.StateSelectList().then((response) => {
                    this.StateList = response.data || [];
                });
            }
        },
        async GetLanguageList() {
            if (!this.LanguageList.length) {
                this.LanguageListLoading = true
                ManualService.LanguageSelectList().then((response) => {
                    this.LanguageList = response.data || [];
                }).finally(() => {
                    this.LanguageListLoading = false
                })
            }
        },
        async GetRegionList() {
            if (!this.RegionList.length) {
                this.RegionListLoading = true
                ManualService.RegionSelectList().then((response) => {
                    this.RegionList = response.data || [];
                }).finally(() => {
                    this.RegionListLoading = false
                })
            }
        },
        async GetDistrictList() {
            if (!this.DistrictList.length) {
                this.DistrictListLoading = true
                ManualService.DistrictSelectList().then((response) => {
                    this.DistrictList = response.data || [];
                }).finally(() => {
                    this.DistrictListLoading = false
                })
            }
        },
    }
});
