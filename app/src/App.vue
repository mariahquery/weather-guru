<script lang="ts">
import { defineComponent } from "vue";
import { axiosInstance } from "../src/axios-auth";

interface Location {
  name: string;
  country: string;
}

export default defineComponent({
  data() {
    return {
      search: "",
      selectedSuggestion: "",
      locationsSuggestions: [] as string[],
      loading: false,
      data: {} as {
        name?: string;
        current?: {
          feelslike_c?: number;
          temp_c?: number;
          condition?: { icon?: string };
        };
        location?: {
          name?: string;
          country?: string;
          region?: string;
        };
      },
      has_data: false,
    };
  },
  methods: {
    searchAutoComplete() {
      axiosInstance
        .get("v1/search.json", { params: { q: this.search } })
        .then((response: any) => {
          if (response.status === 200) {
            this.locationsSuggestions = response.data.map(
              (location?: Location) =>
                `${location?.name}, ${location?.country}`,
            );
          } else {
            console.error(`Unexpected response code: ${response.status}`);
          }
        })
        .catch(function (error: any) {
          console.error(error);
        });
    },
    searchLocation() {
      this.loading = true;
      axiosInstance
        .get("v1/current.json", { params: { q: this.selectedSuggestion } })
        .then((response: any) => {
          this.data = response.data;
          if (response.status === 200) {
            this.data = response.data;
            this.locationsSuggestions = [];
            this.loading = false;
            this.has_data = true;
          } else {
            console.error(`Unexpected response code: ${response.status}`);
            this.has_data = false;
            this.loading = false;
          }
        })
        .catch(function (error: any) {
          console.error(error);
        });
    },
    updateSearch(eventTargetValue: string) {
      this.search = eventTargetValue;
      this.searchAutoComplete();
    },
  },
});
</script>

<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <v-app-bar title="Weather Guru ⛅"></v-app-bar>

      <v-main class="d-flex justify-center">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <div class="d-flex justify-space-between align-center">
                <v-autocomplete
                  class="mt-4"
                  color="orange-darken-1"
                  v-model="selectedSuggestion"
                  @input="updateSearch($event.target.value)"
                  :items="locationsSuggestions"
                  label="Search City or Location"
                  variant="outlined"
                ></v-autocomplete>
                <v-btn
                  color="orange-darken-1"
                  class="ml-3 search-btn"
                  size="x-large"
                  @click="searchLocation"
                >
                  Search
                </v-btn>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12">
              <v-card class="no-data" v-if="!has_data" title="No data"></v-card>
              <v-card
                v-else
                :subtitle="`${data.location?.region}, ${data.location?.country}`"
                :text="`Feels like: ${data.current?.feelslike_c}°C`"
                :title="data.location?.name"
                :disabled="loading"
                :loading="loading"
              >
                <div class="d-flex ma-2">
                  <div class="text-h3 ml-2">{{ data.current?.temp_c }}°C</div>
                  <img
                    :src="data.current?.condition?.icon"
                    alt="Weather icon"
                  />
                </div>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <div class="bg"></div>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped>
.search-btn {
  position: relative;
  bottom: 3px;
}

.bg {
  background-image: url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 200px;
  margin-top: 25px;
}

.no-data {
  color: grey;
}
</style>
