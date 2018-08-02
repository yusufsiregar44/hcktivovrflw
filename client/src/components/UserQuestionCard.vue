<template lang="html">
  <div class="card">
    <div class="card-content">
      <p class="title" v-html="questionDatum.content"></p>
    </div>
    <footer class="card-footer">
      <div class="card-footer-item">
        <a class="button is-warning" style="margin: 5px" @click="isComponentModalActive = true">
          Update
        </a>

        <b-modal :active.sync="isComponentModalActive" has-modal-card>
          <form action="">
            <div class="modal-card" style="width: 500px">
              <header class="modal-card-head">
                <p class="modal-card-title">Update Post</p>
              </header>
              <section class="modal-card-body">
                <b-field label="content">
                  <b-input placeholder="This will be displayed at the very top" maxlength="30" minlength="1" v-model="content"></b-input>
                </b-field>

                <a class="button is-warning" @click="update">
                  Update
                </a>

              </section>
              <footer class="modal-card-foot">

              </footer>
            </div>
          </form>
        </b-modal>

        <a class="button is-danger" style="margin: 5px" @click="remove">
          Remove
        </a>

      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from 'firebase';

export default {
  data() {
    return {
      content: null,
      isComponentModalActive: false,
    };
  },
  props: ['questionDatum'],
  computed: {
    ...mapState([ 'userInfo' ]),
  },
  methods: {
    remove() {
      firebase.firestore().collection('questions').doc(`${this.questionDatum.id}`).delete()
    },
    update() {
      firebase.firestore().collection('questions').doc(this.questionDatum.id).set({
        content: this.content,
        downvoters: this.questionDatum.downvoters,
        upvoters: this.questionDatum.upvoters,
        ownerId: this.questionDatum.ownerId,
        ownerName: this.questionDatum.ownerName,
      })
    },
  },
}
</script>

<style lang="css">
</style>
