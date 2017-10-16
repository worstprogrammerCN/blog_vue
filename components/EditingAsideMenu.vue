<template>
  <aside class="menu">
    <template v-for="secondMenu in secondMenuList">
      <p class="menu-label" :key="secondMenu._id">
          <span class="tag is-light">
            {{ secondMenu.name }}
            <button class="delete is-small" @click="deleteSecondMenu(secondMenu._id)"></button>
          </span>
      </p>
      <ul class="menu-list":key="secondMenu.id">
        <li class="tags has-addons" v-for="article in secondMenu.articles" :key="article._id">
          <span class="tag is-white">
            {{ article.title }}
            <button class="delete is-small" @click="deleteArticle( secondMenu._id, article._id)"></button>
          </span>
        </li>
      </ul>
    </template>
    <template v-if="secondMenuList">
      <p class="menu-label" v-if="isAdding">
        <input v-model="newSecondMenuName" class="input addingInput" type="text" placeholder="second menu">
        <button @click="createSecondMenu" class="button is-primary">确定</button>
        <button @click="cancelCreatingSecondMenu" class="button">取消</button>
      </p>
      <p class="menu-label" v-else>
        <button class="button is-primary" @click="startCreatingSecondMenu">新建</button>
      </p>
    </template>
  </aside> 
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      isAdding: false,
      newSecondMenuName: '',
      secondMenuApi: 'http://localhost:3000/api/secondMenu',
      articleApi: 'http://localhost:3000/api/article'
    }
  },
  computed: {
    secondMenuList () {
      return this.$store.state.secondMenuList
    },
    firstMenuId () {
      return this.$store.state.firstMenuId
    }
  },
  methods: {
    async deleteSecondMenu (secondMenuId) {
      // delete all articles from list
      // delete the menu
      // post delete request
      let { data } = await axios.delete(`${this.secondMenuApi}/${secondMenuId}`)
      let ok = data.ok
      if (!ok) {
        console.log('delete menu failed')
      } else {
        console.log('delete article', secondMenuId)
        this.$store.commit('deleteSecondMenu', secondMenuId) // if delete success
      }
    },
    async deleteArticle (secondMenuId, articleId) {
      let { data } = await axios.delete(`${this.articleApi}/${articleId}`)
      if (data.ok) {
        this.$store.commit('deleteArticle', { secondMenuId, articleId })
      }
    },
    startCreatingSecondMenu () {
      this.isAdding = true
      this.newSecondMenuName = ''
    },
    async createSecondMenu () {
      let firstMenuId = this.firstMenuId

      let { data } = await axios.put(this.secondMenuApi, { secondMenu: { firstMenuId, name: this.newSecondMenuName } })
      let ok = data.ok
      let _id = data._id
      if (!ok) {
        console.log('failed')
      } else {
        this.isAdding = false
        this.$store.commit('createSecondMenu', { _id, name: this.newSecondMenuName, isActive: false })
      }
    },
    cancelCreatingSecondMenu () {
      this.isAdding = false
    }
  }
}
</script>

<style scoped>

</style>