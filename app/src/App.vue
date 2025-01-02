<script lang="ts">
import { defineComponent } from "vue";
import Home from "./views/Home.vue";
export default defineComponent({
  components: {
    Home,
  },
});
</script>

<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <v-app-bar title="Weather Guru ⛅"></v-app-bar>

      <v-main class="d-flex justify-center">
        <Home />
      </v-main>
    </v-layout>
  </v-app>
</template>
