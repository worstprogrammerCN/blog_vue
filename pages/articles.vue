<template>
  <div>
    <MyHeader :href="href" :logo="logo"/>
    <FirstMenu v-on:firstMenuChanged="refreshSecondMenu"/>
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-2">
          <AsideMenu/>
        </div>
        <div class="column">
          <MarkdownEditor v-if="isAdmin" :rawText="rawText"/>
          <MarkdownContent v-else :rawText="rawText"/>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import MyHeader from '~/components/Header.vue'
import MyFooter from '~/components/Footer.vue'
import FirstMenu from '~/components/FirstMenu.vue'
import AsideMenu from '~/components/AsideMenu.vue'
import MarkdownContent from '~/components/MarkdownContent.vue'
import MarkdownEditor from '~/components/MarkdownEditor.vue'

export default {
  async asyncData ({ isServer, store, req }) {
    return {
      rawText: `#asd 
      > asdf`,
      logo: 'bulma-logo'
    }
  },
  head () {
    return {
      title: 'article',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
        }
      ]
    }
  },
  computed: {
    href () {
      return this.$store.state.href
    },
    isAdmin () {
      return this.$store.state.isAdmin
    }
  },
  methods: {
    refreshSecondMenu (menuId) {
      // get secondMenu
    }
  },
  components: { MyHeader, MyFooter, FirstMenu, AsideMenu, MarkdownEditor, MarkdownContent }
}
</script>

<style scoped>
@import url('bulma/css/bulma.css');

</style>
