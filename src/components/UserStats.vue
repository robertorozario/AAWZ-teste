<script setup>
import { useUserStore } from '../stores/userStore'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

const userStore = useUserStore()

const stateChartData = {
  labels: Object.keys(userStore.getUsersByState),
  datasets: [{
    backgroundColor: [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
      '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
    ],
    data: Object.values(userStore.getUsersByState)
  }]
}

const originChartData = {
  labels: ['Digital', 'Físico'],
  datasets: [{
    backgroundColor: ['#36A2EB', '#FF6384'],
    data: [userStore.getUsersByOrigin.digital, userStore.getUsersByOrigin.fisico]
  }]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<template>
  <div class="stats-container">
    <div class="content-wrapper">
      <div class="layout-container">
        <div class="charts-column">
          <div class="card state-card">
            <h3>Distribuição por Estado</h3>
            <div class="chart-container">
              <Pie :data="stateChartData" :options="chartOptions" />
            </div>
          </div>

          <div class="card origin-card">
            <h3>Distribuição por Origem</h3>
            <div class="chart-container">
              <Pie :data="originChartData" :options="chartOptions" />
            </div>
          </div>
        </div>

        <div class="users-table-container">
          <h3 align='center'>Usuários Cadastrados</h3>
          <table class="users-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Endereço</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Origem</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in userStore.users" :key="user.email">
                <td>{{ user.nome }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.endereco }}</td>
                <td>{{ user.cidade }}</td>
                <td>{{ user.estado }}</td>
                <td>{{ user.origem }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: black;
}

.layout-container {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.charts-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chart-container {
  height: 300px;
  position: relative;
}

.users-table-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 2;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.users-table th,
.users-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.users-table th {
  background-color: white;
  font-weight: bold;
}

.users-table tr:hover {
  background-color: #f9f9f9;
}

@media (max-width: 768px) {
  .layout-container {
    flex-direction: column;
  }
  
  .charts-column {
    width: 100%;
  }
  
  .chart-container {
    height: 250px;
  }
  
  .users-table {
    font-size: 14px;
  }
  
  .users-table th,
  .users-table td {
    padding: 8px;
  }
}
</style>