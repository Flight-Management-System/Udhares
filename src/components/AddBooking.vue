<template>
    <v-container>
      <v-form ref="form" @submit.prevent="validateAndSubmit">
        <v-autocomplete
          v-model="booking.passenger"
          :items="passengers"
          :loading="loadingPassengers"
          :[`search-input.sync`]="search"
          item-text="full_name"
          item-value="id"
          label="Passenger Passport Number"
          required
        ></v-autocomplete>
  
        <v-select
          v-model="booking.deptLocation"
          :items="locations"
          item-text="shortcode"
          item-value="id"
          label="Departure Location"
          required
        ></v-select>
  
        <v-select
          v-model="booking.arrLocation"
          :items="locations"
          item-text="shortcode"
          item-value="id"
          label="Arrival Location"
          required
        ></v-select>
  
        <v-text-field
          v-model="booking.international_flight_no"
          label="International Flight Number"
          required
        ></v-text-field>
  
        <v-btn color="blue darken-1 " type="submit">Submit</v-btn>
        <v-btn color="white" @click="addPassengerDialog = true">Add new Passenger</v-btn>
        <v-btn color="blue" @click="resetForm">Cancel</v-btn>
      </v-form>
    </v-container>
    <v-dialog v-model="addPassengerDialog" max-width="500px">
        <v-card >
          <v-card-title>Add a New Passenger</v-card-title>
          <v-card-text>
              <v-text-field v-model="newPassenger.firstName" label="First Name" required></v-text-field>
              <v-text-field v-model="newPassenger.lastName" label="Last Name" required></v-text-field>
              <v-text-field v-model="newPassenger.passportNo" label="Passport Number" required></v-text-field>
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="addPassengerDialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="saveNewPassenger">Save</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>

  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        addPassengerDialog: false,
        newPassenger: {
            firstName: '',
            lastName: '',
            passportNo: ''},
        search: null,
        loadingPassengers: false,
        passengers: [],
        locations: [],
        booking: {
            passenger: null,
            pnr: '', // Expected to be provided by the user
            deptLocation: '', // User must select
            arrLocation: '', // User must select
            allowed_weight: 20, // Default weight, adjust as necessary
            is_active: 1, // Default to active
            is_going_abroad: 0, // Default to not going abroad
            is_coming_from_abroad: 0, // Default to not coming from abroad
            international_flight_no: '', // Optional, provided by user if applicable
        }
      };
    },
    watch: {
      search(newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
          this.fetchPassengers(newValue);
        }
      }
    },
    created() {
      this.fetchLocations();
    },
    methods: {
      fetchPassengers(query) {
        if (query.length < 3) return; // Prevent too broad searches
        this.loadingPassengers = true;
        axios.get(`http://127.0.0.1:8000/api/passengers/search?q=${query}`)
          .then(response => {
            this.passengers = response.data.map(passenger => ({
              id: passenger.id,
              full_name: `${passenger.first_name} ${passenger.last_name}`,
              passport_no: passenger.passport_no
            }));
          })
          .catch(error => {
            console.error("Failed to fetch passengers:", error);
          })
          .finally(() => {
            this.loadingPassengers = false;
          });
      },
      fetchLocations() {
        axios.get('http://127.0.0.1:8000/api/locations')
          .then(response => {
            this.locations = response.data.map(location => ({
              id: location.id,
              shortcode: location.shortcode
            }));
          })
          .catch(error => {
            console.error("Failed to fetch locations:", error);
          });
      },
      checkPassenger(value) {
        if (!value || this.passengers.some(p => p.id === value.id)) return;
        this.promptNewPassenger(value.passport_no);
      },
      promptNewPassenger(passportNo) {
        const firstName = prompt("Enter first name for new passenger:");
        const lastName = prompt("Enter last name for new passenger:");
        if (firstName && lastName) {
          axios.post('http://127.0.0.1:8000/api/passengers', {
            first_name: firstName,
            last_name: lastName,
            passport_no: passportNo
          }).then(response => {
            this.passengers.push({
              id: response.data.id,
              full_name: `${response.data.first_name} ${response.data.last_name}`,
              passport_no: response.data.passport_no
            });
            this.booking.passenger = response.data;
          }).catch(error => {
            console.error("Failed to create passenger:", error);
          });
        }
      },
      validateAndSubmit() {
        // Placeholder for form validation logic
        console.log('Submitting:', this.booking);
        this.resetForm();  // Reset form after successful submission
      },
      submitAndAddAnother() {
        this.validateAndSubmit();
        this.resetForm();
      },
      resetForm() {
        this.booking = {
          passenger: null,
          deptLocation: null,
          arrLocation: null,
          international_flight_no: ''
      };
      // Reset search field to clear the autocomplete component
      this.search = '';
    }
  }
}
</script>

<!-- booking: {

    }, -->