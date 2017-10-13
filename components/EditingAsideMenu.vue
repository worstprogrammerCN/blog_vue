<template>
  <aside class="menu">
    <template v-for="secondMenu in secondMenuList">
      <p class="menu-label" :key="secondMenu.id">
          <span class="tag is-light">
            {{ secondMenu.name }}
            <button class="delete is-small" @click="deleteSecondMenu(secondMenu.id)"></button>
          </span>
      </p>
      <ul class="menu-list":key="secondMenu.id">
        <li class="tags has-addons" v-for="article in secondMenu.articles" :key="article.id">
          <span class="tag is-white">
            {{ article.title }}
            <button class="delete is-small" @click="deleteArticle(secondMenu.id, article.id)"></button>
          </span>
        </li>
      </ul>
    </template>
  </aside> 
</template>

<script>

export default {
  computed: {
    secondMenuList () {
      return this.$store.state.secondMenuList
    }
  },
  methods: {
    deleteSecondMenu (secondMenuId) {
      // delete all articles from list
      // delete the menu
      // post delete request
      console.log('delete article', secondMenuId)
      this.$store.commit('deleteSecondMenu', secondMenuId) // if delete success
    },
    deleteArticle (secondMenuId, articleId) {
      // post delete request
      // delete article from list
      console.log('delete article', secondMenuId, articleId)
      this.$store.commit('deleteArticle', { secondMenuId, articleId }) // if delete success
    }
  }
}
</script>

<style scoped>

</style>