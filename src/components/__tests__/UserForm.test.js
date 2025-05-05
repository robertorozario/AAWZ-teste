import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '../../stores/userStore'
import UserForm from '../UserForm.vue'
import axios from 'axios'

vi.mock('axios')

describe('UserForm', () => {
    let pinia

    beforeEach(() => {
        pinia = createPinia()
        setActivePinia(pinia)
    })

    it('renderiza todos os campos do formulário', () => {
        const wrapper = mount(UserForm)
        
        expect(wrapper.find('#nome').exists()).toBe(true)
        expect(wrapper.find('#email').exists()).toBe(true)
        expect(wrapper.find('#cep').exists()).toBe(true)
        expect(wrapper.find('.cep-group button').exists()).toBe(true)
    })

    it('valida campos obrigatórios', async () => {
        const wrapper = mount(UserForm)
        
        await wrapper.find('form').trigger('submit.prevent')
        
        expect(wrapper.text()).toContain('Todos os campos são obrigatórios')
    })

    it('busca CEP quando o botão é clicado', async () => {
        axios.get.mockResolvedValueOnce({
        data: {
            logradouro: 'Rua Teste',
            localidade: 'Cidade Teste',
            uf: 'SP'
        }
        })

        const wrapper = mount(UserForm)

        await wrapper.find('#cep').setValue('12345678')
        await wrapper.find('.cep-group button').trigger('click')

        expect(axios.get).toHaveBeenCalledWith('https://viacep.com.br/ws/12345678/json/')
        
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.formData.endereco).toBe('Rua Teste')
        expect(wrapper.vm.formData.cidade).toBe('Cidade Teste')
        expect(wrapper.vm.formData.estado).toBe('SP')
    })

    it('adiciona usuário ao store quando o formulário é submetido', async () => {
        const wrapper = mount(UserForm, {
            global: {
                plugins: [pinia]
            }
        })
        
        await wrapper.vm.$nextTick()
    
        const userData = {
            nome: 'Teste Usuario',
            email: 'teste@email.com',
            cep: '12345678',
            endereco: 'Rua Teste',
            numero: '123',
            cidade: 'Cidade Teste',
            estado: 'SP',
            origem: 'digital'
        }
    
        await wrapper.find('#nome').setValue(userData.nome)
        await wrapper.find('#email').setValue(userData.email)
        await wrapper.find('#cep').setValue(userData.cep)
        await wrapper.find('#endereco').setValue(userData.endereco)
        await wrapper.find('#numero').setValue(userData.numero)
        await wrapper.find('#cidade').setValue(userData.cidade)
        await wrapper.find('#estado').setValue(userData.estado)
        await wrapper.find('#origem').setValue(userData.origem)
    
        await wrapper.find('form').trigger('submit.prevent')
    
        const userStore = useUserStore()
        expect(userStore.users).toContainEqual(expect.objectContaining(userData))
    })

    it('mostra erro quando CEP é inválido', async () => {
        axios.get.mockRejectedValueOnce(new Error('CEP não encontrado'))

        const wrapper = mount(UserForm)
        await wrapper.find('#cep').setValue('00000000')
        await wrapper.find('.cep-group button').trigger('click')

        await wrapper.vm.$nextTick()
        expect(wrapper.find('.error-message').text()).toBe('Erro ao buscar CEP')
    })
})