import request from '@/utils/request'

// 注册乡医方法
export function register(data) {
    return request({
        url: '/doctor/register',
        method: 'post',
        data: data
    })
}
