<template lang="html">
  <div>
    <Navbar></Navbar>
    <div class="card" v-if="questionData !== null" style="margin: 10px">
         <div class="card-content">
             <div class="media">
                 <div class="media-content">
                   <p class="title" v-html="questionData.content"></p>
                   <p class="subtitle is-6">asked by: {{ questionData.ownerName }}</p>
                 </div>
             </div>
             <div v-if="questionData !== null && this.userInfo !== null">
              <a class="button is-success" style="margin-right: 5px; margin-top: 5px" @click="upvote()" v-if="this.questionData.ownerId !== this.userInfo.uid && this.userInfo !== null && this.questionData.upvoters.indexOf(this.userInfo.uid) === -1">
                <i class="fas fa-thumbs-up"></i>
              </a>

              <a disabled class="button is-success" style="margin-right: 5px; margin-top: 5px" v-if="this.questionData.ownerId === this.userInfo.uid || this.userInfo === null || this.questionData.upvoters.indexOf(this.userInfo.uid) !== -1">
                <i class="fas fa-thumbs-up"></i>
              </a>

              <strong style="font-size: 30px;">{{ totalQuestionVotes }}</strong>

                <a class="button is-danger" style="margin-left: 5px; margin-top: 5px" @click="downvote()"  v-if="this.questionData.ownerId !== this.userInfo.uid && this.userInfo !== null && this.questionData.downvoters.indexOf(this.userInfo.uid) === -1">
                  <i class="fas fa-thumbs-down"></i>
                </a>

                <a disabled class="button is-danger" style="margin-left: 5px; margin-top: 5px" v-if="this.questionData.ownerId === this.userInfo.uid || this.userInfo === null || this.questionData.downvoters.indexOf(this.userInfo.uid) !== -1">
                  <i class="fas fa-thumbs-down"></i>
                </a>

            </div>
         </div>
     </div>
     <div class="content article-body"  v-if="questionData !== null">
       <div container style="margin: 10px">
         <a disabled class="button is-info" v-if="userInfo === null || userInfo.uid === questionData.ownerId">Answer</a>

         <b-collapse :open="false">
           <button class="button is-info" slot="trigger" v-if="userInfo !== null && userInfo.uid !== questionData.ownerId" style="margin: 10px">Answer</button>
           <div class="notification">
              <div class="content">

                <wysiwyg v-model="answerContent"/>

                <a class="button is-success" style="margin: 10px" @click="answer()">
                  <span>Submit</span>
                </a>

              </div>
            </div>
          </b-collapse>

          <div v-if="answersData !== null">
            <article class="box" v-for="(answer, index) in answersData" v-bind:key="index">
              <AnswerCard :answerDatum="answer" :questionData="questionData"></AnswerCard>
            </article>
          </div>

        </div>
      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import AnswerCard from '../components/AnswerCard.vue';
import { mapState } from 'vuex';
import firebase from 'firebase';
import "vue-wysiwyg/dist/vueWysiwyg.css";

export default {
  data() {
    return {
      questionData: null,
      answersData: null,
      answerContent: '',
    };
  },
  created() {
    this.getQuestionById();
    this.getAnswersByQuestionId();
  },
  computed: {
    ...mapState([ `userInfo` ]),
    totalQuestionVotes() {
      return this.questionData.upvoters.length - this.questionData.downvoters.length;
    }
  },
  components: {
    Navbar,
    AnswerCard,
  },
  methods: {
    downvote() {
      let index = this.questionData.upvoters.indexOf(this.userInfo.uid);
      // eslint-disable-next-line
      // console.log(index);
      if (index !== -1) {
        this.questionData.upvoters.splice(index, 1)
      }
      this.questionData.downvoters.push(this.userInfo.uid);
      firebase.firestore().collection('questions').doc(this.questionData.id).set({
        content: this.questionData.content,
        downvoters: this.questionData.downvoters,
        upvoters: this.questionData.upvoters,
        ownerId: this.questionData.ownerId,
        ownerName: this.questionData.ownerName,
      })
      .then(() => {
        this.$toast.open({
          duration: 2500,
          message: 'Successfully recorded your downvote',
          position: 'is-top',
          type: 'is-success'
        });
      })
      .catch(() => {
        this.$toast.open({
          duration: 2500,
          message: 'Oops, something went wrong. Please try again.',
          position: 'is-top',
          type: 'is-danger'
        });
      })
    },
    upvote() {
      let index = this.questionData.downvoters.indexOf(this.userInfo.uid);
      // eslint-disable-next-line
      // console.log(index);
      if (index !== -1) {
        this.questionData.downvoters.splice(index, 1)
      }
      this.questionData.upvoters.push(this.userInfo.uid);
      // eslint-disable-next-line
      // console.log(this.questionData.upvoters);
      firebase.firestore().collection('questions').doc(this.questionData.id).set({
        content: this.questionData.content,
        downvoters: this.questionData.downvoters,
        upvoters: this.questionData.upvoters,
        ownerId: this.questionData.ownerId,
        ownerName: this.questionData.ownerName,
      })
      .then(() => {
        this.$toast.open({
          duration: 2500,
          message: 'Successfully recorded your upvote',
          position: 'is-top',
          type: 'is-success'
        });
      })
      .catch(() => {
        this.$toast.open({
          duration: 2500,
          message: 'Oops, something went wrong. Please try again.',
          position: 'is-top',
          type: 'is-danger'
        });
      })
    },
    getQuestionById() {
      let self = this;
      firebase.firestore().collection('questions').doc(`${this.$route.params.id}`)
        .onSnapshot(function (doc) {
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
          self.questionData = processedData;
        })
    },
    getAnswersByQuestionId() {
      let self = this;
      firebase.firestore().collection('answers').where('questionId', "==", `${this.$route.params.id}`)
        .onSnapshot(function (querySnapshot) {
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
    answer() {
      if (this.answerContent.length <= 0) {
        this.$toast.open({
          duration: 2500,
          message: 'Oops. something went wrong. Your answer must have at least 1 character',
          position: 'is-top',
          type: 'is-danger'
        });
      } else {
        firebase.firestore().collection('answers').add({
            content: this.answerContent,
            upvoters: [],
            downvoters: [],
            ownerId: this.userInfo.uid,
            ownerName: this.userInfo.displayName,
            questionId: this.questionData.id,
          })
          .then(() => {
            this.$toast.open({
              duration: 2500,
              message: 'Successfully added answer',
              position: 'is-top',
              type: 'is-success'
            });
          })
          .catch(() => {
            this.$toast.open({
              duration: 2500,
              message: 'Oops. something went wrong. Please try again',
              position: 'is-top',
              type: 'is-danger'
            });
          })
      }
    },
  }
}
</script>

<style lang="css">
</style>
