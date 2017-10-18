<template>
    <aside class="menu">
      <template v-for="secondMenu in secondMenuList">
        <p class="menu-label" :key="secondMenu._id">
            {{ secondMenu.name }}
        </p>
        <ul class="menu-list":key="secondMenu._id">
            <li v-for="article in secondMenu.articles" :key="article._id">
                <a :class="{'is-active': article._id === activeArticle._id}"
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
    },
    activeArticle () {
      return this.$store.state.activeArticle
    }
  },
  methods: {
    getArticle (articleHead) {
      let _id = articleHead._id
      if (articleHead._id === this.activeArticle._id) {
        return
      }
      this.$store.dispatch('getArticle', _id)
    }
  }
}
</script>

<style scoped>

</style>