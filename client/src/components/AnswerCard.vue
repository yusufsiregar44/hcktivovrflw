<template lang="html">
  <div>
    <p class="title is-5" v-html="answerDatum.content"></p>
    <p class="subtitle is-6"> answered by: {{ answerDatum.ownerName }}</p>
    <div v-if="questionData !== null && this.userInfo !== null">
     <a class="button is-success" style="margin-right: 5px; margin-top: 5px" @click="upvote()" v-if="this.answerDatum.ownerId !== this.userInfo.uid && this.userInfo !== null && this.answerDatum.upvoters.indexOf(this.userInfo.uid) === -1">
       <i class="fas fa-thumbs-up"></i>
     </a>

     <a disabled class="button is-success" style="margin-right: 5px; margin-top: 5px" v-if="this.answerDatum.ownerId === this.userInfo.uid || this.userInfo === null || this.answerDatum.upvoters.indexOf(this.userInfo.uid) !== -1">
       <i class="fas fa-thumbs-up"></i>
     </a>

     <strong style="font-size: 30px;">{{ totalAnswerVotes }}</strong>

     <a class="button is-danger" style="margin-left: 5px; margin-top: 5px" @click="downvote()"  v-if="this.answerDatum.ownerId !== this.userInfo.uid && this.userInfo !== null && this.answerDatum.downvoters.indexOf(this.userInfo.uid) === -1">
       <i class="fas fa-thumbs-down"></i>
     </a>

     <a disabled class="button is-danger" style="margin-left: 5px; margin-top: 5px" v-if="this.answerDatum.ownerId === this.userInfo.uid || this.userInfo === null || this.answerDatum.downvoters.indexOf(this.userInfo.uid) !== -1">
       <i class="fas fa-thumbs-down"></i>
     </a>

   </div>
  </div>
</template>

<script>
import {  mapState } from 'vuex';
import firebase from 'firebase';

export default {
  props: ['answerDatum', 'questionData'],
  computed: {
    ...mapState([`userInfo`]),
    totalAnswerVotes() {
      return this.answerDatum.upvoters.length - this.answerDatum.downvoters.length;
    }
  },
  methods: {
    downvote() {
      let index = this.answerDatum.upvoters.indexOf(this.userInfo.uid);
      // eslint-disable-next-line
      // console.log(index);
      if (index !== -1) {
        this.answerDatum.upvoters.splice(index, 1)
      }
      this.answerDatum.downvoters.push(this.userInfo.uid);
      firebase.firestore().collection('answers').doc(this.answerDatum.id).set({
        content: this.answerDatum.content,
        downvoters: this.answerDatum.downvoters,
        upvoters: this.answerDatum.upvoters,
        ownerId: this.answerDatum.ownerId,
        ownerName: this.answerDatum.ownerName,
        questionId: this.answerDatum.questionId,
      })
      .then(() => {
        this.$toast.open({
          duration: 2500,
          message: 'Successfully recorded your downvote',
          position: 'is-top',
          type: 'is-success'
        });
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err);
        this.$toast.open({
          duration: 2500,
          message: 'Oops, something went wrong. Please try again.',
          position: 'is-top',
          type: 'is-danger'
        });
      })
    },
    upvote() {
      let index = this.answerDatum.downvoters.indexOf(this.userInfo.uid);
      // eslint-disable-next-line
      // console.log(index);
      if (index !== -1) {
        this.answerDatum.downvoters.splice(index, 1)
      }
      this.answerDatum.upvoters.push(this.userInfo.uid);
      // eslint-disable-next-line
      // console.log(this.answerDatum.upvoters);
      firebase.firestore().collection('answers').doc(this.answerDatum.id).set({
        content: this.answerDatum.content,
        downvoters: this.answerDatum.downvoters,
        upvoters: this.answerDatum.upvoters,
        ownerId: this.answerDatum.ownerId,
        ownerName: this.answerDatum.ownerName,
        questionId: this.answerDatum.questionId,
      })
      .then(() => {
        this.$toast.open({
          duration: 2500,
          message: 'Successfully recorded your upvote',
          position: 'is-top',
          type: 'is-success'
        });
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err);
        this.$toast.open({
          duration: 2500,
          message: 'Oops, something went wrong. Please try again.',
          position: 'is-top',
          type: 'is-danger'
        });
      })
    },
  },
}
</script>

<style lang="css">
</style>
