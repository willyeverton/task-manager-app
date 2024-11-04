<template>
    <div class="task-item">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <p>Status: {{ task.status }}</p>
        <p>Due Date: {{ new Date(task.dueDate).toLocaleDateString() }}</p>
        <button @click="$emit('deleteTask', task.id)">Delete</button>
    </div>
</template>

<script lang="ts">
import { Task } from '@/types/Task';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'TaskItem',
    props: {
        task: {
            type: Object as PropType<Task>,
            required: true,
        },
    },
});
</script>

<style scoped lang="scss">
.task-item {
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    background-color: #fff;

    h3 {
        margin: 0 0 0.5rem 0;
    }

    p {
        margin: 0.5rem 0;
    }

    button {
        padding: 0.5rem 1rem;
        background-color: #ff4d4d;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: #e60000;
        }
    }

    a {
        margin-right: 1rem;
        color: #007bff;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>