<template>
  <v-btn
    color="info"
    size="small"
    class="mx-1"
    icon
    variant="tonal"
    rounded="pill"
    v-bind="$attrs"
  >
    <v-icon icon="mdi-eye" class="text-primary" />
    <v-tooltip activator="parent" location="top">{{ $t("view") }}</v-tooltip>
  </v-btn>
</template>
