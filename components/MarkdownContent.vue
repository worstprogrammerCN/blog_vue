<template>
    <div class="content">
      <div class="output" v-html="output"></div>
    </div>
</template>

<script>
import showdown from 'showdown'
var converter = new showdown.Converter()

export default {
  props: ['rawText'],
  computed: {
    output: function () {
      return converter.makeHtml(this.rawText)
    }
  }
}
</script>

<style scoped>
.inputBox{
    margin-left: 5px;
}
</style>
