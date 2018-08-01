<template>
  <div class="home">
    <Navbar></Navbar>
    <div style="margin: 20px">
      <div class="container">
        <b-collapse :open="false" v-if="userInfo !== null">
          <button class="button is-success" slot="trigger">Ask a new question</button>
          <div class="notification">
            <div class="content">

              <b-field label="Question">
                <wysiwyg v-model="question"/>
              </b-field>

              <a class="button is-success" @click="ask()">
                <span>Publish Question</span>
              </a>

            </div>
          </div>
        </b-collapse>

        <button disabled class="button is-success" slot="trigger" v-if="userInfo === null">Ask a new question</button>
        <QuestionCard v-for="(question, index) in allQuestions" v-bind:key="(index)" :question="question"></QuestionCard>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import { mapState } from 'vuex';
import firebase from 'firebase';
import QuestionCard from '../components/QuestionCard.vue'
import "vue-wysiwyg/dist/vueWysiwyg.css";

export default {
  name: 'home',
  data() {
    return {
      question: "",
    };
  },
  computed: {
    ...mapState([ 'allQuestions', 'userInfo' ]),
  },
  components: {
    Navbar,
    QuestionCard,
  },
  methods: {
    ask() {
      if (this.question.length === 0) {
        this.$toast.open({
          duration: 2500,
          message: 'Oops. something went wrong. Please make sure your question has a minimum length of 10 characters',
          position: 'is-top',
          type: 'is-danger'
        });
      } else {
        firebase.firestore().collection('questions').add({
            content: this.question,
            upvoters: [],
            downvoters: [],
            ownerId: this.userInfo.uid,
            ownerName: this.userInfo.displayName,
          })
          .then(() => {
            this.$toast.open({
              duration: 2500,
              message: 'Successfully added question',
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
  },
}
</script>
