<template>
  <v-app>
    <main-navbar></main-navbar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
// Import the MainNavbar component
import MainNavbar from '@/components/MainNavbar.vue';

export default {
  name: 'App',
  components: {
    MainNavbar // Register the MainNavbar component
  },
  data: () => ({
    // Define reactive data properties here if needed
  }),
}
</script>