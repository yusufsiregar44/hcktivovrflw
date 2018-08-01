<template lang="html">
    <div class="card" style="margin: 20px">
      <div class="card-content">
        <p class="title" v-html="question.content"></p>
        <p class="subtitle is-6">asked by: {{ question.ownerName }}</p>
      </div>
      <a class="button" style="margin: 10px">
      <router-link :to="`/question/${question.id}`">
          See full thread
      </router-link>
    </a>
    </div>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  computed: {

  },
  props: ['question'],
  components: {

  },
}
</script>
