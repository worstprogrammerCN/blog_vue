<template>
    <div class="box">
        <div class="output" v-html="output"></div>
    </div>
</template>

<script>
import showdown from 'showdown'
var converter = new showdown.Converter()

export default {
  props: ['rawText'],
  data () {
    return {
      output: converter.makeHtml(this.rawText)
    }
  },
  head () {
    return {
      script: [ 'https://cdnjs.cloudflare.com/ajax/libs/showdown/1.7.5/showdown.min.js' ]
    }
  }
}
</script>

<style scoped>
@import url('bulma/css/bulma.css');

.inputBox{
    margin-left: 5px;
}
</style>
