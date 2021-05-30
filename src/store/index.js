import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import { auth } from './auth'
import { shop } from './cart'

export default new Vuex.Store({
  modules: {
    auth,
    shop,
  }
})
