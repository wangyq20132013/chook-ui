import Vue from 'vue'
import App from './App'

import store from './store'

import datainterface from './api/datainterface.js'

import components from './components'

Vue.use(datainterface);

Vue.use(components)

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
