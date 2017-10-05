<template>
  <div>
    <mHeader :href="href" :logo="logo"></mHeader>
    <div class="tabs is-large is-centered">
      <ul>
        <li class="is-active"><a>Pictures</a></li>
        <li><a>Music</a></li>
        <li><a>Videos</a></li>
        <li><a>Documents</a></li>
      </ul>
    </div>
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-2">
          <AsideMenu></AsideMenu>
        </div>
        <div class="column">
          <MarkdownContent rawText="# aaaasd"></MarkdownContent>
        </div>
      </div> 
    </div>

  </div>
</template>

<script>
import mHeader from '~/components/Header.vue'
import AsideMenu from '~/components/AsideMenu.vue'
import MarkdownContent from '~/components/MarkdownContent.vue'

export default {
  async asyncData (context) {
    let ret = {
      logo: 'bulma-logo'
    }
    if (context.isServer) {
      ret.href = context.req.url
    }
    return ret
  },
  head () {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
        }
      ]
    }
  },
  components: { mHeader, AsideMenu, MarkdownContent }
}
</script>

<style scoped>
@import url('bulma/css/bulma.css');

</style>
