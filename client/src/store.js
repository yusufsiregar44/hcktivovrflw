import Vue from 'vue';
import Vuex from 'vuex';
// import firebase from 'firebase';
//
// const firestore = firebase.firestore();
// const settings = {
//   timestampsInSnapshots: true
// };
// firestore.settings(settings);

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    allQuestions: null,
  },
  mutations: {
    assignUserInfo(state, payload) {
      return state.userInfo = payload;
    },
    assignAllQuestions(state, payload) {
      return state.allQuestions = payload;
    },
  },
  actions: {
    
  },
})
