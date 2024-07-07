<template>
	<v-btn color="error" size="small" class="mx-1" rounded="pill" icon variant="tonal" v-bind="$attrs" @click="Delete">
		<v-icon icon="mdi-delete-outline" class="text-error" />
		<v-tooltip activator="parent" location="top">{{ t("delete") }}</v-tooltip>
	</v-btn>
</template>

<script lang="ts" setup>
import { useSwal } from "@/composables/useSwal";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import type { AxiosResponse } from "axios";

const { swal, swalError } = useSwal();
const { t } = useI18n();

const props = defineProps<{ action?: (id: number) => Promise<AxiosResponse<any>>; id?: number }>();
const emits = defineEmits(["refresh", "click"]);

const Delete = () => {
	if (props.action && props.id && typeof props.action == "function") {
		swal.fire({
			icon: "info",
			title: t("wantDelete"),
			showLoaderOnConfirm: true,
			preConfirm: () => {
				// @ts-ignore
				return props
					.action(props.id!)
					.then(() => {
						toast.success(t("deleteSuccess"));
					})
					.catch(swalError)
					.finally(() => {
						emits("refresh");
					});
			},
			allowOutsideClick: () => !swal.isLoading(),
		});
	} else {
		emits("click");
	}
};
</script>
