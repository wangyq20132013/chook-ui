import request from '../utils/request'

export function getData(url, data) {
    return request({
        url: url,
        method: 'get',
        data: data
    })
}
export function postData(url, data) {
    return request({
        url: url,
        method: 'post',
        data: data
    })
}
export function putData(url, data) {
    return request({
        url: url,
        method: 'put',
        data: data
    })
}

export function deleteData(url, data) {
    return request({
        url: url,
        method: 'delete',
        data: data
    })
}

export function uploadData(url, data) {
    return request({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
        },
        data: data
    })
}

export default {
    install: function (Vue) {
        Vue.prototype.$getData = getData;
        Vue.prototype.$postData = postData;
        Vue.prototype.$putData = putData;
        Vue.prototype.$deleteData = deleteData;
        Vue.prototype.$uploadData = deleteData;
    }
}