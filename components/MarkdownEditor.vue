<template>
    <div class="columns">
        <div class="column is-4">
            <textarea class="textarea" placeholder="e.g. Hello world" v-model="rawText"></textarea>
        </div>
        <div class="column inputBox">
            <div class="box">
                <div class="output" v-html="output"></div>
            </div>
        </div>
    </div>
</template>

<script>
import showdown from 'showdown'
var converter = new showdown.Converter()

export default {
  data () {
    return {
      converter,
      rawText: ''
    }
  },
  computed: {
    output () {
      return this.converter.makeHtml(this.rawText)
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
