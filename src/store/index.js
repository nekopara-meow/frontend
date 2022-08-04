import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    username: '',
    head:''
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
    setHead(state , head){
      localStorage.setItem("head", head)
      state.head = head
    },
    removeInfo(state){
      state.token = ''
      state.username = ''
      state.head=''
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
