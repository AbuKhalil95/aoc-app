<template>
  <client-only placeholder="Loading...">
    <v-card class="px-0" fluid :loading="loading">
      <v-card-title> Your Outstanding Appointments </v-card-title>
      <v-card-text v-if="list.length === 0" color="error"
        >No Requested Appointments At The Moment</v-card-text
      >
      <v-container>
        <AppointmentItem
          v-for="buyer in list"
          :key="buyer.id"
          :buyer="buyer"
          @accept-appointment="handleAcceptAppointment"
        />
      </v-container>
    </v-card>
  </client-only>
</template>

<script>
import axios from "axios";
import { getToken, decodeToken } from "../utils/token";

export default {
  data: () => ({
    loading: true,
    error: null,
    success: false,

    list: [],
    id: null,
  }),

  methods: {
    async handleAcceptAppointment(appointmentId) {
      console.log(appointmentId);
      try {
        await axios.put(
          `http://localhost:3000/api/v1/appointments/${appointmentId}`,
          {
            isAccepted: true,
          },
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );

        await this.fetchRequestedAppointments();
      } catch (error) {
        console.log(error.message);
      }
    },

    async fetchRequestedAppointments() {
      this.loading = true;
      this.error = null;
      this.success = false;

      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/appointments/requests/${this.id}`,
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );
        this.list = data;
        this.success = true;
      } catch (error) {
        this.success = false;
      }
      this.loading = false;
    },
  },

  mounted: async function () {
    if (!getToken()) {
      return this.$router.push({
        path: "/",
      });
    }

    [this.id, this.type] = await decodeToken().then((obj) => [
      obj.id,
      obj.type,
    ]);

    if (this.type === "buyers") {
      return this.$router.push({
        path: "/sellers",
      });
    }
    await this.fetchRequestedAppointments();
  },
};
</script>

<style scoped>
</style>