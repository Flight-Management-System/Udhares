<template>
    <v-container fluid class="pa-0 white">
      <v-row class="fill-height" no-gutters>
        <v-col class="text-center">
          <header class="py-10">
            <h1 class="display-1 font-weight-regular black--text"></h1>   <!-- Header to be added if required -->
          </header>
          <section class="mb-10">
            <h2 class="headline font-weight-light black--text">Get In Touch</h2>
            <p class="subtitle-1 font-weight-regular black--text">
              We're here to help and answer any question you might have. We look forward to hearing from you.
            </p>
            <v-list class="my-6" dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large>mdi-phone</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="headline">Phone</v-list-item-title>
                  <v-list-item-subtitle class="subtitle-1">+123 456 7890</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
 
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large>mdi-email</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="headline">Email</v-list-item-title>
                  <v-list-item-subtitle class="subtitle-1">contact@example.com</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon large>mdi-map-marker</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="headline">Location</v-list-item-title>
                  <v-list-item-subtitle class="subtitle-1">123 Example Street, City, Country</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </section>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'ContactUs'
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
  }
  
  .v-list-item-icon {
    margin-right: 16px;
  }
  
  .v-icon.large {
    font-size: 2rem;
  }

  .v-list {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .v-list-item {
    padding: 15px
  }
  </style>
  