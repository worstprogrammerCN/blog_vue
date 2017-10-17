<template>
  <div>
    <div class="field is-grouped is-grouped-right">
        <p class="control">
            <a @click="upload" class="button is-primary">
            发布更新
            </a>
        </p>
        <p class="control">
            <a @click="cancelUpload" class="button is-light">
            取消编辑
            </a>
        </p>
    </div>
    <input v-model="title" class="input is-primary" type="text">
    <div class="MarkdownEditor">
      <div class="columns">
        <div class="column is-4">
          <textarea class="textarea" placeholder="the article content" rows="25" v-model="content"></textarea>
        </div>
        <div class="column is-8">
          <MarkdownContent :rawText="content"></MarkdownContent>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import MarkdownContent from '~/components/MarkdownContent.vue'

export default {
  data () {
    return {
      title: this.$store.state.activeArticle.title,
      content: this.$store.state.activeArticle.content
    }
  },
  computed: {
    article () {
      return this.$store.state.activeArticle
    }
  },
  methods: {
    upload () {
      let article = {
        _id: this.article._id,
        title: this.title,
        content: this.content
      }
      this.$store.dispatch('postEditedArticle', article)
    },
    cancelUpload () {
      this.$store.commit('setAdminPageState', 'viewing')
    }
  },
  components: {
    MarkdownContent
  }
}
</script>

<style scoped>

.MarkdownEditor {
  margin-top: 10px;
}
</style>