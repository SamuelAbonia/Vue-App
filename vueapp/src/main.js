import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify exports
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)
Vue.config.productionTip = false


new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
