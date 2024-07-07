<script setup lang="ts">
defineProps<{
	title?: string;
	loading?: boolean;
}>();
</script>

// ===============================|| Ui Parent Card||=============================== //
<template>
	<v-card elevation="0" rounded="lg">
		<!-- loading -->
		<v-overlay :model-value="loading" contained :persistent="true" class="align-center justify-center">
			<v-progress-circular color="primary" indeterminate :size="83" :width="7"></v-progress-circular>
		</v-overlay>
		<v-card-item class="py-6 px-6">
			<slot name="action"></slot>
		</v-card-item>
		<v-divider></v-divider>
		<v-card-text>
			<slot />
		</v-card-text>
	</v-card>
</template>
