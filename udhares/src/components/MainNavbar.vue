<template>
  <nav class = "navbar">
    <router-link to="/" class="navbar-brand">
      <img :src="logoSrc" alt="Udhares Logo" class="logo" />
    </router-link>

    <ul class="nav-list">
      <li><router-link to="/client" class="nav-item">Client Dashboard</router-link></li>
      <li><router-link to="/scheduler" class="nav-item">Scheduler Dashboard</router-link></li>
      <li><router-link to="/admin" class="nav-item">Admin Dashboard</router-link></li>
      <li><router-link to="/contact-us" class="nav-item">Contact Us</router-link></li>
      <li><router-link to="/who-we-are" class="nav-item">Who we are</router-link></li>
    </ul>
    <div class="icon">
      <i @click="toggleMobileNav" v-show="mobile" class="far fa-bars" :class="{'icon-active': mobileNav}"></i>
    </div>
    <transition name="mobile-nav">
      <ul v-show="mobileNav" class="dropdown_nav">
        <li><router-link to="/scheduler" class="nav-item">Scheduler Dashboard</router-link></li>
        <li><router-link to="/admin" class="nav-item">Admin Dashboard</router-link></li>
        <li><router-link to="/contact-us" class="nav-item">About</router-link></li>
        <li><router-link to="/who-we-are" class="nav-item">Who we are</router-link></li>
      </ul>
    </transition>
  </nav>
</template>

<script>
export default {
  name: 'MainNavbar',
  computed: {
      logoSrc() {
        return require('@/assets/logo.png');
      }
    }
  }
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff; /* Or any color based on your design */
  padding: 1rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo {
  height: 30px; /* Adjust based on your design */
}

.nav-list {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-left: 2rem;
  text-decoration: none;
  color: #000; /* Color based on your design */
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #555; /* Color for hover effect */
  cursor: pointer; /* Indicate clickable element */
}
</style>
