<template>
  <client-only placeholder="Loading...">
    <v-card :loading="loading" elevation="0">
      <v-card-title class="headline pl-0">
        Welcome to the AOC Booking Services
      </v-card-title>
      <v-card-text class="pl-0">
        <p>
          Here you could login as a Buyer to book appointments with sellers in
          order to further discuss the trade offer, or you could login as a
          Seller, to confirm any outstanding appointments that a buyer might
          have requested.
        </p>
      </v-card-text>

      <v-text-field
        v-model="name"
        type="text"
        :label="error ? 'Username: Error' : 'Username'"
        hint="Buyers: Joe | Waren | Bill | Sara <---------> Sellers: Biden | Buffet | Gates"
        :error="!!error"
        :error-messages="error"
        id="user-login"
        :success="success"
        :success-messages="!!success ? 'Logged In!' : null"
        autocomplete="off"
      ></v-text-field>

      <v-container class="px-0" fluid>
        <v-radio-group row v-model="customer" mandatory>
          <v-radio label="As Buyer" value="buyer"></v-radio>
          <v-radio label="As Seller" value="seller"></v-radio>
        </v-radio-group>
      </v-container>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </client-only>
</template>

<script>
import { setToken, getToken, decodeToken } from "../utils/token";
import axios from "axios";

export default {
  data: () => ({
    loading: false,
    error: null,
    success: false,

    name: null,
    type: null,
    customer: "buyer",
  }),

  methods: {
    async login() {
      this.loading = true;
      this.error = null;
      this.success = false;

      try {
        const { data } = await axios.post(
          `http://localhost:3000/api/v1/login/${this.customer}?name=${this.name}`
        );
        setToken(data.token);
        this.success = true;
        this.$nuxt.$emit("login", "success");
      } catch (error) {
        this.error = error.message + ": Invalid Username!";
        this.success = false;
        this.$nuxt.$emit("login", "fail");
      }

      this.loading = false;
    },
  },

  // Listen to events emmitted on logout from layout component
  // Switch to vuex for easier reactity
  created() {
    this.$nuxt.$on("login", async (condition) => {
      if (!getToken()) return;

      [this.name, this.type] = await decodeToken().then((obj) => [
        obj.name,
        obj.type,
      ]);
      condition &&
        setTimeout(
          () =>
            this.$router.push({
              path: `/${this.type === "buyers" ? "sellers" : "appointments"}`,
            }),
          1500
        );
    });
  },

  mounted: async function () {
    if (!getToken()) return;

    [this.name, this.type] = await decodeToken().then((obj) => [
      obj.name,
      obj.type,
    ]);
    this.success = true;
  },
};
</script>

<style>
.v-input__control .v-messages__wrapper {
  margin-top: 10px;
}
</style>