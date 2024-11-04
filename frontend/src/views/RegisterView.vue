<template>
    <div class="register">
        <h1>Register</h1>
        <form @submit.prevent="register">
            <div>
                <label for="email">Email:</label>
                <input type="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import apiClient from '../http-common';

export default defineComponent({
    name: 'RegisterView',
    setup() {
        const email = ref('');
        const password = ref('');
        const store = useStore();
        const router = useRouter();

        const register = async () => {
            try {
                const response = await apiClient.post('/auth/register', { email: email.value, password: password.value });
                store.dispatch('login', { token: response.data.token, user: { email: email.value } });
                router.push('/');
            } catch (error) {
                alert('Registration failed');
            }
        };

        return {
            email,
            password,
            register,
        };
    },
});
</script>

<style scoped>
/* Seu estilo aqui */
</style>