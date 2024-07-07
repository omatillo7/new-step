<script setup lang="ts">
import { ref } from "vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { VFileInput } from "vuetify/components";

interface IProps extends /* @vue-ignore */ Partial<VFileInput> {
	placeholder?: string;
	label?: string;
	modelValue: any;
	required?: boolean;
	rules?: any[];
	showSize?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
	modelValue: null,
	label: "",
	showSize: true,
});

const emit = defineEmits(["update:modelValue"]);

const { t } = useI18n();

const model = computed({
	get(): File[] {
		return props.modelValue;
	},
	set(newValue: File[]): void {
		emit("update:modelValue", newValue);
	},
});

const compRules = computed(() => {
	const list = props.rules ? [...props.rules] : [];
	if (props.required) {
		list.push((v: any) => !!v || t("rules.required"));
	}
	return list;
});

const label = computed(() => {
	return (props.required ? t(props.label!) + " *" : t(props.label!)) as string;
});

const imagePreviewURL = ref();
</script>

<template>
	<v-file-input
		:placeholder="placeholder ? placeholder : label"
		:showSize="showSize"
		:label="label"
		v-model="model"
		:rules="compRules"
		prepend-icon="mdi-image"
		v-bind="$attrs"
	>
		<template v-slot:selection="{ fileNames }">
			<template v-for="(fileName, index) in fileNames" :key="fileName">
				<v-chip v-if="index < 2" color="primary" label size="small" class="me-2">
					{{ fileName }}
				</v-chip>

				<span v-else-if="index === 2" class="text-overline mx-2"> +{{ model.length - 2 }} File(s) </span>
			</template>
		</template>
		<template #append-inner>
			<v-btn color="initial" class="text-none">
				{{ t("selectFile") }}
			</v-btn>
		</template>
		<template v-for="(_, slot) in $slots" v-slot:[slot]="slotProps">
			<slot :name="slot" v-bind="slotProps" />
		</template>
	</v-file-input>

	{{ imagePreviewURL }}
	<img v-if="imagePreviewURL" :src="imagePreviewURL" alt="" style="max-width: 100%; width: 250px; object-fit: cover" />
</template>
