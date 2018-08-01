import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import firebase from 'firebase'
// eslint-disable-next-line
import firebaseui from 'firebaseui';
import {config} from './helpers/firebaseConfig'

Vue.use(Buefy, {
  defaultIconPack: 'fas',
});

Vue.config.productionTip = false

new Vue({
  router,
  created() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('assignUserInfo', {displayName: user.displayName, uid: user.uid})
      } else {
        this.$store.commit('assignUserInfo', null)
      }
   });
  },
  store,
  render: h => h(App)
}).$mount('#app')
