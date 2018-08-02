<template lang="html">
  <div class="card">
    <div class="card-content">
      <p class="title" v-html="answerDatum.content"></p>
    </div>
    <footer class="card-footer">
      <div class="card-footer-item">

        <a class="button" style="margin: 5px" @click="remove()">
          Remove
        </a>

      </div>
    </footer>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import firebase from 'firebase';

export default {
  props: [ 'answerDatum' ],
  methods: {
    remove() {
      firebase.firestore().collection('answers').doc(`${this.answerDatum.id}`).delete()
    },
  },
}
</script>

<style lang="css">
</style>
