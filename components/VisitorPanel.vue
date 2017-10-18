<template>
  <div class="topPanel container">
    <template v-if="isMain">
      <h1 class="title is-3"></h1>
    </template>
    <template v-else-if="isViewing">
      <h1 class="title is-1"> {{ article.title }} </h1>
      <MarkdownContent :rawText="article.content"></MarkdownContent>
    </template>
    <template v-else><h1>{{ state }}</h1></template>
  </div>  
</template>

<script>
import MarkdownContent from '~/components/MarkdownContent.vue'

export default {
  computed: {
    article () {
      return this.$store.state.activeArticle
    },
    state () {
      return this.$store.state.articlesPageState
    },
    isMain () {
      return this.state === 'main'
    },
    isViewing () {
      return this.state === 'viewing'
    }
  },
  watch: {
    article (val) { // val is expected to be an object
      if (val._id) {
        this.$store.commit('setArticlesPageState', 'viewing')
      }
    }
  },
  methods: {
    cancelViewing () {
      this.$store.commit('setArticlesPageState', 'main')
    }
  },
  components: {
    MarkdownContent
  }
}
</script>

<style scoped>
.topPanel{
  margin-right: 0px;
  width: 100%;
}
</style>
