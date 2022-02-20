<template>
  <client-only placeholder="Loading...">
    <v-card class="px-0" fluid :loading="loading">
      <v-card-title> The Sellers Club </v-card-title>
      <v-card-text v-if="list.length === 0" color="error"
        >No Seller Available At The Moment</v-card-text
      >
      <v-container>
        <SellerItem
          v-for="seller in list"
          :key="seller.id"
          :seller="seller"
          @book-appointment="handleBookAppointment"
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
    async handleBookAppointment(obj) {
      console.log(obj);
      try {
        await axios.post(
          `http://localhost:3000/api/v1/appointments/${this.id}/${obj.sellerId}?date=${obj.date}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        await this.fetchAvailableAppointments();
      } catch (error) {
        console.log(error.message);
      }
    },

    async fetchAvailableAppointments() {
      this.loading = true;
      this.error = null;
      this.success = false;

      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/appointments/available/${this.id}`,
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

    if (this.type === "sellers") {
      return this.$router.push({
        path: "/appointments",
      });
    }
    
    await this.fetchAvailableAppointments();
  },
};
</script>

<style scoped>
</style>