import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '../../stores/userStore'
import UserStats from '../UserStats.vue'

// Mock do Chart.js para evitar erros de DOM
vi.mock('chart.js', () => {
  const Chart = vi.fn()
  Chart.register = vi.fn()
  return {
    Chart,
    Title: vi.fn(),
    Tooltip: vi.fn(),
    Legend: vi.fn(),
    ArcElement: vi.fn(),
    CategoryScale: vi.fn(),
    registerables: []
  }
})

// Mock do vue-chartjs
vi.mock('vue-chartjs', () => ({
  Pie: {
    name: 'Pie',
    props: ['data', 'options'],
    template: '<div data-test="pie-chart"></div>'
  }
}))

describe('UserStats', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  const mockUsers = [
    { nome: 'User 1', estado: 'SP', cidade: 'São Paulo', origem: 'digital' },
    { nome: 'User 2', estado: 'RJ', cidade: 'Rio de Janeiro', origem: 'fisico' },
    { nome: 'User 3', estado: 'SP', cidade: 'Campinas', origem: 'digital' }
  ]

  it('renderiza o componente com dados', async () => {
    const wrapper = mount(UserStats, {
      global: {
        plugins: [pinia]
      }
    })

    const userStore = useUserStore()
    mockUsers.forEach(user => userStore.addUser(user))
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.layout-container').exists()).toBe(true)
    expect(wrapper.find('.charts-column').exists()).toBe(true)
    expect(wrapper.find('.users-table-container').exists()).toBe(true)
  })

  it('exibe a tabela de usuários corretamente', async () => {
    const wrapper = mount(UserStats, {
      global: {
        plugins: [pinia]
      }
    })

    const userStore = useUserStore()
    mockUsers.forEach(user => userStore.addUser(user))
    await wrapper.vm.$nextTick()

    const rows = wrapper.findAll('.users-table tbody tr')
    expect(rows.length).toBe(mockUsers.length)

    const firstDataRow = rows[0]
    expect(firstDataRow.text()).toContain('User 1')
    expect(firstDataRow.text()).toContain('SP')
    expect(firstDataRow.text()).toContain('São Paulo')
    expect(firstDataRow.text()).toContain('digital')
  })

  it('calcula estatísticas corretamente', async () => {
    const wrapper = mount(UserStats, {
      global: {
        plugins: [pinia]
      }
    })

    const userStore = useUserStore()
    mockUsers.forEach(user => userStore.addUser(user))
    await wrapper.vm.$nextTick()

    const stateChartData = wrapper.vm.stateChartData
    const originChartData = wrapper.vm.originChartData

    expect(stateChartData.labels).toContain('SP')
    expect(stateChartData.labels).toContain('RJ')
    expect(stateChartData.datasets[0].data).toEqual([2, 1])

    expect(originChartData.labels).toEqual(['Digital', 'Físico'])
    expect(originChartData.datasets[0].data).toEqual([2, 1])
  })

  it('atualiza os gráficos quando os dados mudam', async () => {
    const wrapper = mount(UserStats, {
      global: {
        plugins: [pinia]
      }
    })

    const userStore = useUserStore()
    mockUsers.forEach(user => userStore.addUser(user))
    await wrapper.vm.$nextTick()

    const newUser = { nome: 'User 4', estado: 'SP', cidade: 'Santos', origem: 'digital' }
    userStore.addUser(newUser)
    await wrapper.vm.$nextTick()

    const stateChartData = wrapper.vm.stateChartData
    expect(stateChartData.datasets[0].data[stateChartData.labels.indexOf('SP')]).toBe(3)
  })
})