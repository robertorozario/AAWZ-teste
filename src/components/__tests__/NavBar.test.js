import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import NavBar from '../NavBar.vue'

describe('NavBar', () => {
  let router
  let pinia

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', name: 'home' },
        { path: '/stats', name: 'stats' },
        { path: '/login', name: 'login' }
      ]
    })
    pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renderiza links de navegação corretamente quando não autenticado', () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router, pinia]
      }
    })
    
    expect(wrapper.find('.nav-links').exists()).toBe(true)
    expect(wrapper.find('a[href="/"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/login"]').exists()).toBe(true)
    expect(wrapper.find('.logout-button').exists()).toBe(false)
  })

  it('renderiza links corretamente quando autenticado', async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router, pinia]
      }
    })

    const authStore = useAuthStore()
    authStore.isAuthenticated = true
    await wrapper.vm.$nextTick()

    expect(wrapper.find('a[href="/stats"]').exists()).toBe(true)
    expect(wrapper.find('.logout-button').exists()).toBe(true)
  })

  it('executa logout e redireciona ao clicar no botão de sair', async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router, pinia]
      }
    })

    const authStore = useAuthStore()
    authStore.isAuthenticated = true
    await wrapper.vm.$nextTick()

    const push = vi.spyOn(router, 'push')
    await wrapper.find('.logout-button').trigger('click')

    expect(authStore.isAuthenticated).toBe(false)
    expect(push).toHaveBeenCalledWith('/login')
  })
})