<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="app-container">
    <NavBar />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #333;
  color: #f0f2f5;
}

.app-container {
  height: 50%;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 20px;
}
</style>
