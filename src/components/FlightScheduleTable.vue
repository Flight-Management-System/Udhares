<template>
  <v-container>
    <!-- Row for Buttons -->
    <v-row class="align-center my-3">
      <!-- Generate Schedule Button on the Left -->
      <v-col cols="auto">
        <v-btn class="generate-schedule-btn" @click="generateSchedule">
          Generate Schedule
        </v-btn>
      </v-col>

      <!-- Spacer to push Navigation Buttons to center -->
      <v-spacer></v-spacer>

      <!-- Navigation Buttons Centered -->
      <v-col cols="auto" class="d-flex justify-center">
        <v-btn @click="moveDate(-1)" icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn class="today-button" @click="setToday">
          Today
        </v-btn>
        <v-btn @click="moveDate(1)" icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
      
      <!-- Additional Spacer for balancing -->
      <v-spacer></v-spacer>
      <v-btn @click="openDialog">Add Flight</v-btn>
      <v-btn >Remove Flight</v-btn>
    </v-row>
    <v-dialog v-model="dialogVisible" max-width="500px">
    <v-card>
      <v-container>
      <v-card-title class="headline">Add a New Flight</v-card-title>
      
      <v-text-field v-model="flightNumber" label="Flight Number"></v-text-field>

      <v-card-text>
        </v-card-text> 
        <v-text-field v-model="flightTrip" label="Flight Trip"></v-text-field>
        
        <v-menu v-model="deptDateMenu" absolute top="10" left="0" :close-on-content-click="false" :nudge-right="40" transition="scale-transition">
              <template v-slot:activator="{ attrs, on }">
                <v-text-field
                  v-model="computedDeptTime"
                  label="Departure Time"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  @click="deptDateMenu = true"
                ></v-text-field>
              </template>
              <v-date-picker v-model="deptDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="deptDateMenu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.deptPicker.save(deptDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>

            <v-menu v-model="arrDateMenu" :close-on-content-click="false" absolute :nudge-right="40" transition="scale-transition">
            <template v-slot:activator="{ attrs, on }">
              <v-text-field
                v-model="computedArrTime"
                label="Arrival Time"
                readonly
                v-bind="attrs"
                v-on="on"
                @click="arrDateMenu = true"
              ></v-text-field>
            </template>
            <v-date-picker v-model="arrDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="arrDateMenu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.arrPicker.save(arrDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-select 
          v-model="departureLocation" 
          :items="locations" 
          item-value="id" 
          item-text="name" 
          label="Departure Location"
        ></v-select>

        <v-select 
          v-model="arrivalLocation" 
          :items="locations" 
          item-value="id" 
          item-text="name" 
          label="Arrival Location"
        ></v-select>
        <v-text-field
          v-model="requiredFuel"
          label="Required Fuel (litres)"
          type="number"  
          :suffix="litres"
        ></v-text-field>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="submitFlight">Submit</v-btn>
          

      </v-card-actions>
    </v-card>
  </v-dialog>
    <!-- Gantt Chart -->
    <g-gantt-chart
      :chart-start="chartStart"
      :chart-end="chartEnd"
      precision="hour"
      color-scheme="default"
      width="100%"
      row-height="60"
      bar-start="myBeginDate"
      bar-end="myEndDate"
    >
      <g-gantt-row
        v-for="(aircraft, index) in aircraftRows"
        :key="index"
        :label="aircraft.label"
        :bars="aircraft.bars"
      >
        <template #bar="{ bar }">
          <div
            :click-bar="() => showPassengerDetails(bar)"
            :style="{
              width: '100%', 
              height: '100%', 
              background: bar.ganttBarConfig.style.background,
              borderRadius: bar.ganttBarConfig.style.borderRadius,
              color: bar.ganttBarConfig.style.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }"
          >
            {{ bar.ganttBarConfig.label }}
          </div>
        </template>
      </g-gantt-row>
    </g-gantt-chart>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { startOfDay, addDays, format } from 'date-fns'
import axios from 'axios'
import moment from 'moment'

const currentDate = ref(startOfDay(new Date()))  // Set to current day initially

const aircraftRows = ref([])

const chartStart = computed(() => format(currentDate.value, 'yyyy-MM-dd 04:00'))
const chartEnd = computed(() => format(currentDate.value, 'yyyy-MM-dd 19:00'))

const setToday = () => {
  currentDate.value = startOfDay(new Date())
}
const dialogVisible = ref(false);
const flightName = ref('');
const destination = ref('');
const flightTrip = ref('');
const flightNumber = ref('');
const requiredFuel = ref(''); 

function openDialog() {
    dialogVisible.value = true;
}

function closeDialog() {
    dialogVisible.value = false;
}

function submitFlight() {
    console.log("Flight Name:", flightName.value);
    console.log("Destination:", destination.value);
    closeDialog(); 
}

const deptDateMenu = ref(false);
const deptDate = ref(null); 
const computedDeptTime = computed(() => 
  deptDate.value ? moment(deptDate.value).format('YYYY-MM-DD HH:mm') : ''
);

const arrDateMenu = ref(false);
const arrDate = ref(null); 
const computedArrTime = computed(() => 
  arrDate.value ? moment(arrDate.value).format('YYYY-MM-DD HH:mm') : ''
);

function moveDate(days) {
  currentDate.value = addDays(currentDate.value, days)
}

function showPassengerDetails(bar) {
  console.log("Clicked bar:", bar);
  alert(`Flight ${bar.ganttBarConfig.label} has ${bar.passengers} passengers.`);
}

onMounted(async () => {
  await fetchAircraftData();
});

async function fetchAircraftData() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/aircrafts')
    const staticFlights = [
      {
        myBeginDate: '2024-04-24 09:00',
        myEndDate: '2024-04-24 11:00',
        color: '#FF6384',
        passengers: 180,
        label: '778 - FES to LTK'
      },
      {
        myBeginDate: '2024-04-24 13:00',
        myEndDate: '2024-04-24 15:00',
        color: '#36A2EB',
        passengers: 220,
        label: '249 - LTK to JFK'
      }
    ];

    aircraftRows.value = response.data.map(aircraft => ({
      label: aircraft.reg_no,
      bars: staticFlights.map(flight => ({
        ...flight,
        id: `${aircraft.reg_no}-${flight.label}`,
        ganttBarConfig: {
            id: `${aircraft.reg_no}-${flight.label}`,
            label: flight.label,
            hasHandles: false,
            style: {
                background: flight.color,
                borderRadius: '5px',
                color: 'white'
            }
        }
      }))
    }));
  } catch (error) {
    console.error('Failed to fetch aircraft data:', error);
  }
}
</script>

<style scoped>
.v-container {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
}

.v-btn {
  display: flex;
  align-self: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
  color: black;
  margin: 0 10px;
  background-color: #ffffff; 
}

.today-button {
  background-color: #0a8cfec5; /* Classy blue */
  color: white;
}
</style>
