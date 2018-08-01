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
         </div>
     </div>
     <div class="content article-body"  v-if="questionData !== null">
       <div container style="margin: 10px">
         <a disabled class="button is-info" v-if="this.userInfo === null || this.userInfo.uid === questionData.ownerId">Answer</a>

         <b-collapse :open="false">
           <button class="button is-info" slot="trigger" v-if="this.userInfo !== null && this.userInfo.uid !== questionData.ownerId" style="margin: 10px">Answer</button>
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
              <p class="title is-5"> {{ answer.content }}</p>
              <p class="subtitle is-6"> answered by: {{ answer.ownerName }}</p>
            </article>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
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
  },
  components: {
    Navbar,
  },
  methods: {
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
            let processedData = {
              id: id,
              content: content,
              upvoters: upvoters,
              downvoters: downvoters,
              ownerId: ownerId,
              ownerName: ownerName,
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
