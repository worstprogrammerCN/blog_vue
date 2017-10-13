<template>
    <div class="container">
        <div class="columns">
            <div class="column is-4">
                <textarea class="textarea" placeholder="the article content" rows="25" v-model="content"></textarea>
            </div>
            <div class="column is-8">
                <MarkdownContent :rawText="content"></MarkdownContent>
            </div>
        </div>
    </div>
    
</template>

<script>
import MarkdownContent from '~/components/MarkdownContent.vue'

export default {
  props: ['tContent'],
  data () {
    return {
      content: this.tContent
    }
  },
  watch: {
    tContent (content) {
      this.content = content
    }
  },
  components: { MarkdownContent }
}
</script>

<style scoped>
</style>
