import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { IPagination } from "@/types/base";


const paginationDef: IPagination = {
    search: '',
    sortBy: '',
    orderType: 'asc',
    page: 1,
    pageSize: 20,
}

export const usePagination = (persist = true, f?: Partial<IPagination>) => {
    const route = useRoute();
    const router = useRouter();

    const totalItems = ref<number>(0);

    const margedPagination = { ...paginationDef, ...f }

    const createPagination = (): IPagination => {
        const filterList = JSON.parse(JSON.stringify(margedPagination));
        if (persist) {
            for (const [key, value] of Object.entries(filterList)) {
                if (key in route.query) {
                    if (key.endsWith('Ids')) {
                        const val = route.query[key];
                        filterList[key] = val && Array.isArray(JSON.parse(val as string)) ? JSON.parse(val as string) : [];
                    }
                    if (key.endsWith('Id') || key == 'Page' || key == 'PageSize') {
                        filterList[key] = route.query[key] ? Number(route.query[key]) : value;
                    } else {
                        filterList[key] = route.query[key] || value;
                    }
                }
            }
        }


        return filterList;
    };


    const pagination = ref<IPagination>(createPagination());


    watch(
        () => pagination.value,
        (newFilter) => {
            if (persist) {
                let query = {};
                for (const [key, value] of Object.entries(newFilter)) {
                    if (key.endsWith('Ids')) {
                        query = { ...query, [key]: value && Array.isArray(value) ? value : [] || null };
                    } else {
                        query = { ...query, [key]: value };
                    }
                }
                router.replace({ query: { ...route.query, ...query } });
            }
        },
        {
            deep: true,
            immediate: true
        }
    );

    return { pagination, totalItems };
}