<template>
  <v-list-item>
    <v-list-item-content style="flex-flow: row">
      <v-list-item-title>{{ buyer.name }}</v-list-item-title>
      <v-list-item-subtitle style="text-align: end; margin: 0 20px">
        <v-btn v-if="accepted === true" text color="blue"> Approved </v-btn>
        <v-btn v-if="accepted === false" text color="yellow">
          Pending Booking
        </v-btn>
      </v-list-item-subtitle>
      <v-text-field
        v-model="date"
        label="Pick a date"
        prepend-icon="mdi-calendar"
        v-bind="attrs"
        v-on="on"
        style="min-width: 150px"
        readonly
        disabled
      ></v-text-field>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn
        depressed
        color="primary"
        :disabled="accepted"
        @click="$emit('accept-appointment', appointmentId)"
      >
        Click to Approve
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: ["buyer"],

  computed: {
    appointmentId: function () {
      return this.buyer?.appointments?.[0]?.id;
    },
    date: function () {
      return this.buyer?.appointments?.[0]?.date.substr(0, 10);
    },
    accepted: function () {
      return this.buyer?.appointments?.[0]?.isAccepted || false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>