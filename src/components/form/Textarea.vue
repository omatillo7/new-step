<template>
	<v-textarea v-bind="$attrs" required v-model="model" :rules="compRules" :label="label">
		<template v-for="(_, slot) in slots" v-slot:[slot]="slotProps">
			<slot :name="slot" v-bind="slotProps" />
		</template>
	</v-textarea>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSlots, useAttrs } from "vue";
import { VTextarea } from "vuetify/components";
import { useI18n } from "vue-i18n";

interface IProps extends /* @vue-ignore */ Partial<VTextarea> {
	modelValue: string | number;
	rules?: any[];
	required?: boolean;
	debounce?: number;
}

defineOptions({
	inheritAttrs: false,
});

const { t } = useI18n();
const props = defineProps<IProps>();
const slots = useSlots() as unknown as VTextarea["$slots"];
const attrs = useAttrs() as unknown as VTextarea["$props"];

const model = defineModel();

const compRules = computed(() => {
	const list = props.rules ? [...props.rules] : [];
	if (props.required) {
		list.push((v: any) => !!v || t("rules.required"));
	}
	return list;
});

const label = computed(() => {
	return (props.required ? t(attrs.label!) + " *" : t(attrs.label!)) as string;
});
</script>
