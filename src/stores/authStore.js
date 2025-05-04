import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null
  }),
  actions: {
    login(credentials) {
      if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
        this.isAuthenticated = true
        this.user = {
          email: credentials.email,
          name: 'Administrador'
        }
        return true
      }
      return false
    },
    logout() {
      this.isAuthenticated = false
      this.user = null
    }
  }
})