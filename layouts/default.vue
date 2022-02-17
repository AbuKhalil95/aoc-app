<template>
  <v-app>
    <v-app-bar app>
      <v-container class="py-0 fill-height">
        <template v-if="name">
          <v-avatar color="grey darken-1" size="32" :title="name">
            <v-icon v-text="'mdi-account-multiple'"></v-icon>
          </v-avatar>
          <strong class="pl-4" style="font-size: 24px">{{
            name + " of the " + type
          }}</strong>
          <v-btn color="secondary" class="ml-6" @click="logout">logout</v-btn>
        </template>
        <v-spacer></v-spacer>
        <v-btn text router to="/">Home</v-btn>
        <v-btn v-if="this.type === 'buyers'" text router to="/sellers"
          >Sellers</v-btn
        >
        <v-btn v-if="this.type === 'sellers'" text router to="/appointments"
          >Appointments</v-btn
        >
      </v-container>

      <v-switch
        v-model="lightMode"
        flat
        hide-details=""
        style="min-width: max-content"
        :label="lightMode ? 'Light Mode' : 'Dark Mode'"
        @change="$vuetify.theme.dark = !$vuetify.theme.dark"
        :messages="null"
      ></v-switch>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-sheet class="mt-10" min-height="70vh" rounded="lg">
          <Nuxt />
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { getToken, decodeToken, deleteToken } from "../utils/token";

export default {
  data: () => ({
    lightMode: false,
    name: null,
    type: null,
  }),

  methods: {
    logout() {
      this.name = null;
      this.type = null;
      deleteToken();
      this.$nuxt.$emit("logout");
    },
  },

  // Listen to events emmitted on login from login component
  // Switch to vuex for easier reactity
  created() {
    this.$nuxt.$on("logout", () => {
      this.error = null;
      this.success = false;
      this.$router.push({
        path: "/",
      });
    });

    this.$nuxt.$on("login", async (condition) => {
      if (condition === "fail") {
        this.name = null;
        this.type = null;
        return;
      } else if (condition === "success") {
        [this.name, this.type] = await decodeToken().then((obj) => [
          obj.name,
          obj.type,
        ]);
      }
    });
  },

  mounted: async function () {
    if (!getToken()) {
      this.name = null;
      this.type = null;
      return;
    }

    [this.name, this.type] = await decodeToken().then((obj) => [
      obj.name,
      obj.type,
    ]);
  },
};
</script>
