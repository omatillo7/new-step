<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import type { SubmitEventPromise } from "vuetify";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { LoginDto } from "@/types/auth";
import { toast } from "vue3-toastify";

const { t } = useI18n();

const form = ref<LoginDto>({
  userName: "",
  password: "",
});

const isPasswordVisible = ref(false);
const store = useAuthStore();
const { isLoading } = storeToRefs(store);

const passwordRules = [
  (v: string) => !!v || t("rules.required"),
  (v: string) => v?.length >= 6 || t("rules.min", { v: 6 }),
];

const onSubmit = async (values: SubmitEventPromise) => {
  const { valid } = await values;
  if (valid) {
    try {
      await store.login(form.value);
      toast.success(t("auth.login_successfully"));
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(t("auth.login_failed"));
    }
  }
};

const SignbyOneId = () => {
  const clientId = 'vakansiya.edu.uz'; 
  const redirectUri = `${import.meta.env.VITE_CLIENT_URL}/account/login/`;
  const scope = 'vakansiya.edu.uz';
  const state = 'testState';

  const authorizationUrl = `https://sso.egov.uz/sso/oauth/Authorization.do?response_type=one_code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

  window.location.replace(authorizationUrl);
};
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <img class="position-absolute left-0 top-0" alt="" />

    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          <a href="/" class="h-25"
            ><img
              style="width: 160px; height: auto"
              src="@/assets/images/profile/Group39.png"
          /></a>
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h3 class="text-h3 font-weight-semibold mb-1">
          {{ $t("Kirish") }}
        </h3>
        <p class="mb-0">
          {{ $t("Kirish uchun foydalanuvchi nomi va parolni kiriting") }}
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="onSubmit">
          <VRow>
            <!-- username -->
            <VCol cols="12">
              <FormInput
                v-model="form.userName"
                required
                label="auth.user_login"
                append-inner-icon="mdi-account-outline"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <FormInput
                v-model="form.password"
                required
                label="auth.password"
                :rules="passwordRules"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="
                  isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                "
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>
            <VCol cols="12" lg="6">
              <VBtn
                block
                size="large"
                color="success"
                type="submit"
                class="text-none"
                :disabled="isLoading"
              >
                {{ $t("Kirish") }}
              </VBtn>
            </VCol>
            <VCol cols="12" lg="6">
              <VBtn
                block
                size="large"
                outlined
                @click="SignbyOneId"
                class="text-none"
                :disabled="isLoading"
              >
                {{ $t("OneID") }}
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
.auth-wrapper {
  min-height: 100vh;
}

.auth-footer-mask {
  position: absolute;
  inset-block-end: 0;
  min-inline-size: 100%;
}

.auth-card {
  z-index: 1 !important;
}

.auth-logo {
  position: absolute;
  z-index: 1;
  inset-block-start: 2rem;
  inset-inline-start: 2.3rem;
}

.auth-bg {
  background-color: rgb(var(--v-theme-surface));
}
</style>
