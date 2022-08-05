import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/scss/custom.scss';
import '@/assets/scss/titap.scss'
//import Axios from "axios";
//Axios.defaults.withCredentials = true;
//Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
createApp(App).use(store).use(ElementPlus).use(router).mount('#app')
