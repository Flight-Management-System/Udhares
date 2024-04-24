<template>
    <v-container fluid class="pa-0 white">
      <v-row class="fill-height" no-gutters>
        <v-col class="text-center">
          <header class="py-10">
            <h1 class="display-1 font-weight-regular black--text"></h1> <!-- Header to be added if required -->
          </header>
          <section class="mb-10">
            <h2 class="headline font-weight-light black--text">Our Vision</h2>
            <p class="subtitle-1 font-weight-regular black--text">
              Udhares is flight schedule management software designed to provide a seamless, one-point solution for flight schedule and management. Our goal is to offer immediate and direct information while simplifying the complexities of navigating flight schedules.
            </p>
          </section>
          <section class="mb-10">
            <h2 class="headline font-weight-light black--text">Mission Statement</h2>
            <p class="subtitle-1 font-weight-regular black--text">
              We are committed to delivering clear and concise data to our clients. Our mission is to streamline efficiency and replace outdated methods with our comprehensive, cutting-edge software solution.
            </p>
          </section>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'WhoWeAre'
  }
  </script>
  
  <style scoped>
  .pa-0 {
    padding: 0 !important;
  }
  
  .py-10 {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
  
  .mb-10 {
    margin-bottom: 6rem;
  }
  
  .display-1 {
    font-size: 3rem;
  }
  
  .headline {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .subtitle-1 {
    font-size: 1.25rem;
    max-width: 800px; 
    margin-left: auto; 
    margin-right: auto; 
  }
  </style>
  