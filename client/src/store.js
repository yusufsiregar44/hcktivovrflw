import Vue from 'vue';
import Vuex from 'vuex';
// import firebase from 'firebase/app';
// import router from './router.js';

// var config = {
//   apiKey: "AIzaSyAsJy4Yfe-dRNkRKFGuUTZVDTVZZ1-YG5k",
//   authDomain: "hcktivovrflw.firebaseapp.com",
//   databaseURL: "https://hcktivovrflw.firebaseio.com",
//   projectId: "hcktivovrflw",
//   storageBucket: "hcktivovrflw.appspot.com",
//   messagingSenderId: "686412817446"
// };
// firebase.initializeApp(config);

// const firestore = firebase.firestore();
// const settings = {
//   timestampsInSnapshots: true
// };
// firestore.settings(settings);

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
  },
  mutations: {
    assignUserInfo(state, payload) {
      return state.userInfo = payload;
    }
  },
  actions: {
    // logout({ commit }) {
    //   // commit('assignUserInfo', null)
    //   return auth.signOut();
    // }
  },
})
