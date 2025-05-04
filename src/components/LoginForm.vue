<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const formData = ref({
  email: '',
  password: ''
})

const error = ref('')
const showPassword = ref(false)

const handleSubmit = async () => {
  error.value = ''
  const success = await authStore.login(formData.value)
  if (success) {
    router.push('/stats')
  } else {
    error.value = 'Credenciais inválidas. Use email: admin@example.com e senha: admin123'
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
    <div class="login-card">
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
            <label for="email">E-mail:</label>
            <input 
                id="email" 
                v-model="formData.email" 
                type="email" 
                required
                placeholder="admin@example.com"
            >
            </div>

            <div class="form-group">
            <label for="password">Senha:</label>
            <div class="password-input">
                <input 
                id="password" 
                v-model="formData.password" 
                :type="showPassword ? 'text' : 'password'" 
                required
                placeholder="admin123"
                >
                <button 
                type="button" 
                class="toggle-password" 
                @click="togglePassword"
                >
                <v-icon>{{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
                </button>
            </div>
            </div>

            <div v-if="error" class="error-message">{{ error }}</div>

            <button type="submit" class="login-button">Entrar</button>
        </form>
    </div>
</template>

<style scoped>
.login-card {
  background: white;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-card h2 {
  margin: 0 0 20px;
  color: #333;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  margin: 0 auto;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 15px;
  color: black;
  margin-bottom: 15px;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  color: #333;
}

.error-message {
  color: #dc3545;
  margin-bottom: 15px;
  text-align: center;
  font-size: 14px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background: #0056b3;
}
</style>