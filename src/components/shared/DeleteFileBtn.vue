<template>
	<v-btn color="error" size="small" class="mx-1" icon v-bind="$attrs" @click="Delete">
        <v-icon>mdi-delete-outline</v-icon>
		<v-tooltip activator="parent" location="top">{{ t("delete") }}</v-tooltip>
	</v-btn>
</template>

<script lang="ts" setup>
import { useSwal } from "@/composables/useSwal";
import { useI18n } from "vue-i18n";
import type { AxiosResponse } from "axios";
import { toast } from "vue3-toastify";

const { swal, swalError } = useSwal();
const { t } = useI18n();

const props = defineProps<{ action?: (id: string) => Promise<AxiosResponse<any>>; id?: string }>();
const emits = defineEmits(["delete:success", "delete:finish", "delete:error", "click"]);

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
						emits("delete:success");
					})
					.catch((e) => {
						emits("delete:error", e);
						swalError(e);
					})
					.finally(() => {
						emits("delete:finish");
					});
			},
			allowOutsideClick: () => !swal.isLoading(),
		});
	} else {
		emits("click");
	}
};
</script>
