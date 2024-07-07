<script setup lang="ts">
import UiParentCard from "@/components/shared/UiParentCard.vue";
import Input from "@/components/form/Input.vue";
import StateSelect from "@/components/form/StateSelect.vue";
import { toast } from "vue3-toastify";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import BankService from "@/services/Bank";
import { SubmitEventPromise } from "vuetify";
import { useI18n } from "vue-i18n";
// import DatePicker from "@/components/form/DatePicker.vue";

const { t } = useI18n();
const loading = ref<boolean>(false);
const route = useRoute();
const router = useRouter();
const getLoading = ref(false);

const Bank = ref<any>({
  state: "",
  personId: 1,
  person: {
    id: 1,
    bankName: "",
    bankCode: 0,
    stateId: 1,
  }
});

const Back = () => {
  router.go(-1);
};

const getData = () => {
  getLoading.value = true;
  BankService.Get(route.params.id as string)
    .then((res) => {
      Bank.value = res.data;
    })
    .finally(() => {
      getLoading.value = false;
    });
};

const save = async (values: SubmitEventPromise) => {
  const { valid } = await values;

  if (!valid) return;
  loading.value = true;

  BankService.Update(Bank.value)
    .then(() => {
      toast.success(t("saveSuccess"));
      router.push({ name: "Bank" });
    })
    .finally(() => {
      loading.value = false;
    });
};
getData();
</script>

<template>
  <UiParentCard :loading="getLoading">
    <v-form @submit.prevent="save">
      <v-row>
        <v-col cols="12" lg="3" md="4">
          <Input label="bankName" v-model="Bank.bankName" required />
        </v-col>
        <v-col cols="12" lg="3" md="4">
          <Input label="bankCode" v-model="Bank.bankCode" required />
        </v-col>
          <!-- <v-col cols="12" lg="3">
        <date-picker v-model="selectedDate"></date-picker>
      </v-col>   -->
        <v-col cols="12" lg="3" md="4">
          <StateSelect v-model="Bank.stateId" />
        </v-col>
      </v-row>
      <v-row class="text-right justify-space-between">
        <v-col cols="3" lg="2" class="text-right mt-5">
          <v-btn color="error" size="large" block @click="Back">{{ $t("back") }}</v-btn>
        </v-col>
        <v-col cols="3" lg="2" class="text-right mt-5">
          <v-btn
            color="primary"
            size="large"
            :loading="loading"
            block
            type="submit"
          >{{ $t("save") }}</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </UiParentCard>
</template>
