<script setup lang="ts">
import { ref } from "vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import IfutService from "@/services/Ifut";
import { useI18n } from "vue-i18n";
import { VDataTableHeaders } from "vuetify/components";
import { computed } from "vue";
import { usePermission } from "@/composables/usePermission";

import DeleteBtn from "@/components/shared/DeleteBtn.vue";
import EditBtn from "@/components/shared/EditBtn.vue";

import { usePagination } from "@/composables/usePagination";
import WTable from "@/components/shared/WTable.vue";
import Input from "@/components/form/Input.vue";

const { can } = usePermission();
const { t } = useI18n();

const List = ref<any[]>([]);

const { pagination, totalItems } = usePagination(true, {
	search: "",
});

const loading = ref<boolean>(false);

const headers = computed(() => {
	return [
		{ title: t("id"), key: "id", align: "start" },
		{ title: t("code"), key: "code", align: "start" },
		{ title: t("fullName"), key: "fullName", align: "start" },
		{ title: t("shortName"), key: "shortName", align: "start" },
		{ title: t("stateId"), key: "stateId", align: "start" },
		{ title: t("actions"), key: "actions", align: "start", sortable: false },
	] as unknown as VDataTableHeaders[];
});

const getList = () => {
	loading.value = true;
	IfutService.GetList(pagination.value)
		.then((res) => {
			List.value = res.data.rows;
			totalItems.value = res.data.total;
		})
		.finally(() => {
			loading.value = false;
		});
};
</script>

<template>
	<UiParentCard>
		<template #action>
			<v-row class="pt-2">
				<v-col cols="12" lg="4" md="6">
					<Input density="compact" :debounce="500" v-model="pagination.search" @update:model-value="getList" label="search" hide-details clearable />
				</v-col>
				<v-col cols="12" lg="8" md="6" class="text-right" v-if="can('CreativeDirectionEdit')">
					<v-btn color="primary" :to="{ name: 'CreativeDirectionEdit', params: { id: 0 } }" class="ml-auto">
						<v-icon class="mr-2">mdi-plus</v-icon>
						{{ $t("Add") }}
					</v-btn>
				</v-col>
			</v-row>
		</template>

		<WTable v-model:pagination="pagination" :loading="loading" :headers="headers" :items="List" :items-length="totalItems" @update:options="getList">
			<template v-slot:item.actions="{ item } :any">
				<div class="d-flex align-center">
					<EditBtn :to="{ name: 'CreativeDirectionEdit', params: { id: item.id } }" />
					<DeleteBtn :id="item.id" :action="IfutService.Delete" @refresh="getList" />
				</div>
			</template>
		</WTable>
	</UiParentCard>
</template>
