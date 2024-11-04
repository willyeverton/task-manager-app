import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles.scss';
import apiClient from './http-common';

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');

export { apiClient };
