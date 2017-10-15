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
import axios from 'axios'

export default {
  data () {
    return {
      api: 'http://localhost:3000/api/article'
    }
  },
  computed: {
    secondMenuList () {
      return this.$store.state.secondMenuList
    }
  },
  methods: {
    async getArticle (articleHead) {
      let _id = articleHead._id
      if (articleHead.isActive) {
        return
      }
      let { data } = await axios.get(this.api, { params: { _id } })
      let ok = data.ok
      let article = data.article
      if (ok) {
        this.$store.commit('getArticle', article)
      }
    }
  }
}
</script>

<style scoped>

</style>