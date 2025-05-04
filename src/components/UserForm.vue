<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import axios from 'axios'

const userStore = useUserStore()

const ufs = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]


const formData = ref({
  nome: '',
  email: '',
  cep: '',
  cidade: '',
  endereco: '',
  numero: '',
  complemento: '',
  estado: '',
  origem: 'digital'
})

const loading = ref(false)
const error = ref('')

async function buscarCep() {
  if (formData.value.cep.length !== 8) {
    error.value = 'CEP deve ter 8 dígitos'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${formData.value.cep}/json/`)
    if (response.data.erro) {
      error.value = 'CEP não encontrado'
      return
    }
    formData.value.cidade = response.data.localidade
    formData.value.endereco = response.data.logradouro
    formData.value.estado = response.data.uf
  } catch (e) {
    error.value = 'Erro ao buscar CEP'
  } finally {
    loading.value = false
  }
}

function handleSubmit() {
    if (!formData.value.nome || !formData.value.email || !formData.value.cep || !formData.value.endereco || !formData.value.cidade) {
        error.value = 'Todos os campos são obrigatórios'
        return
    }

    userStore.addUser({
        ...formData.value
    })
    formData.value = {
        nome: '',
        email: '',
        cep: '',
        cidade: '',
        endereco: '',
        numero: '',
        complemento: '',
        estado: '',
        origem: 'digital'
    }
    error.value = ''
}
</script>

<template>
    <div class="form-container">
        <h3 align="center">Desafio front-end - Roberto Henrique Rozário</h3>
        <form @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="nome">*Nome:</label>
            <input id="nome" v-model="formData.nome" type="text" required>
        </div>

        <div class="form-group">
            <label for="email">*E-mail:</label>
            <input id="email" v-model="formData.email" type="email" required>
        </div>

        <div class="form-group">
            <label for="cep">*CEP:</label>
            <div class="cep-group">
            <input id="cep" v-model="formData.cep" type="text" maxlength="8" @blur="buscarCep" required>
            <button type="button" @click="buscarCep" :disabled="loading">Buscar CEP</button>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="numero">*Cidade:</label>
                <input id="numero" v-model="formData.cidade" type="text">
            </div>
            <div class="form-group">
                <label for="estado">*Estado:</label>
                <select id="estado" v-model="formData.estado" required>
                <option value="">Selecione um estado</option>
                <option v-for="uf in ufs" :key="uf" :value="uf">{{ uf }}</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label for="endereco">*Endereço:</label>
            <input id="endereco" v-model="formData.endereco" type="text" required>
        </div>

        <div class="form-row">
            <div class="form-group">
            <label for="numero">Número:</label>
            <input id="numero" v-model="formData.numero" type="text">
            </div>

            <div class="form-group">
            <label for="complemento">Complemento:</label>
            <input id="complemento" v-model="formData.complemento" type="text">
            </div>
        </div>

        <div class="form-group">
            <label for="origem">Origem:</label>
            <select id="origem" v-model="formData.origem">
            <option value="digital">Digital</option>
            <option value="fisico">Físico</option>
            </select>
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>

        <button type="submit" class="submit-button">Cadastrar</button>
        </form>
    </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  background-color: white;
  color: black;
  border-radius: 4px;
}

.cep-group {
  display: flex;
  gap: 10px;
}

.cep-group input {
  flex: 1;
}

.cep-group button {
  padding: 8px 15px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cep-group button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-bottom: 15px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #1976D2;
}
</style>