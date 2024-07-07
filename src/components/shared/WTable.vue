<script setup lang="ts">
import { IPagination } from "@/types/base";
import { computed } from "vue";
import { useSlots } from "vue";
import { VDataTableServer } from "vuetify/components";

interface IProps extends /* @vue-ignore */ Partial<VDataTableServer> {
  pagination: IPagination;
}

const slots = useSlots() as unknown as VDataTableServer["$slots"];
const props = defineProps<IProps>();

const emit = defineEmits<{
  "update:pagination": [v: IPagination];
  "update:options": [v: IPagination];
}>();

const options = computed({
  get() {
    return {
      itemsPerPage: props.pagination.pageSize,
      page: props.pagination.page,
      search: props.pagination.search,
    };
  },
  set(v: any) {
    const sortBy: { order: IPagination["orderType"]; key: string } =
      Array.isArray(v.sortBy) && v.sortBy.length
        ? v.sortBy[0]
        : { order: "asc", key: "" };

    const tempPagination: IPagination = {
      search: v.search || "",
      sortBy: sortBy.key,
      orderType: sortBy.order,
      page: v.page,
      pageSize: v.itemsPerPage,
    };

    emit("update:pagination", tempPagination);
    emit("update:options", tempPagination);
  },
});
</script>

<template>
  <!-- @vue-ignore -->
  <v-data-table-server v-model:options="options" v-bind="$attrs">
    <template v-slot:item.stateId="{ item }">
      <v-chip rounded="md" :color="item.stateId == 1 ? 'success' : 'error'">{{
        item.state
      }}</v-chip>
    </template>
    <template v-for="(_, slot) in slots" v-slot:[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps" />
    </template>
  </v-data-table-server>
</template>
