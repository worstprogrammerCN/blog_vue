<template>
  <div class="topPanel container">
    <template v-if="state === 'main'">
      <div class="field is-grouped">
        <p class="control">
          <button @click="editMenu" class="button is-primary">编辑菜单</button>
        </p>
        <p class="control">
          <button @click="startCreatingArticle" class="button">写文章</button>
        </p>
      </div>
    </template>
    <template v-else-if="state == 'editingMenu'">
      <p class="control">
          <button @click="cancelEditMenu" class="button is-primary">结束编辑</button>
      </p>
    </template>
    <template v-else-if="state == 'viewing'">
      <div class="field is-grouped is-grouped-right">
          <p class="control">
              <a @click="startEditingArticle" class="button is-primary">
              编辑
              </a>
          </p>
          <p class="control">
              <a @click="cancelViewing" class="button is-light">
              返回主界面
              </a>
          </p>
      </div>
      <h1 class="title is-1"> {{ article.title }} </h1>
      <MarkdownContent :rawText="article.content"></MarkdownContent>
    </template>
    <template v-else-if="state == 'editingArticle'">
      <EditingArticlePanel v-on:finishEditingArticle="finishEditingArticle"/>
    </template>
    <template v-else-if="state == 'creatingArticle'">
      <CreatingArticlePanel v-on:finishCreatingArticle="finishCreatingArticle"/>
    </template>
  </div>  
</template>

<script>
import MarkdownContent from '~/components/MarkdownContent.vue'
import EditingArticlePanel from '~/components/EditingArticlePanel.vue'
import CreatingArticlePanel from '~/components/CreatingArticlePanel.vue'

export default {
  computed: {
    article () {
      return this.$store.state.activeArticle
    },
    state () {
      return this.$store.state.adminPageState
      // 有菜单主界面状态, 编辑菜单状态, 浏览文章状态, 修改文章状态, 以及新建文章状态
      //               main, editingMenu , viewing, editingArticle, creatingArticle
    }
  },
  watch: {
    article (val) { // val is expected to be an object
      if (val._id) {
        this.$store.commit('setAdminPageState', 'viewing')
      }
    }
  },
  methods: {
    editMenu () {
      this.$store.commit('setAdminPageState', 'editingMenu')
    },
    cancelEditMenu () {
      this.$store.commit('setAdminPageState', 'main')
    },
    startCreatingArticle () {
      this.$store.commit('setAdminPageState', 'creatingArticle')
      this.$store.dispatch('getLeveledMenu')
    },
    finishCreatingArticle () {
      this.$store.commit('setAdminPageState', 'main')
    },
    startEditingArticle () {
      this.$store.commit('setAdminPageState', 'editingArticle')
    },
    finishEditingArticle () {
      this.$store.commit('setAdminPageState', 'viewing')
    },
    cancelViewing () {
      this.$store.commit('setAdminPageState', 'main')
    }
  },
  components: {
    MarkdownContent,
    EditingArticlePanel,
    CreatingArticlePanel
  }
}
</script>

<style scoped>
.topPanel{
  margin-right: 0px;
  width: 100%;
}
</style>
