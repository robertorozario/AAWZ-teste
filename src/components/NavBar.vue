<script setup>
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-brand" style="margin-right: 60px;">
      <img src="../assets/logo.svg" alt="Logo" height="32px" style="margin-right: 20px;"/>
      <span>Cadastro de Usuários</span>
    </div>
    <div class="nav-links">
      <router-link to="/" class="nav-link">Cadastro</router-link>
      <template v-if="authStore.isAuthenticated">
        <router-link to="/stats" class="nav-link">Estatísticas</router-link>
        <button @click="handleLogout" class="logout-button">Sair</button>
      </template>
      <router-link v-else to="/login" class="nav-link">Login</router-link>
    </div>
  </nav>
</template>

<style scoped>

.navbar {
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #333;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 100px 20px 20px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  color: #333;
  background: #f0f2f5;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: #2196F3;
  color: white;
}

.logout-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background: #c82333;
}
</style>