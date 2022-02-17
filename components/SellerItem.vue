<template>
  <v-list-item>
    <v-list-item-content style="flex-flow: row">
      <v-list-item-title>{{ seller.name }}</v-list-item-title>
      <v-list-item-subtitle style="text-align: end; margin: 0 20px">
        <v-btn
          v-if="disabled === false && accepted === false"
          text
          color="green"
        >
          Available
        </v-btn>
        <v-btn
          v-if="disabled === true && accepted === false"
          text
          color="yellow"
        >
          Awaiting Approval
        </v-btn>
        <v-btn v-if="disabled === true && accepted === true" text color="blue">
          Approved
        </v-btn>
      </v-list-item-subtitle>
      <v-menu v-model="menu" :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }" disabled>
          <v-text-field
            v-model="date"
            label="Pick a date"
            prepend-icon="mdi-calendar"
            v-bind="attrs"
            v-on="on"
            style="min-width: 150px"
            readonly
            :disabled="disabled"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="menu = false"
          :min="new Date().toISOString().substr(0, 10)"
        ></v-date-picker>
      </v-menu>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn
        depressed
        color="primary"
        :disabled="disabled"
        @click="$emit('book-appointment', { sellerId: seller.id, date })"
      >
        Click to book
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: ["seller"],
  data: () => ({
    menu: false,
  }),

  computed: {
    disabled: function () {
      return this.seller?.appointments?.length !== 0;
    },
    accepted: function () {
      return this.seller?.appointments?.[0]?.isAccepted || false;
    },
    date: function () {
      return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>