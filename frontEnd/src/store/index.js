import { createStore } from 'vuex'

export default createStore({
  state: {
    menu : document.location.href.includes("home"),
    user: [],
    nom: "",
    prénom: "",


  },
  getters: {
  },
  mutations: {
    menu_on(state) {
      state.menu = true
    },
    menu_off(state) {
      state.menu = false
    },
    
  },
  actions: {
    
    
  },
  modules: {
  },
})
