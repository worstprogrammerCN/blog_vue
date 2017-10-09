<template>
    <aside class="menu">
      <template v-for="secondMenu in secondMenuList">
        <p class="menu-label" :key="secondMenu.id">
            {{ secondMenu.name }}
        </p>
        <ul class="menu-list":key="secondMenu.id">
            <li v-for="article in secondMenu.articles" :key="article.id">
                <a :class="{'is-active': article.isActive}"
                  @click="getArticle({ secondMenuId: secondMenu.id, articleId: article.id })">
                  {{ article.title }}
                </a>
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
    getArticle ({ secondMenuId, articleId }) {
      // getArticle by menu secondMenu and article id
      let article = {
        title: 'my title got from aside menu',
        content: '# content'
      }
      this.$emit('getArticle', article)
    },
  }
}
</script>

<style scoped>

</style>