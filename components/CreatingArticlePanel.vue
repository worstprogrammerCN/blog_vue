<template>
  <div>
    <div class="field is-grouped is-grouped-right">
        <p class="control">
            <a @click="createArticle" class="button is-primary" :disabled="isCreatable">
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
            <select v-model="selectedFirstMenuId">
              <option v-for="firstMenu in firstMenuList" :value="firstMenu.id">
                {{ firstMenu.name }}
              </option>
            </select>
          </div>
        </li>
        <li>
          <div class="select">
            <select  v-model="selectedSecondMenuId">
              <option v-for="secondMenu in secondMenuList" :value="secondMenu.id">
                {{ secondMenu.name }}
              </option>
            </select>
          </div>
        </li>
      </ul>
    </nav>

    <span>{{ selectedFirstMenu }}</span>

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

export default {
  data () {
    return {
      title: '',
      content: '',
      selectedFirstMenuId: this.$store.state.firstMenuList[0].id,
      selectedSecondMenuId: this.$store.state.secondMenuList[0].id
    }
  },
  computed: {
    firstMenuList () {
      return this.$store.state.firstMenuList
    },
    secondMenuList () {
      return this.$store.state.secondMenuList
    },
    isCreatable () {
      return this.firstMenuList.length > 0 &&
        this.secondMenuList.length > 0
    }
  },
  methods: {
    createArticle () {
      let article = {
        firstMenuId: this.selectedFirstMenuId,
        secondMenuId: this.selectedSecondMenuId,
        id: '4',
        title: this.title,
        content: this.content
      }
      // if post success
      this.$store.commit('createArticle', article)
      this.$emit('finishCreatingArticle')
    },
    cancelCreateArticle () {
      this.$emit('finishCreatingArticle')
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
