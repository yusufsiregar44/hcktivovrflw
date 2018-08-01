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
            <a class="button is-inverted" @click="isEnterModalActive = true">
              <span class="icon">
                <i class="fas fa-sign-in-alt"></i>
              </span>
              <span>Enter</span>
            </a>
          </a>


            <b-modal :active.sync="isEnterModalActive" has-modal-card>
              <EnterModal></EnterModal>
            </b-modal>

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
import EnterModal from '../components/EnterModal.vue';


export default {

  components: {
    EnterModal,
    // LoginModal,
  },
  data() {
    return {
      isEnterModalActive: false,
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
