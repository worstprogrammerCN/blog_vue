<template>
    <aside class="menu">
      <template v-for="secondMenu in secondMenuList">
        <p class="menu-label" :key="secondMenu._id">
            {{ secondMenu.name }}
        </p>
        <ul class="menu-list":key="secondMenu._id">
            <li v-for="article in secondMenu.articles" :key="article._id">
                <a :class="{'is-active': article.isActive}"
                  @click="getArticle(article)">
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
    getArticle (articleHead) {
      if (articleHead.isActive) {
        return
      }
      // getArticle by menu secondMenu and article id
      let article = {
        firstMenuId: '0',
        secondMenuId: '0',
        id: '1',
        title: 'my title got from aside menu',
        content: '# content'
      }
      this.$store.commit('getArticle', article)
    }
  }
}
</script>

<style scoped>

</style>