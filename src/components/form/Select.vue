<template>
	<v-select v-if="noSearch" v-bind="$attrs" v-model="modelValue" :rules="compRules" :label>
		<template v-for="(_, slot) in slots" v-slot:[slot]="slotProps">
			<slot :name="slot" v-bind="slotProps" />
		</template>
	</v-select>
	<v-autocomplete v-else v-bind="$attrs" v-model="modelValue" :rules="compRules" :label>
		<template v-for="(_, slot) in slots" v-slot:[slot]="slotProps">
			<slot :name="slot" v-bind="slotProps" />
		</template>
	</v-autocomplete>
</template>
<script setup lang="ts">
import { VSelect } from "vuetify/components";
import { useI18n } from "vue-i18n";
import { useSlots, useAttrs, computed } from "vue";

interface IProps extends /* @vue-ignore */ Partial<VSelect> {
	modelValue: string | number;
	rules?: any[];
	required?: boolean;
	noSearch?: boolean;
}

defineOptions({
	inheritAttrs: false,
});

const { t } = useI18n();

const props = withDefaults(defineProps<IProps>(), {
	noSearch: false,
});

const modelValue = defineModel();
const slots = useSlots() as unknown as VSelect["$slots"];
const attrs = useAttrs() as unknown as VSelect["$props"];

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
