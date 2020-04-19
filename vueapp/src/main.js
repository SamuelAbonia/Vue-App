import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify exports
import Router from 'vue-router'
import router from './router'
import { firestorePlugin } from 'vuefire'

Vue.use(Router)

Vue.use(firestorePlugin)

Vue.config.productionTip = false


new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
