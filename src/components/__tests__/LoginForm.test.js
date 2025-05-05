import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../LoginForm.vue'

describe('LoginForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renderiza corretamente', () => {
    const wrapper = mount(LoginForm)
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('redireciona para /stats com credenciais corretas', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/stats', name: 'stats' }]
    })
    const push = vi.spyOn(router, 'push')

    const wrapper = mount(LoginForm, {
      global: {
        plugins: [router]
      }
    })
    
    await wrapper.find('#email').setValue('admin@example.com')
    await wrapper.find('#password').setValue('admin123')
    
    await wrapper.find('form').trigger('submit.prevent')
    
    expect(push).toHaveBeenCalledWith('/stats')
  })

  it('mostra mensagem de erro para credenciais inválidas', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/stats', name: 'stats' }]
    })

    const wrapper = mount(LoginForm, {
      global: {
        plugins: [router]
      }
    })
    
    await wrapper.find('#email').setValue('wrong@email.com')
    await wrapper.find('#password').setValue('wrongpass')
    await wrapper.find('form').trigger('submit.prevent')
    
    expect(wrapper.text()).toContain('Credenciais inválidas')
  })
})