<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import VerticalSidebar from "./sidebar/VerticalSidebar.vue";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";

import { IBreadcrumbItem } from "@/types/base";
import LanguageDD from "./sidebar/LanguageDD.vue";
import ThemeDD from "./sidebar/ThemeDD.vue";

const route = useRoute();

const drawer = ref(true);

const breadcrumbs = computed(
  () => (route.meta.breadcrumbs || []) as IBreadcrumbItem[]
);
const title = computed(() => route.meta.title as string);
</script>

<template>
  <VApp>
    <VerticalSidebar v-model="drawer" />

    <v-app-bar prominent elevation="10">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title style="font-size:16px; line-height:19px">Tashkilot : O'ZBEKISTON RESPUBLIKASI OLIY TA'LIM, FAN VA INNOVATSIYALAR VAZIRLIGI <br> <span style="font-size:14px">Foydalanuvchi nomi : Admin</span> </v-app-bar-title>

      <div class="d-flex align-center ga-2 px-8">
        <ThemeDD />

        <LanguageDD />
      </div>
    </v-app-bar>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <VApp>
          <BaseBreadcrumb :title="title" :breadcrumbs></BaseBreadcrumb>

          <router-view></router-view>
        </VApp>
      </v-container>
    </v-main>
  </VApp>
</template>
