<template>
	<v-menu v-model="menu" :close-on-content-click="false" location="end">
		<template v-slot:activator="{ props }">
			<Input v-model="model" :loading="LanguageListLoading" v-bind="$attrs">
				<template #append-inner>
					<v-icon v-bind="props" style="cursor: pointer">mdi-google-translate</v-icon>
				</template>
			</Input>
		</template>

		<v-card min-width="400" elevation="4">
			<v-card-text>
				<v-row>
					<v-col cols="12" v-for="(item, i) in translatesComp" :key="item.languageId + columnName">
						<v-label class="mb-2">{{ languageName(item.languageId) }}</v-label>
						<v-text-field
							:key="item.languageId + columnName"
							:model-value="item.translateText"
							@update:model-value="(e) => updateModel(e, i, item)"
							hide-details
						/>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</v-menu>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

import { storeToRefs } from "pinia";
import { ITranslate } from "@/types/base";
import Input from "./Input.vue";
import { useStateStore } from "@/stores/state";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
	translates: ITranslate[];
	columnName: string;
}>();

const emit = defineEmits(["update:translates"]);
const model = defineModel();

const ManualStore = useStateStore();
const { LanguageList, LanguageListLoading } = storeToRefs(ManualStore);
const menu = ref(false);

const languageName = computed(() => (id: number) => LanguageList.value.find((l) => l.value == id)?.text || "");
const anotherTranslates = computed(() => props.translates.filter((e) => e.columnName != props.columnName));

const translatesComp = computed({
	get: () => {
		const list: ITranslate[] = props.translates.filter((item) => item.columnName == props.columnName);

		LanguageList.value.forEach((lang) => {
			const index = list.findIndex((e) => e.languageId == lang.value);
			if (index == -1) {
				list.push({
					languageId: lang.value,
					columnName: props.columnName,
					translateText: "",
				});
			} else {
				list.splice(index, 1, {
					languageId: lang.value,
					columnName: props.columnName,
					translateText: list.find((e) => e.languageId == lang.value)?.translateText || "",
				});
			}
		});
		return list.sort((a, b) => a.languageId - b.languageId);
	},
	set(v) {
		console.log(v, "set");
	},
});

const updateModel = (v: string, index: number, item: ITranslate) => {
	translatesComp.value.splice(index, 1, {
		...item,
		translateText: v,
	});
	emit("update:translates", [...anotherTranslates.value, ...translatesComp.value.filter((e) => e.translateText)]);
};

ManualStore.GetLanguageList();
</script>
