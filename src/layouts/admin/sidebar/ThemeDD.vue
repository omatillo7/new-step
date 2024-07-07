<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();

function toggleTheme() {
	theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
	localStorage.setItem("themes", theme.global.name.value);
}
</script>

<template>
	<icon-btn @click="toggleTheme" icon color="primary" class="mr-1">
		<v-icon>{{ theme.global.current.value.dark ? "mdi-weather-night" : "mdi-weather-sunny" }}</v-icon>
	</icon-btn>
</template>

<style lang="sass" scoped></style>
