import { createStore } from 'vuex'

export default createStore({
  state: {
    menu : document.location.href.includes("home"),
    user: null,
    token: null

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
    setUser(state, reponse){
      state.user = reponse.userId;
      state.token = reponse.token
    }
  },
  actions: {
    
  },
  modules: {
  },
})
