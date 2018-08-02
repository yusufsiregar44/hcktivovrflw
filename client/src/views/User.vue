<template lang="html">
  <div>
    <Navbar></Navbar>
    <div class="container" style="margin-top: 40px; margin-bottom: 40px">
      <h1 class="title">Your Questions</h1>
      <div class="columns is-multiline is-mobile" v-if="questionsData !== null">
        <div class="column is-one-quarter" v-for="(question, index) in questionsData" v-bind:key="index">
          <UserQuestionCard :questionDatum="question"></UserQuestionCard>
        </div>
      </div>

      <h1 class="title">Your Answers</h1>
      <div class="columns is-multiline is-mobile" v-if="answersData !== null">
        <div class="column is-one-quarter" v-for="(answer, index) in answersData" v-bind:key="index">
          <UserAnswerCard :answerDatum="answer"></UserAnswerCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Navbar from '../components/Navbar.vue';
import UserAnswerCard from '../components/UserAnswerCard.vue';
import UserQuestionCard from '../components/UserQuestionCard.vue';
import firebase from 'firebase';


export default {
  data() {
    return {
      questionsData: null,
      answersData: null
    };
  },
  components: {
    Navbar,
    UserAnswerCard,
    UserQuestionCard,
  },
  computed: {
    ...mapState([ `userInfo` ]),
  },
  methods: {
    checkIsLoggedIn() {
      if (this.userInfo === null) {
        this.$router.push({
          name: 'home',
          query: {
            redirect: '/'
          }
        })
      }
    },
    getQuestionsByOwnerId() {
      let self = this;
      firebase.firestore().collection('questions').where('ownerId', "==", `${this.userInfo.uid}`)
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
          self.questionsData = questionsArr;
        })
    },
    getAnswersByOwnerId() {
      let self = this;
      firebase.firestore().collection('answers').where('ownerId', "==", `${this.userInfo.uid}`)
        .onSnapshot(function (querySnapshot) {
          // eslint-disable-next-line
          let answersArr = [];
          querySnapshot.forEach(function (doc) {
            let id = doc.id;
            let content = doc.data().content;
            let upvoters = doc.data().upvoters;
            let downvoters = doc.data().downvoters;
            let ownerId = doc.data().ownerId;
            let ownerName = doc.data().ownerName;
            let questionId = doc.data().questionId;
            let processedData = {
              id: id,
              content: content,
              upvoters: upvoters,
              downvoters: downvoters,
              ownerId: ownerId,
              ownerName: ownerName,
              questionId: questionId,
            }
            answersArr.push(processedData);
          });
          self.answersData = answersArr;
        })
    },
  },
  created() {
    this.checkIsLoggedIn();
    this.getQuestionsByOwnerId();
    this.getAnswersByOwnerId();
  },
}
</script>

<style lang="css">
</style>
