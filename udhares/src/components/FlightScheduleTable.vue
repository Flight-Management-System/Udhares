<template>
  <div>
    <h1>Flight Schedule</h1>
    <div class="aircraft-table">
      <div v-for="aircraft in aircrafts" :key="aircraft.id">
        <h2>{{ aircraft.name }}</h2>
        <table>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Departure</th>
              <th>STD</th>
              <th>Arrival</th>
              <th>STA</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="flight in aircraft.flights" :key="flight.id" @click="showFlightDetails(flight)">
              <td>{{ flight.flightNumber }}</td>
              <td>{{ flight.departure }}</td>
              <td>{{ flight.std }}</td>
              <td>{{ flight.arrival }}</td>
              <td>{{ flight.sta }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="selectedFlight">
      <!-- Flight details popup -->
      <!-- You can customize the layout and content of the popup here -->
      <div class="popup">
        <h2>{{ selectedFlight.flightNumber }} Details</h2>
        <p>Departure: {{ selectedFlight.departure }}</p>
        <p>STD: {{ selectedFlight.std }}</p>
        <p>Arrival: {{ selectedFlight.arrival }}</p>
        <p>ATA: {{ selectedFlight.sta }}</p>
        <button @click="closeSelectedFlightPopup">Close</button>
        <!-- You can also load passenger details here -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aircrafts: [
        {
          id: 1,
          name: 'Aircraft 1',
          flights: [
            { id: 1, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' },
            { id: 2, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' },
            { id: 1, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' },
            { id: 2, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' },
            { id: 2, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' },
            { id: 1, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' },
            { id: 2, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' },
            { id: 2, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' }
            // Add more flights for Aircraft 1 as needed
          ]
        },
        {
          id: 2,
          name: 'Aircraft 2',
          flights: [
            { id: 1, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' },
            { id: 2, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' }
            // Add more flights for Aircraft 1 as needed
          ]
        },
        {
          id: 3,
          name: 'Aircraft 3',
          flights: [
            { id: 1, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' },
            { id: 2, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' },
            { id: 2, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' }
            // Add more flights for Aircraft 1 as needed
          ]
        },
        {
          id: 4,
          name: 'Aircraft 4',
          flights: [
            { id: 1, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' },
            { id: 2, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' }
            // Add more flights for Aircraft 1 as needed
          ]
        },
        {
          id: 5,
          name: 'Aircraft 5',
          flights: [
            { id: 1, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' },
            { id: 2, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' },
            { id: 1, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' },
            { id: 2, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' },
            { id: 2, flightNumber: 'F1000', departure: 'ABC', std: '07:00', arrival: 'DEF', sta: '08:00' }
            // Add more flights for Aircraft 1 as needed
          ]
        },
        // Add more aircrafts as needed
      ],
      selectedFlight: null
    };
  },
  methods: {
    showFlightDetails(flight) {
      this.selectedFlight = flight;
      // You can fetch and display passenger details here
    },
    closeSelectedFlightPopup() {
      this.selectedFlight = null;
    }
  }
};
</script>

<style scoped>
/* Add your custom styles here */
.aircraft-table {
  display: flex;
  flex-wrap: wrap; /* Wrap tables if needed */
}
/* Light blue color scheme */
.aircraft-table table {
  /* Adjust width as needed for side-by-side layout */
  width: calc(50% - 10px); /* Example: 50% width with 10px margin */
  margin: 0 5px 5px 0; /* Margin for spacing */
}

.aircraft-table th,
.aircraft-table td {
  border: 1px solid #7eb5d2; /* Light blue border color */
  padding: px;
  text-align: left;
  
}

.popup {
  position: fixed; /* Make popup fixed to viewport */
  top: calc(50vh - 100px); /* Center vertically with offset */
  left: calc(50vw - 150px); /* Center horizontally with offset */
  transform: translate(-50%, -50%); /* Center popup within viewport */
  background: #fff;
  padding: 20px;
  border: 1px solid #7eb5d2; /* Light blue border color */
  /* Add draggable styles (optional) */
}
</style>
