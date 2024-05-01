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
      <v-spacer></v-spacer>
    </v-row>

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
import axios from 'axios'

const currentDate = ref(startOfDay(new Date()))  // Set to current day initially

const aircraftRows = ref([])

const chartStart = computed(() => format(currentDate.value, 'yyyy-MM-dd 04:00'))
const chartEnd = computed(() => format(currentDate.value, 'yyyy-MM-dd 19:00'))

const setToday = () => {
  currentDate.value = startOfDay(new Date())
}

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
