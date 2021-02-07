// 方法一：用plugins文件
// import http from '@/plugins/axios/index.js'
// export default {
//     login: params => http.post('/login', params)
// }


// 方法二：不用plugins文件（如果配置多的话最好写个plugin文件）
import axios from 'axios'
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api',
})

export default {
    http,
    //商品类型接口
    addProductType: params => http.post('/productType', params),
    updateProductType: params => http.put('/productType', params),
    getProductType: () => http.get('/productType'),
    deleteProductType: params => http.delete('/productType', params),

    //商品接口
    addProduct: params => http.post('/product', params),
    // getProduct: () => http.get('/product'),
    getProduct: (params) => http.get('/product', params),
    updateProduct: params => http.put('/product', params),
    deleteProduct: params => http.delete('/product', params),

    getUsers: () => http.get('/user'),
    delUser: (params) => http.delete('/delUser', params)
}