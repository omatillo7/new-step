<script setup lang="ts">
import { useStateStore } from "@/stores/state";
import { storeToRefs } from "pinia";
import Select from "./Select.vue";

const StateStore = useStateStore();
const { DistrictList, DistrictListLoading } = storeToRefs(StateStore);

StateStore.GetDistrictList();

const modelValue = defineModel();
</script>

<template>
	<Select
		v-model="modelValue"
		:items="DistrictList"
		:loading="DistrictListLoading"
		item-title="text"
		item-value="value"
		:label="$t('district')"
		v-bind="$attrs"
	/>
</template>
