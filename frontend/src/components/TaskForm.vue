<template>
    <div class="task-form">
        <h2>{{ isEditing ? 'Edit Task' : 'Create New Task' }}</h2>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="title">Title:</label>
                <input type="text" v-model="title" required />
            </div>
            <div>
                <label for="description">Description:</label>
                <textarea v-model="description" required></textarea>
            </div>
            <div>
                <label for="status">Status:</label>
                <select v-model="status" required>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div>
                <label for="dueDate">Due Date:</label>
                <input type="date" v-model="dueDate" required />
            </div>
            <button type="submit">{{ isEditing ? 'Update Task' : 'Create Task' }}</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createTask } from '../services/taskService';
import { Task } from '@/types/Task';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'TaskForm',
    props: {
        task: {
            type: Object as () => Task,
            default: null,
        },
    },
    setup(props) {
        const isEditing = ref(!!props.task);
        const title = ref(props.task ? props.task.title : '');
        const description = ref(props.task ? props.task.description : '');
        const status = ref(props.task ? props.task.status : 'pending');
        const dueDate = ref(props.task ? new Date(props.task.dueDate).toISOString().substring(0, 10) : '');
        const router = useRouter();

        const handleSubmit = async () => {
            const taskData = {
                title: title.value,
                description: description.value,
                status: status.value,
                dueDate: dueDate.value,
            };

            try {
                await createTask(taskData);
                router.push('/');
            } catch (error) {
                alert('Failed to save task');
            }
        };

        return {
            isEditing,
            title,
            description,
            status,
            dueDate,
            handleSubmit,
        };
    },
});
</script>

<style scoped lang="scss">
.task-form {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;

    h2 {
        margin-bottom: 1rem;
    }

    form {
        div {
            margin-bottom: 1rem;
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
        }

        input,
        textarea,
        select {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            padding: 0.75rem 1.5rem;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;

            &:hover {
                background-color: #0056b3;
            }
        }
    }
}
</style>