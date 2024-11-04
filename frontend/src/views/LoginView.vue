<template>
    <div class="login container">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" v-model="email" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import apiClient from '../http-common';

export default defineComponent({
    name: 'LoginView',
    setup() {
        const email = ref('');
        const password = ref('');
        const store = useStore();
        const router = useRouter();

        const login = async () => {
            try {
                const response = await apiClient.post('/auth/login', { email: email.value, password: password.value });
                store.dispatch('login', { token: response.data.token, user: { email: email.value } });
                router.push('/');
            } catch (error) {
                alert('Invalid login credentials');
            }
        };

        return {
            email,
            password,
            login,
        };
    },
});
</script>

<style scoped lang="scss">
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

button {
    background-color: #3498db;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>