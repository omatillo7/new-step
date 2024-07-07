<!-- DatePickerComponent.vue -->
<template>
  <v-date-picker
    v-model="selectedDate"
    :locale="locale"
    color="primary"
    scrollable
    @input="updateDate"
  ></v-date-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VDatePicker } from 'vuetify/components';
import { defineEmits } from 'vue';

interface DatePickerProps {
  modelValue: string; // Date in ISO format (YYYY-MM-DD)
}

const props = defineProps<DatePickerProps>();
const emit = defineEmits(['update:modelValue']);

const selectedDate = ref<string>(props.modelValue); // Initialize with the passed model value
const locale = ref<string>('en'); // Adjust according to your locale needs

const updateDate = (value: string) => {
  selectedDate.value = value;
  emit('update:modelValue', value); // Emitting the selected date as modelValue
};

// Expose selectedDate and locale for parent component to handle
const expose = { selectedDate, locale };
</script>
