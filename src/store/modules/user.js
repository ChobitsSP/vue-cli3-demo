import * as types from '../mutation-types'
import axios from 'axios'
import qs from 'qs'
import router from '@/router'

// initial state
const state = {
  info: null
}

// getters
const getters = {

}

// actions
const actions = {
  async GetUserInfo(store) {
    if (store.state.info !== null) return true

    const rsp = await axios.get('/api/user/info')

    if (rsp.code === 0) {
      store.commit(types.SET_USER, rsp.result)
      return true
    }
    else {
      return false
    }
  },
  logout() {
    window.localStorage.removeItem('token')
    // const url = '/login?' + qs.stringify({ r: window.location.href })
    // window.location.replace(url)
    router.replace({
      name: 'login'
    })
  }
}

// mutations
let mutations = {}

mutations[types.SET_USER] = function (state, r) {
  state.info = r
}

export default {
  state,
  getters,
  actions,
  mutations
}
