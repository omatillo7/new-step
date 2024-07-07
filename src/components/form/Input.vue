<template>
	<v-text-field v-bind="$attrs" required v-model="model" :rules="compRules" :label="label">
		<template v-for="(_, slot) in slots" v-slot:[slot]="slotProps">
			<slot :name="slot" v-bind="slotProps" />
		</template>
	</v-text-field>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useSlots, useAttrs } from "vue";
import { VTextField } from "vuetify/components";
import { useI18n } from "vue-i18n";
import { debounce } from "@/lib/debounce";

interface IProps extends /* @vue-ignore */ Partial<VTextField> {
	modelValue: any;
	rules?: any[];
	required?: boolean;
	debounce?: number;
}

defineOptions({
	inheritAttrs: false,
});

const { t } = useI18n();
const props = defineProps<IProps>();
const slots = useSlots() as unknown as VTextField["$slots"];
const attrs = useAttrs() as unknown as VTextField["$props"];
const emit = defineEmits(["update:modelValue"]);

const model = ref(props.modelValue);

watch(
	() => props.modelValue,
	(newValue) => {
		model.value = newValue;
	},
);

const debouncedEmit = props.debounce
	? debounce((value: string | number) => {
			emit("update:modelValue", value);
	  }, props.debounce)
	: (value: string | number) => {
			emit("update:modelValue", value);
	  };

watch(model, (newValue) => {
	console.log("update:modelValue", newValue);
	debouncedEmit(newValue);
});

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
