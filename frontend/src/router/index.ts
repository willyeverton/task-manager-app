import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import TaskNew from '../components/TaskNew.vue';
import store from '../store';

const routes = [
    { path: '/', name: 'HomeView', component: HomeView },
    { path: '/login', name: 'LoginView', component: LoginView },
    { path: '/register', name: 'RegisterView', component: RegisterView },
    { path: '/task/new', name: 'TaskNew', component: TaskNew, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next({ name: 'LoginView' });
    } else {
        next();
    }
});

export default router;
