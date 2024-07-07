<script setup lang="ts">
import { useStateStore } from "@/stores/state";
import { storeToRefs } from "pinia";
import Select from "./Select.vue";

const StateStore = useStateStore();
const { RegionList, RegionListLoading } = storeToRefs(StateStore);

StateStore.GetRegionList();

const modelValue = defineModel();
</script>

<template>
	<Select
		v-model="modelValue"
		:items="RegionList"
		:loading="RegionListLoading"
		item-title="text"
		item-value="value"
		:label="$t('region')"
		v-bind="$attrs"
	/>
</template>
