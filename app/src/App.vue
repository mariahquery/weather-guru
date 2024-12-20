<script lang="ts">
import { defineComponent } from "vue";
import { axiosInstance } from "../src/axios-auth";

export default defineComponent({
  data() {
    return {
      search: "",
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
    searchCity() {
      if (this.search)
        axiosInstance
          .get("v1/current.json", { params: { q: this.search } })
          .then((response: any) => {
            this.data = response.data;
            if (response.status === 200) {
              this.data = response.data;
              this.has_data = true;
            } else {
              console.error(`Unexpected response code: ${response.status}`);
              this.has_data = false;
            }
          })
          .catch(function (error: any) {
            console.error(error);
          });
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
              <v-text-field
                v-model="search"
                @update:focused="searchCity"
                label="Search city"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-card
                v-if="has_data"
                :subtitle="`${data.location?.region}, ${data.location?.country}`"
                :text="`Feels like: ${data.current?.feelslike_c}`"
                :title="data.location?.name"
              >
                <div class="d-flex ma-2">
                  <img
                    :src="data.current?.condition?.icon"
                    alt="Weather icon"
                  />
                  <div class="text-h2">
                    {{ this.data.current?.temp_c }}
                  </div>
                </div>
                <div v-if="!has_data">No data found</div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>
