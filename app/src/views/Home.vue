<script lang="ts">
import { defineComponent } from "vue";
import SearchLocation from "../components/SearchLocation.vue";

export default defineComponent({
  components: {
    SearchLocation,
  },
});
</script>

<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row>
      <v-col>
        <div class="bg"></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <SearchLocation />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.bg {
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 200px;
}
</style>
