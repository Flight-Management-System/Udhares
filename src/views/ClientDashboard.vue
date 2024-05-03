<template>
  <v-container>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>CLIENT DASHBOARD</v-toolbar-title>
      </v-toolbar>
      <div class="d-flex flex-row">
        <v-tabs
          v-model="tab"
          color="primary"
          direction="vertical"
          background-color="grey lighten-4"
        >
          <v-tab value="add-booking">
            <v-icon start>
              mdi-plus-circle
            </v-icon>
            Add Booking
          </v-tab>
          <v-tab value="passenger-wait-list">
            <v-icon start>
              mdi-account-clock
            </v-icon>
            Wait List
          </v-tab>
          <v-tab value="passenger-booked-list">
            <v-icon start>
              mdi-account-check
            </v-icon>
            Booked Passengers
          </v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="add-booking">
            <AddBooking />
          </v-window-item>
          <v-window-item value="passenger-wait-list">
            <PassengerWaitList />
          </v-window-item>
          <v-window-item value="passenger-booked-list">
            <PassengerBookedList />
          </v-window-item>
        </v-window>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import AddBooking from '@/components/AddBooking.vue';
import PassengerWaitList from '@/components/PassengerWaitList.vue';
import PassengerBookedList from '@/components/PassengerBookedList.vue';

export default {
  name: 'ClientDashboard',
  components: {
    AddBooking,
    PassengerWaitList,
    PassengerBookedList,
  },
  data() {
    return {
      tab: 'add-booking', // default tab
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
  flex-grow: 1;  /* Allows the card to fill the container */
  width: 100%;  /* Use the full width of the container */
  height: auto;  /* Let the height be determined by the content */
  overflow: hidden;  
}

.v-tab-item, .v-window-item {
  overflow: auto; 
}
</style>
