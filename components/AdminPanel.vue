<template>
  <div class="container">
    <template v-if="state === 'main'">
      <div class="field is-grouped">
        <p class="control">
          <button @click="editMenu" class="button is-primary">编辑菜单</button>
        </p>
        <p class="control">
          <button @click="createArticle" class="button">写文章</button>
        </p>
      </div>
    </template>
    <template v-else-if="state == 'editingMenu'">
      <h1> editingMenu </h1>
      <p class="control">
          <button @click="cancelEditMenu" class="button is-primary">结束编辑</button>
      </p>
    </template>
    <template v-else-if="state == 'viewing'">
      <h1 class="title is-1"> {{ article.title }} </h1>
      <MarkdownContent :rawText="article.content"></MarkdownContent>
    </template>
    <template v-else-if="state == 'editingArticle'">
      <h1> editingArticle </h1>
      <MarkdownContent :rawText="article.content"></MarkdownContent>
    </template>
    <template v-else-if="state == 'creatingArticle'">
      <h1> creatingArticle </h1>
      <MarkdownContent :rawText="article.content"></MarkdownContent>
    </template>
  </div>  
</template>

<script>
import MarkdownContent from '~/components/MarkdownContent.vue'

export default {
  props: ['tArticle'],
  data () {
    return {
      article: this.tArticle,
      state: 'main' // 有菜单主界面状态, 编辑菜单状态, 浏览文章状态, 修改文章状态, 以及新建文章状态
      //               main, editingMenu , viewing, editingArticle, creatingArticle
    }
  },
  watch: {
    tArticle (val) {
      this.article = val
      this.state = 'viewing'
    }
  },
  methods: {
    editMenu () {
      this.state = 'editingMenu'
      console.log('panelStateChanged')
      this.$emit('panelStateChanged', { 'state': 'editingMenu' })
    },
    cancelEditMenu () {
      this.state = 'main'
      this.$emit('panelStateChanged', { 'state': 'main' })
    },
    createArticle () {
      this.state = 'creatingArticle'
    }
  },
  components: {
    MarkdownContent
  }
}
</script>

<style scoped>

</style>
