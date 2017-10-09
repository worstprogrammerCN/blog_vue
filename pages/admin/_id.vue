<template>
  <div>
    <MarkdownContent :rawText="rawText"></MarkdownContent>
  </div>  
</template>

<script>
import MarkdownContent from '~/components/MarkdownContent.vue'

export default {
  async asyncData ({ params }) {
    return {
      rawText: `# id:${params.id}
> ok雷军`
    }
  },
  components: {
    MarkdownContent
  }
}
</script>

<style scoped>
@import url('bulma/css/bulma.css');
</style>