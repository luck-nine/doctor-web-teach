import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.less'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIconModules from '@element-plus/icons-vue'
import  './assets/icons'
import SvgIcon from '@/components/SvgIcon' // svg component

const app = createApp(App)
app.use(ElementPlus)
// icon注册为全局组件
app.component('svg-icon', SvgIcon)
Object.keys(ElIconModules).forEach(function (key) {
    app.component(ElIconModules[key].name, ElIconModules[key])
})

app.use(router).mount('#app')
