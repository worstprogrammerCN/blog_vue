<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.3/css/bulma.min.css" />
    <MyHeader :logo="logo"/>
    <template v-if="isEditing">
      <EditingFirstMenu />
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-2">
            <EditingAsideMenu v-on:getArticle="getArticle"/>
          </div>
          <div class="column is-10">
            <AdminPanel />
          </div>
        </div> 
      </div>
    </template>
    <template>
      <FirstMenu v-else/>
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-2">
            <AsideMenu v-on:getArticle="getArticle"/>
          </div>
          <div class="column is-10">
            <AdminPanel />
          </div>
        </div> 
      </div>
    </template>
  </div>  
</template>

<script>
import MyHeader from '~/components/Header.vue'
import FirstMenu from '~/components/FirstMenu.vue'
import AsideMenu from '~/components/AsideMenu.vue'
import MarkdownContent from '~/components/MarkdownContent.vue'
import AdminPanel from '~/components/AdminPanel.vue'

// 有编辑菜单状态, 浏览文章状态, 修改文章状态, 以及新建文章状态
export default {
  data () {
    return {
      logo: 'bulma-logo',
      article: {
        'title': 'title',
        'content': '# content'
      }
    }
  },
  methods: {
    getArticle (article) {
      console.log(article)
      this.article = article
    }
  },
  components: {
    MyHeader,
    FirstMenu,
    AsideMenu,
    MarkdownContent,
    AdminPanel
  }
}
</script>

<style scoped>

</style>