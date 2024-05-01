<template>
  <v-container>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>ADMIN DASHBOARD</v-toolbar-title>
      </v-toolbar>
      <div class="d-flex flex-row">
        <v-tabs
          v-model="tab"
          color="primary"
          direction="vertical"
          background-color="grey lighten-4"
        >
          <v-tab value="locations">
            <v-icon start>
              mdi-map-marker
            </v-icon>
            Locations
          </v-tab>
          <v-tab value="aircrafts">
            <v-icon start>
              mdi-airplane
            </v-icon>
            Aircrafts
          </v-tab>
          <v-tab>
            <v-icon start>
              mdi-faceman
            </v-icon>
            Verify Accounts
          </v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="locations">
            <LocationsList />
          </v-window-item>
          <v-window-item value="aircrafts">
            <AircraftList />
          </v-window-item>
        </v-window>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import LocationsList from 'src/components/LocationsList.vue';
import AircraftList from '@/components/AircraftList.vue';

export default {
  name: 'AdminDashboard',
  components: {
    LocationsList,
    AircraftList,
  },
  data() {
    return {
      tab: 'locations', // default tab
    };
  },
}
</script>

<style scoped>
.d-flex {
  display: flex;
  flex: 1;
}

.v-card {
  flex-grow: 0;  /* Prevents the card from growing */
  width: 100%;  /* Specify a fixed width */
  height: 100%;  /* Specify a fixed height */
  overflow: hidden;  /* Hide overflow */
}

.v-tab-item, .v-window-item {
  overflow: auto; 
}
</style>
