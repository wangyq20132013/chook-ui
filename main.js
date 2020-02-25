import Vue from 'vue'
import App from './App'

import store from './store'

import datainterface from './api/datainterface.js'

Vue.use(datainterface);

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
