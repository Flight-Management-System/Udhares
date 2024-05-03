<template>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="bookings"
        :loading="loading"
        class="elevation-1"
        loading-text="Loading... Please wait"
      ></v-data-table>
    </v-container>
  </template>
  

  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        bookings: [],
        locations: {},
        passengers: {},
        loading: true,
        headers: [
          { title: 'ID', value: 'id' },
          { title: 'PNR', value: 'pnr' },
          { title: 'Full Name', value: 'full_name' },
          { title: 'Passport No', value: 'passport_no' },
          { title: 'Flight', value: 'flight'},
          { title: 'Departure Location', value: 'dept_location' },
          { title: 'Arrival Location', value: 'arr_location' },
          { title: 'Weight', value: 'allowed_weight' },
          { title: "Int'l Flight No", value: 'international_flight_no' },

        ]
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        this.loading = true;
        try {
          const [bookingResponse, locationResponse, passengerResponse] = await Promise.all([
            axios.get('http://127.0.0.1:8000/api/bookings'),
            axios.get('http://127.0.0.1:8000/api/locations'),
            axios.get('http://127.0.0.1:8000/api/passengers')
          ]);
  
          this.locations = locationResponse.data.reduce((acc, location) => {
            acc[location.id] = location.shortcode;
            return acc;
          }, {});
  
          this.passengers = passengerResponse.data.reduce((acc, passenger) => {
            acc[passenger.id] = {
              fullName: `${passenger.first_name} ${passenger.last_name}`,
              passportNo: passenger.passport_no
            };
            return acc;
          }, {});
  
          // Filter out bookings where 'flight' field is null
          const filteredBookings = bookingResponse.data.filter(booking => booking.flight !== null);
  
          this.bookings = filteredBookings.map(booking => ({
            ...booking,
            dept_location: this.locations[booking.dept_location] || 'Unknown',
            arr_location: this.locations[booking.arr_location] || 'Unknown',
            full_name: this.passengers[booking.passenger]?.fullName || 'Unknown',
            passport_no: this.passengers[booking.passenger]?.passportNo || 'Unknown',
          }));
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
        this.loading = false;
      },
    }
  }
  </script>
  