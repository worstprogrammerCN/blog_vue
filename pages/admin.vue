<template>
  <div>
    <MyHeader :logo="logo"/>
    <FirstMenu/>
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-2">
          <AsideMenu/>
        </div>
        <div class="column is-10">
          <nuxt-child></nuxt-child>
        </div>
      </div> 
    </div>
  </div>
  </div>  
</template>

<script>
import MyHeader from '~/components/Header.vue'
import FirstMenu from '~/components/FirstMenu.vue'
import AsideMenu from '~/components/AsideMenu.vue'
import MarkdownContent from '~/components/MarkdownContent.vue'

export default {
  data () {
    return {
      logo: 'bulma-logo',
      rawText: `# haha啊
> ok雷军`
    }
  },
  components: {
    MyHeader,
    FirstMenu,
    AsideMenu,
    MarkdownContent
  }
}
</script>

<style scoped>
@import url('bulma/css/bulma.css');
</style>
s