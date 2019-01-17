import axios from 'axios'
import store from '@/store'

// mui需要设置baseURL
if (process.env.MUI === 'true') {
  axios.defaults.baseURL = 'https://easy-mock.com/mock/5a5ee2dcdec01f1bea369ae4'
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent

  if (process.env.MUI === 'true') {
    config.url = config.url.replace('/api/', '/element-demo/')
  }
  
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }

  return config

}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  if (response.data.code === 401) {
    store.dispatch('logout')
    throw new Error()
  }
  return response.data
}, function (error) {

  // Do something with response error
  return Promise.reject(error)
})

export default axios
