<template>
    <nav class="navbar">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/task/new" v-if="isAuthenticated" class="nav-item">Create Task</router-link>
        <router-link to="/login" v-if="!isAuthenticated" class="nav-item">Login</router-link>
        <router-link to="/register" v-if="!isAuthenticated" class="nav-item">Register</router-link>
        <button v-if="isAuthenticated" @click="logout" class="nav-item">Logout</button>
    </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { logout as logoutService } from '../services/authService';

export default defineComponent({
    name: 'NavbarComponent',
    setup() {
        const store = useStore();
        const router = useRouter();

        const isAuthenticated = computed(() => store.getters.isAuthenticated);

        const logout = async () => {
            await logoutService();
            store.dispatch('logout');
            router.push('/login');
        };

        return {
            isAuthenticated,
            logout,
        };
    },
});
</script>

<style scoped lang="scss">
.navbar {
    background-color: #333;
    padding: 1rem;
    display: flex;
    justify-content: space-between;

    .nav-item {
        color: #fff;
        margin: 0 1rem;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    button.nav-item {
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 1rem;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>