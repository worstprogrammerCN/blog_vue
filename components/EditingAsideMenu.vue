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
            <button class="delete is-small" @click="deleteArticle(secondMenu._id, article._id)"></button>
          </span>
        </li>
      </ul>
    </template>
    <template v-if="isFirstMenuActive">
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

export default {
  data () {
    return {
      isAdding: false,
      newSecondMenuName: ''
    }
  },
  computed: {
    isFirstMenuActive () {
      return !!this.$store.state.activeFirstMenu._id
    },
    secondMenuList () {
      return this.$store.state.secondMenuList
    }
  },
  methods: {
    deleteSecondMenu (secondMenuId) {
      this.$store.dispatch('deleteSecondMenu', secondMenuId)
    },
    deleteArticle (secondMenuId, articleId) {
      this.$store.dispatch('deleteArticle', { secondMenuId, articleId })
    },
    startCreatingSecondMenu () {
      this.isAdding = true
      this.newSecondMenuName = ''
    },
    async createSecondMenu () {
      this.$store.dispatch('createSecondMenu', this.newSecondMenuName)
        .then(({ ok }) => {
          if (ok) {
            this.isAdding = false
          }
        })
    },
    cancelCreatingSecondMenu () {
      this.isAdding = false
    }
  }
}
</script>

<style scoped>

</style>