// router/index.js
import { createRouter, createWebHistory } from 'vue-router'; 
import HomeView from '@/views/HomeView.vue';
import SchedulerDashboard from '@/views/SchedulerDashboard.vue';
import AdminDashboard from '@/views/AdminDashboard.vue';
import TimeLine from '@/components/TimeLine.vue'

// Define routes
const routes = [
  { path: '/', component: HomeView },
  { path: '/scheduler', component: SchedulerDashboard },
  { path: '/admin', component: AdminDashboard },
  { path: '/timeline', component: TimeLine },

];

// Create the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), 
  routes
});

export default router;
