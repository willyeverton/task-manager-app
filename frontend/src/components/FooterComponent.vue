<template>
    <footer class="footer">
        <p>&copy; 2024 Task Manager. All rights reserved.</p>
    </footer>
</template>

<script lang="ts">
export default {
    name: 'FooterComponent',
};
</script>

<style scoped lang="scss">
.footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 1rem;
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>