<template>
  <main>
    <section class="schedule-management">
      <h1>We are Udhares</h1>
      <p>Airline Schedule Management System</p>
    </section>
    <aside>
      <img :src="homebackgroundSrc" alt="background image" class="homebackground" />
      <v-btn variant="tonal">Active Schedule</v-btn>
    </aside>
  </main>
</template>


<script>
export default {
  name: 'HomeView',

  components: {

  },
  computed: {
      homebackgroundSrc() {
        return require('src/assets/homebackground.png');
      }
    }
  }
  ;
</script>

<style scoped>

main {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px;

}

.schedule-management{
  font-size: 2rem; /* Adjust as per your design */
}

aside img {
  /* Adjust the size as needed */
  width: 100%;
  max-width: 450px; /* Adjust as per your design */
}

aside button {
  /* Adjust the size as needed */
  width: 50%;
  max-width: 450px; /* Adjust as per your design */
}

/* Responsive design adjustments */
@media (max-width: 1000px) {
  header, main {
    flex-direction: row;
  }
}

.active-schedule {
  position: absolute; /* Positioned absolutely within the aside */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Offset the position to truly center the element */
  padding: 10px 20px; /* Add some padding */
  font-size: 16px; /* Adjust font size as needed */
  background-color: #007BFF; /* Background color of the button */
  color: white; /* Text color */
  border: none; /* No border */
  cursor: pointer; /* Pointer cursor on hover */
  border-radius: 5px; /* Rounded corners */
}
</style>


