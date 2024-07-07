<script setup lang="ts">
import { shallowRef } from "vue";
import { useAuthStore } from "@/stores/auth";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { storeToRefs } from "pinia";
import { usePermission } from "@/composables/usePermission";
import NavItem from "./NavItem.vue";

import menu from "../menu";

const AuthStore = useAuthStore();
const { user } = storeToRefs(AuthStore);

const sidebarMenu = shallowRef(menu);

const { isVisibleMenu } = usePermission();

const drawer = defineModel<boolean>({ default: true });
</script>

<template>
  <v-navigation-drawer v-model="drawer" elevation="9">
    <v-menu :close-on-content-click="true" class="profile_popup">
      <template v-slot:activator="{ props }">
        <v-list height="64">
          <div
            class="text-left px-0 cursor-pointer"
            variant="text"
            v-bind="props"
          >
            <div class="d-flex align-center ml-7">
               <img
                  src="@/assets/images/profile/Group39.png"
                  width="100"
                  :alt="user?.userName"
                />
              <!-- <div class="ml-md-4 d-md-block d-none">
                <h6
                  class="text-h6 d-flex align-center text-black font-weight-semibold"
                >
                  {{ user?.fullName }}
                </h6>
                <span class="text-subtitle-2 font-weight-medium text-grey100">{{
                  user?.userName
                }}</span>
              </div> -->
            </div>
          </div>
        </v-list>
      </template>
      <v-sheet rounded="lg" elevation="10" class="mt-5">
        <div class="px-8 pt-6">
          <div class="d-flex align-center justify-space-between">
            <h6 class="text-h5 font-weight-semibold">{{ $t("userdata") }}</h6>
            <v-btn icon="mdi-close" variant="tonal" size="sm"></v-btn>
          </div>

          <div class="d-flex align-center mt-5 pb-6">
            <v-avatar size="90">
              <img src="@/assets/images/profile/user6.jpg" width="90" />
            </v-avatar>
            <div class="ml-5">
              <h6 class="text-h5 mb-n1">{{ user?.organization }}</h6>
              <span
                class="text-subtitle-1 font-weight-regular text-grey100 font-weight-medium"
                >{{ user?.userName }}</span
              >
              <div class="d-flex align-center mt-1">
                <span
                  class="text-subtitle-1 text-grey100 font-weight-medium ml-2"
                  >{{ user?.roles }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="pb-6 px-8 text-center">
          <v-btn
            color="error"
            variant="tonal"
            size="large"
            rounded="pill"
            append-icon="mdi-logout-variant"
            block
            @click="AuthStore.logout()"
            >{{ $t("auth.logout") }}</v-btn
          >
        </div>
      </v-sheet>
    </v-menu>

    <v-divider></v-divider>
    <PerfectScrollbar class="scrollnavbar bg-containerBg overflow-y-hidden">
      <v-list :lines="false" density="comfortable" nav>
        <!---Menu Loop -->
        <template v-for="item in sidebarMenu">
          <NavItem
            :item="item"
            :key="item.title + 'nochildren'"
            v-if="isVisibleMenu(item.visible)"
            class="leftPadding"
          />
        </template>
      </v-list>
    </PerfectScrollbar>
  </v-navigation-drawer>
</template>

<style>
@import "vue3-perfect-scrollbar/style.css";

.ps {
  max-height: calc(100vh - 65px);
}
</style>
