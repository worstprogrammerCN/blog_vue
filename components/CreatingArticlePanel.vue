<template>
  <div>
    <div class="field is-grouped is-grouped-right">
        <p class="control">
            <a @click="createArticle" class="button is-primary" :disabled="!isCreatable">
            发布
            </a>
        </p>
        <p class="control">
            <a @click="cancelCreateArticle" class="button is-light">
            取消编辑
            </a>
        </p>
    </div>
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li>
          <div class="select">
            <select v-model="selectedFirstMenu">
              <option v-for="firstMenu in firstMenuList" :value="firstMenu">
                {{ firstMenu.name }}
              </option>
            </select>
          </div>
        </li>
        <li>
          <div class="select" v-if="selectedFirstMenu">
            <select v-model="selectedSecondMenu">
              <option v-for="secondMenu in selectedFirstMenu.secondMenuList" :value="secondMenu">
                {{ secondMenu.name }}
              </option>
            </select>
          </div>
        </li>
      </ul>
    </nav>

    <span>selectedFirstMenu {{ selectedFirstMenu }}</span>

    <p v-if="selectedFirstMenu">selectedFirstMenu.secondMenuList {{ selectedFirstMenu.secondMenuList }}</p>
    <p v-else>hasn't selected FirstMenu</p>
    <p>selectedSecondMenu {{ selectedSecondMenu }} </p>
    <p> isCreatable: {{ !!this.selectedFirstMenu && !!this.selectedSecondMenu }} </p>

    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input v-model="title" class="input titleInput">
      </div>
    </div>

    <div class="field">
      <label class="label">Content</label>
      <div class="MarkdownEditor">
          <div class="columns">
            <div class="column is-4">
              <textarea class="textarea" placeholder="the article content" rows="25" v-model="content"></textarea>
            </div>
            <div class="column is-8">
              <MarkdownContent :rawText="content"></MarkdownContent>
            </div>
          </div>
        </div>
      </div>  
    </div>
    
</template>

<script>
import MarkdownContent from '~/components/MarkdownContent.vue'
import axios from 'axios'

export default {
  data () {
    let fId = null
    let sId = null
    if (this.$store.state.firstMenuList) {
      fId = this.$store.state.firstMenuList[0]
    }
    if (this.$store.state.secondMenuList) {
      sId = this.$store.state.secondMenuList[0]
    }
    return {
      api: 'http://localhost:3000/api/article',
      title: '',
      content: '',
      selectedFirstMenu: fId,
      selectedSecondMenu: sId
    }
  },
  computed: {
    firstMenuList () {
      return this.$store.state.leveledMenu
    },
    secondMenuList () {
      return this.$store.state.secondMenuList
    },
    isCreatable () {
      return !!this.selectedFirstMenu && !!this.selectedSecondMenu // '!!'是为了把对象转成布尔值判断
    }
  },
  watch: {
    selectedFirstMenu (val) { // 当更改选中的一级菜单时，对应的二级菜单应当是处于没选中的状态的
      this.selectedSecondMenu = null
    }
  },
  methods: {
    createArticle () {
      if (!this.isCreatable) { // 按钮disabled但仍可点击触发该事件，故需要判断
        return
      }
      let article = {
        firstMenuId: this.selectedFirstMenu._id,
        secondMenuId: this.selectedSecondMenu._id,
        title: this.title,
        content: this.content
      }
      axios.put(this.api, { article }).then(({ data }) => {
        article._id = data._id
        if (data.ok) {
          this.$store.commit('createArticle', article)
          this.$store.commit('setArticlesPageState', 'main')
        }
      })
    },
    cancelCreateArticle () {
      this.$store.commit('setArticlesPageState', 'main')
    }
  },
  components: {
    MarkdownContent
  }
}
</script>

<style scoped>
.titleInput{
  width: 90%;
}
</style>
