// router/index.js
import { createRouter, createWebHistory } from 'vue-router'; 
import HomeView from '@/views/HomeView.vue';
import SchedulerDashboard from '@/views/SchedulerDashboard.vue';
import AdminDashboard from '@/views/AdminDashboard.vue';
import ContactUs from '@/views/ContactUs.vue'
import WhoWeAre from '@/views/WhoWeAre.vue'


// Define routes
const routes = [
  { path: '/', component: HomeView },
  { path: '/scheduler', component: SchedulerDashboard },
  { path: '/admin', component: AdminDashboard },
  { path: '/contact-us', component: ContactUs },
  { path: '/who-we-are', component: WhoWeAre },

];

// Create the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), 
  routes
});

export default router;
