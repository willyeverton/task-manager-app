<template>
  <div id="app">
    <NavbarComponent />
    <div class="content">
      <router-view></router-view>
    </div>
    <FooterComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavbarComponent from './components/NavbarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavbarComponent,
    FooterComponent,
  },
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  margin: 20px;
}

.footer {
  flex-shrink: 0;
}
</style>
