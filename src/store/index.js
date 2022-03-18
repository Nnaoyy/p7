import { createStore } from 'vuex'

export default createStore({
  state: {
    menu : false
  },
  getters: {
  },
  mutations: {
    menu_on(state) {
      state.menu = true
    },
    menu_off(state) {
      state.menu = false
    }
  },
  actions: {
    
  },
  modules: {
  },
})
