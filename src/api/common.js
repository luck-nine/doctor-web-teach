import request from '@/utils/request'

// 资料文件上传
export function materialsUpload(data) {
    return request({
        url: '/noAuth/materialsUpload',
        method: 'post',
        data: data
    })
}