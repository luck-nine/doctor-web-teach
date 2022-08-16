import axios from 'axios'
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'


axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
//创建axios实例
const service = axios.create({
    //axiox中请求配置有baseURL选项，表示请求URL公共部分  VUE_APP_BASE_API变量值/api/getList /dev-api
    //baseURL: process.env.VUE_APP_BASE_API,
    baseURL: "http://localhost:8888",
    //超时
    timeout: 20000
})
// request拦截器
service.interceptors.request.use(config => {
    //是否需要设置 token
    console.log(config, "未处理的config");
    const isToken = (config.headers || {}).isToken === false
    console.log('----------------request拦截器 isToken=' + isToken, 'isToken');
    console.log(getToken(), 'getToken()');
    if (getToken() && !isToken) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token  根据实际情况修改
    }
    // get请求映射params参数  name=luck&age=19
    if (config.method === 'get' && config.params) {
        let url = config.url + '?';
        for (const propName of Object.keys(config.params)) {
            const value = config.params[propName];
            var part = encodeURIComponent(propName) + "=";
            if (value !== null && typeof (value) !== "undefined") {
                if (typeof value === 'object') {
                    for (const key of Object.keys(value)) {
                        let params = propName + '[' + key + ']';
                        var subPart = encodeURIComponent(params) + "=";
                        url += subPart + encodeURIComponent(value[key]) + "&";
                    }
                } else {
                    url += part + encodeURIComponent(value) + "&";
                }
            }
        }
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }
    console.log(config, "request参数");
    return config
},error => {
    console.log(error)
    Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use(res => {
    console.log("------------------response响应拦截器-----------");
    console.log(res);
    //  未设置状态码则默认成功状态
    const code = res.data.code || 200;
    console.log(code, "res.data.code");
    //  获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    console.log(msg);
    if (code === 401) {
        ElMessageBox.confirm(
            '登录状态已过期，您可以继续留在该页面，或者重新登录',
            '系统提示',
            {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            location.href = '/index';
        })
    } else if (code === 500) {
        ElMessage({
            showClose: true,
            message: msg,
            type: 'error',
        })
        return Promise.reject(msg)
    } else if (code !== 200) {
        ElNotification({
            title: msg,
            type: 'error',
        })
        return Promise.reject('error')
    } else {
        return res.data
    }
},
    error => {
    console.log(error)
    let { message } = error;
    if (message == "Network Error") {
        message = "后端接口连接异常";
    }else if (message.includes("timeout")) {
        message = "系统接口请求超时";
    }else if (message.includes("Request failed with status code")) {
        message = "系统接口" + message.substr(message.length - 3) + "异常";
    }

    ElMessage({
        showClose: true,
        message: message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error)
    }
)

export default service