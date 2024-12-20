<script lang="ts">
export default {
  data() {
    return {
      search: "",
    };
  },
};
</script>

<template>
  <div class="card">
    Location
    <v-text-field
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
    ></v-text-field>
  </div>
</template>

<style scoped></style>
