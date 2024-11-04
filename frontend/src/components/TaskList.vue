<template>
    <div class="task-list">
        <h2>Tasks</h2>
        <router-link to="/task/new">Create New Task</router-link>
        <ul>
            <li v-for="task in tasks" :key="task.id">
                <TaskItem :task="task" @deleteTask="handleDeleteTask" />
            </li>
        </ul>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import TaskItem from './TaskItem.vue';
import { getAllTasks, deleteTask } from '../services/taskService';
import { Task } from '@/types/Task';

export default defineComponent({
    name: 'TaskList',
    components: { TaskItem },
    setup() {
        const tasks = ref<Task[]>([]);

        onMounted(async () => {
            try {
                tasks.value = await getAllTasks();
            } catch (error) {
                alert('Failed to load tasks');
            }
        });

        const handleDeleteTask = async (taskId: string) => {
            try {
                await deleteTask(taskId);
                tasks.value = tasks.value.filter(task => task.id !== taskId);
            } catch (error) {
                alert('Failed to delete task');
            }
        };

        return {
            tasks,
            handleDeleteTask,
        };
    },
});
</script>
  
<style scoped lang="scss">
.task-list {
    ul {
        list-style-type: none;
        padding: 0;

        li {
            margin-bottom: 1rem;
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
  