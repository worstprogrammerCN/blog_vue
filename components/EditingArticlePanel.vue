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
      title: this.$store.state.article.title,
      content: this.$store.state.article.content
    }
  },
  computed: {
    article () {
      return this.$store.state.article
    }
  },
  methods: {
    upload () {
      this.$store.commit('editArticle', { title: this.title, content: this.content })
      this.$emit('finishEditingArticle')
    },
    cancelUpload () {
      console.log('取消编辑')
      this.$emit('finishEditingArticle')
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