<template lang="html">
  <form action="">
    <div class="modal-card" style="width: 500px">
      <header class="modal-card-head">
        <p class="modal-card-title">Enter</p>
      </header>
      <section class="modal-card-body">
        <div id="firebaseui-auth-container"></div>
      </section>
      <footer class="modal-card-foot">
        <div class="container">
        </div>
      </footer>
    </div>
  </form>
</template>

<script>
import firebase from 'firebase';
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
}
</script>

<style lang="css">
</style>
