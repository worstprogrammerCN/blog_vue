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
                  {{ article.name }}
                </a>
            </li>
        </ul>
      </template>
    </aside> 
</template>

<script>

export default {
  data () {
    return {
      newSecondMenu: '',
      wantAddSecondMenu: false
    }
  },
  computed: {
    curSecondMenuId () {
      return this.$store.state.curSecondMenuId
    },
    curArticleId () {
      return this.$store.state.curArticleId
    },
    secondMenuList () {
      return this.$store.state.secondMenuList
    }
  },
  methods: {
    getArticle ({ secondMenuId, articleId }) {
      this.$store.state.curSecondMenuId = secondMenuId
      this.$store.state.curArticleId = articleId
      // getArticle by menu secondMenu and article id
      console.log('get article', this.$store.state.curSecondMenuId === this.curSecondMenuId,
        this.$store.state.curArticleId === this.curArticleId)
      // rawText = 
      // this.$emit('articleChanged', rawText)
    },
    cancelAddSecondMenu () {
      this.wantAddSecondMenu = false
      this.newSecondMenu = ''
    },
    addSecondMenu () {
      // add second menu
      this.$store.commit('addSecondMenu', {
        id: ('2'),
        name: this.newSecondMenu,
        articles: []
      })
    }
  }
}
</script>

<style scoped>
@import url('bulma/css/bulma.css');

</style>