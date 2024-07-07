<script setup lang="ts">
import { useStateStore } from "@/stores/state";
import { storeToRefs } from "pinia";

const StateStore = useStateStore();
const { StateList } = storeToRefs(StateStore);

StateStore.GetStateList();

const modelValue = defineModel();
</script>

<template>
	<v-select
		v-model="modelValue"
		:items="StateList"
		item-title="text"
		item-value="value"
		:label="$t('state')"
		persistent-hint
		v-bind="$attrs"
	></v-select>
</template>
