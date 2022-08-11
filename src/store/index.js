import { createStore } from 'vuex'
import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'
export default createStore({
  state: {
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
    head:localStorage.getItem("head"),
    ydoc:'',
    provider:'',
    sharedDoc:Array,
    fromParams:'',
    fromName:'',
    kw:"",
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
      localStorage.setItem("username", '')
      localStorage.setItem("head", '')
    },
    initYDoc(state){
      state.ydoc=new Y.Doc
      state.provider = new WebrtcProvider('neko', state.ydoc)
      state.sharedDoc = []
    },
    addNewArticle(state,doc_id){
      console.log(state.sharedDoc)
      console.log(doc_id)
      if((state.sharedDoc.indexOf(doc_id)===-1)){
        state.ydoc.getXmlFragment(doc_id)
        state.sharedDoc.push(doc_id)
      }
    },
    setFromParams(state,val){
      state.fromParams=val
    },
    setFromName(state,val){
      state.fromName=val
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
