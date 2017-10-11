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
            <AdminPanel :tArticle="article"/>
          </div>
        </div> 
      </div>
    </template>
    <template v-else>
      <FirstMenu v-on:changeFirstMenu="getSecondMenuList"/>
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-2">
            <AsideMenu @getArticle="getArticle" v-on:startEditingMenu="startEditingMenu"/>
          </div>
          <div class="column is-10">
            <AdminPanel :tArticle="article"/>
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
import AdminPanel from '~/components/AdminPanel.vue'

// 有编辑菜单状态, 浏览文章状态, 修改文章状态, 以及新建文章状态
export default {
  data () {
    return {
      logo: 'bulma-logo',
      article: {
        firstMenuId: '0',
        secondMenuId: '1',
        id: '1',
        title: 'title',
        content: '# original content'
      },
      isEditing: false
    }
  },
  methods: {
    getArticle (article) {
      // post getArticle request
      console.log(article)
      this.article = article
    },
    getSecondMenuList (firstMenu) {
      // post getSecondMenuList request
      console.log(firstMenu.name)
      let secondMenuList = [{
        id: '0',
        name: 'second menu1',
        articles: [{
          id: '0',
          title: 'vue article1',
          isActive: false
        }, {
          id: '1',
          title: 'vue article2',
          isActive: false
        }]
      }, {
        id: '1',
        name: 'menu 2',
        articles: [{
          id: '0',
          title: 'nuxt article1',
          isActive: false
        }]
      }]
      this.$store.commit('changeSecondMenuList', secondMenuList)
    },
    startEditingMenu () {
      this.isEditing = true
      console.log('startEditingMenu!')
    }
  },
  components: {
    MyHeader,
    FirstMenu,
    AsideMenu,
    AdminPanel
  }
}
</script>

<style scoped>

</style>