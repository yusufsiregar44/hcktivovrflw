<template lang="html">
  <nav class="navbar is-transparent">
    <div class="container">
      <div class="navbar-brand">
        <router-link :to="`/`">
        <a class="navbar-item">
            <i class="fab fa-forumbee" style="font-size:37px; margin-right:10px; color:#363636"></i>
            <h1 class="title">hcktivovrflw</h1>
        </a>
      </router-link>
        <span class="navbar-burger burger" data-target="navbarMenuHeroB">
            <span></span>
        <span></span>
        <span></span>
        </span>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">

          <a class="navbar-item" v-if="userInfo === null">
            <div id="firebaseui-auth-container" v-if="userInfo === null"></div>
          </a>


          <router-link :to="`/user`">  
            <a class="navbar-item" v-if="userInfo !== null">
              <a class="button is-inverted">
                <span class="icon">
                  <i class="fas fa-user"></i>
                </span>
                <span>{{ this.userInfo.displayName }}</span>
              </a>
            </a>
          </router-link>

          <a class="navbar-item" v-if="userInfo !== null">
             <a class="button is-inverted" @click="logout">
               <span class="icon">
                 <i class="fas fa-sign-out-alt"></i>
               </span>
               <span>Logout</span>
             </a>
          </a>

        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
// import { mapActions } from 'vuex';
import firebase from 'firebase';
// import EnterModal from '../components/EnterModal.vue';
import firebaseui from 'firebaseui'
// eslint-disable-next-line
import {config} from '../helpers/firebaseConfig';


export default {
  mounted() {
     var uiConfig = {
       signInSuccessUrl: '/',
       signInOptions: [
         firebase.auth.FacebookAuthProvider.PROVIDER_ID,
         firebase.auth.EmailAuthProvider.PROVIDER_ID
         ]
       };
     var ui = new firebaseui.auth.AuthUI(firebase.auth());
     ui.start('#firebaseui-auth-container', uiConfig);
  },
  components: {
    // LoginModal,
  },
  data() {
    return {
      // email: '',
      // password: '',
      // isLoginModalActive: false,
    };
  },
  computed: {
    ...mapState([ 'userInfo' ])
  },
  methods: {
    // ...mapActions([ 'firebaseUiInit' ]),
    logout() {
      firebase.auth().signOut();
    },
  },
}
</script>

<style lang="css">
</style>
