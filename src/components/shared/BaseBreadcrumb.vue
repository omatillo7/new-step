<script setup lang="ts">
import { IBreadcrumbItem } from "@/types/base";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const props = defineProps<{
	title: string;
	breadcrumbs: IBreadcrumbItem[];
	icon?: string;
}>();

const { t } = useI18n();
const breadcrumbsComp = computed(() => props.breadcrumbs.map((b) => ({ ...b, title: t(b.title) })));
</script>

<template>
	<v-card class="overflow-hidden mb-7" elevation="0">
		<v-card-text class="pa-6">
			<div class="d-sm-flex d-block justify-content-between py-0 align-center">
				<h4 class="text-h4 flex-grow-1">{{ $t(title) }}</h4>
				<div>
					<v-breadcrumbs :items="breadcrumbsComp" class="font-weight-regular pa-0 ml-n1 text-subtitle-1">
						<template v-slot:divider v-if="breadcrumbs">
							<v-icon>mdi-circle-small</v-icon>
						</template>
					</v-breadcrumbs>
				</div>
			</div>
		</v-card-text>
	</v-card>
</template>

<style lang="scss">
.page-breadcrumb {
	.v-toolbar {
		background: transparent;
	}
}
</style>
