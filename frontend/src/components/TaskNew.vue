<template>
    <div class="task-new">
        <h2>Create New Task</h2>
        <TaskForm />
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import TaskForm from './TaskForm.vue';

export default defineComponent({
    name: 'TaskNew',
    components: { TaskForm },
});
</script>
  
<style scoped lang="scss">
.task-new {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;

    h2 {
        margin-bottom: 1rem;
    }
}
</style>
  