import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    username: ''
  },
  mutations: {
    // set
    setToken(state, token){
      state.token = token
      localStorage.setItem("token", token)
    },
    setUsername(state , username){
      localStorage.setItem("username", username)
      state.username = username
    },
    removeInfo(state){
      state.token = ''
      state.username = ''
      localStorage.setItem("token", '')
    }
  },
  getters: {
    // get
    getUser: state => {
      return state.username
    }

  },
  actions: {
  },
  modules: {
  }

}
)
