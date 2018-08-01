import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import firebase from 'firebase'
// eslint-disable-next-line
import firebaseui from 'firebaseui';
import { config } from './helpers/firebaseConfig'
import wysiwyg from "vue-wysiwyg";

Vue.use(wysiwyg, {}); // config is optional. more below

Vue.use(Buefy, {
  defaultIconPack: 'fas',
});

Vue.config.productionTip = false

new Vue({
  router,
  created() {
    let self = this;
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // eslint-disable-next-line
        this.$store.commit('assignUserInfo', {displayName: user.displayName, uid: user.uid})
      } else {
        // eslint-disable-next-line
        // console.log('gamasuk');
        this.$store.commit('assignUserInfo', null)
      }
   });
   const firestore = firebase.firestore();
   const settings = {
     timestampsInSnapshots: true
   };
   firestore.settings(settings);
   firestore.collection('questions')
     .onSnapshot(function (querySnapshot) {
       let questionsArr = [];
       querySnapshot.forEach(function (doc) {
         let id = doc.id;
         let content = doc.data().content;
         let upvoters = doc.data().upvoters;
         let downvoters = doc.data().downvoters;
         let ownerId = doc.data().ownerId;
         let ownerName = doc.data().ownerName;
         let processedData = {
           id: id,
           content: content,
           upvoters: upvoters,
           downvoters: downvoters,
           ownerId: ownerId,
           ownerName: ownerName,
         }
         questionsArr.push(processedData);
       });
       self.$store.commit('assignAllQuestions', questionsArr);
     })
  },
  store,
  render: h => h(App)
}).$mount('#app')
