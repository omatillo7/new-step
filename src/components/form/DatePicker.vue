<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ props }">
        <v-text-field
          v-bind="props"
          :value="dateFormatted"
          variant="outlined"
          append-inner-icon="mdi-calendar"
          @change="onChange"
          @input="updateDate"
        ></v-text-field>
      </template>
      <v-date-picker
        :value="getDate"   
        @change="onChange"
        @input="updateDate"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Date on ISO format to be edited.
     * @model
     */
    value: {
      type: String,
      default() {
        return ""
      },
    },
  },
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    dateFormatted() {
      return this.input ? new Date(this.input) : "";
    },
    getDate() {
      /**
       * Return ISO 8601
       */
      let date = this.input ? new Date(this.input) : new Date();

      let month = 1 + date.getMonth();
      if (month < 10) {
        month = `0${month}`;
      }
      let day = date.getDate();
      if (day < 10) {
        day = `0${day}`;
      }
      return `${date.getFullYear()}-${month}-${day}`;
    },
  },
  methods: {
    onChange(val) {
      console.error(val)
    },
    updateDate(val) {
      this.menu = false;
      console.error(val)
    },
  },
};
</script>