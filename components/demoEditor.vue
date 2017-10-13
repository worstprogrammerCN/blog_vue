<template>
    <div>
        <template v-if="isCreating">
            <div class="field is-grouped is-grouped-right">
                <p class="control">
                    <a @click="upload" class="button is-primary">
                    发布
                    </a>
                </p>
                <p class="control">
                    <a @click="cancelUpload" class="button is-light">
                    取消编辑
                    </a>
                </p>
            </div>
            <div class="field">
                <div class="control">
                    <div class="select">
                        <select>
                            <option v-for="firstMenu in firstMenuList" :key="firstMenu.id">
                                {{ firstMenu.name }}    
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <div class="select">
                        <select>
                            <option v-for="secondMenu in secondMenuList", :key="secondMenu.id">
                                {{ secondMenu.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="field">
                <template v-if="!isCreating">
                    <div class="field is-grouped editedTitle">
                        <h3 class="title is-1">{{ title }}</h3>
                        <button @click="changeTitle" class="button is-primary is-medium">修改</button>
                    </div>
                </template>
                <template v-else>
                    <div class="field is-grouped" v-if="isEditingTitle">
                        <p class="control">
                            <input v-model="newTitle" class="input is-medium" type="text" placeholder="title">
                        </p>
                        <p class="control">
                            <button @click="submitTitle" class="button is-primary is-medium">
                            确认
                            </button>
                        </p>
                        <p class="control">
                            <button @click="cancelChangeTitle" class="button is-danger is-outlined is-medium">
                            取消
                            </button>
                        </p>
                    </div>
                    <div class="field is-grouped" v-else>
                        <h3 class="title is-1"> {{ title }}</h3>
                        <button class="button is-primary" @click="changeTitle">修改</button>
                    </div>
                </template>
            </div>
            <div class="columns">
                <div class="column is-4">
                    <textarea class="textarea" placeholder="e.g. Hello world" rows="25" v-model="text"></textarea>
                </div>
                <div class="column inputBox">
                    <MarkdownContent :rawText="text"></MarkdownContent>
                </div>
            </div>
        </template>
        <template v-else-if="isEditing">
            <div></div>
        </template>
        <template v-else>
            <h3 class="title"> haha </h3>
            <!-- <div class="field is-grouped is-grouped-left">
                <p class="control">
                    <button @click="startCreating" class="button is-primary">
                    新建文章
                    </button>
                </p>
            </div> -->
        </template>
    </div>
    
</template>

<script>
import MarkdownContent from '~/components/MarkdownContent.vue'

export default {
  props: ['rawText', 'rawTitle'],
  data () {
    return {
      text: this.rawText,
      title: '',
      isCreating: true,
      isEditing: false,
      isEditingTitle: false,
      newTitle: ''
    }
  },
  computed: {
    firstMenuList () {
      return this.$store.state.firstMenuList
    },
    secondMenuList () {
      return this.$store.state.secondMenuList
    }
  },
  mounted () {
    this.text = this.rawText
    this.title = this.rawTitle
  },
  components: { MarkdownContent }
}
</script>

<style scoped>
@import url('bulma/css/bulma.css');
</style>
