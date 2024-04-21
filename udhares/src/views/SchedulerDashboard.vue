<template>
  <div>
    <FlightScheduleTable />
  </div>
</template>

<script>
import FlightScheduleTable from '@/components/FlightScheduleTable.vue';

export default {
  name: 'SchedulerDashboard',
  components: {
    FlightScheduleTable,
  },
  // Other component options...
}
</script>

<!-- Add any necessary styles -->
<style scoped>
/* Add scoped styles for the SchedulerDashboard component */
</style>
