<template>
    <div class="home">
        <h1>Welcome, {{ user ? user.email : 'Guest' }}</h1>
        <TaskList v-if="isAuthenticated" />
        <p v-else>Please <router-link to="/login">login</router-link> to see your tasks.</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import TaskList from '../components/TaskList.vue';

export default defineComponent({
    name: 'HomeView',
    components: { TaskList },
    setup() {
        const store = useStore();
        const user = computed(() => store.getters.getUser);
        const isAuthenticated = computed(() => store.getters.isAuthenticated);

        return {
            user,
            isAuthenticated,
        };
    },
});
</script>

<style scoped lang="scss">
.home {
    .task-list {
        margin-top: 2rem;
    }
}
</style>