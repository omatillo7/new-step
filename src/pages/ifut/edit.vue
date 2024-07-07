<script setup lang="ts">
import UiParentCard from "@/components/shared/UiParentCard.vue";
import Input from "@/components/form/Input.vue";
import StateSelect from "@/components/form/StateSelect.vue";
import { toast } from "vue3-toastify";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import IfutService from "@/services/Ifut";
import { SubmitEventPromise } from "vuetify";
import { useI18n } from "vue-i18n";
import DatePicker from "@/components/form/DatePicker.vue";
import { VDateInput } from 'vuetify/labs/VDateInput'

const { t } = useI18n();
const loading = ref<boolean>(false);
const route = useRoute();
const router = useRouter();
const getLoading = ref(false);

const Ifut = ref<any>({
  state: "",
  personId: 1,
  person: {
    id: 1,
    fullName: "",
    code: 0,
    stateId: 1,
  },
});

const Back = () => {
  router.go(-1);
};

const getData = () => {
  getLoading.value = true;
  IfutService.Get(route.params.id as string)
    .then((res) => {
      Ifut.value = res.data;
    })
    .finally(() => {
      getLoading.value = false;
    });
};

const save = async (values: SubmitEventPromise) => {
  const { valid } = await values;

  if (!valid) return;
  loading.value = true;

  IfutService.Update(Ifut.value)
    .then(() => {
      toast.success(t("saveSuccess"));
      router.push({ name: "Ifut" });
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
          <Input label="ifutName" v-model="Ifut.fullName" required />
        </v-col>
        <v-col cols="12" lg="3" md="4">
          <Input label="code" v-model="Ifut.code" required />
        </v-col>
        <!-- <v-col cols="12" lg="3" md="4">
         <v-date-input label="Date input" variant="outlined"></v-date-input>
        </v-col> -->
        <v-col cols="12" lg="3" md="6">
          <StateSelect v-model="Ifut.stateId" />
        </v-col>
      </v-row>
      <v-row class="text-right justify-space-between">
        <v-col cols="3" lg="2" class="text-right mt-5">
          <v-btn color="error" size="large" block @click="Back">{{
            $t("back")
          }}</v-btn>
        </v-col>
        <v-col cols="3" lg="2" class="text-right mt-5">
          <v-btn
            color="primary"
            size="large"
            :loading="loading"
            block
            type="submit"
            >{{ $t("save") }}</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </UiParentCard>
</template>
