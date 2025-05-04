import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  getters: {
    getUsersByState: (state) => {
      const stateDistribution = {}
      state.users.forEach(user => {
        if (stateDistribution[user.estado]) {
          stateDistribution[user.estado]++
        } else {
          stateDistribution[user.estado] = 1
        }
      })
      return stateDistribution
    },
    getUsersByOrigin: (state) => {
      const originDistribution = {
        digital: 0,
        fisico: 0
      }
      state.users.forEach(user => {
        originDistribution[user.origem]++
      })
      return originDistribution
    },
    getAllUsers: (state) => state.users
  },
  actions: {
    addUser(user) {
      this.users.push(user)
    }
  }
})