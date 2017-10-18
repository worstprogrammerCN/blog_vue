<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.3/css/bulma.min.css" />
    <MyHeader :logo="logo"/>
    <FirstMenu />
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-2">
          <AsideMenu />
        </div>
        <div class="column is-10">
          <VisitorPanel />
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import MyHeader from '~/components/Header.vue'
import FirstMenu from '~/components/FirstMenu.vue'
import AsideMenu from '~/components/AsideMenu.vue'
import VisitorPanel from '~/components/VisitorPanel.vue'

export default {
  created () {
    this.$store.dispatch('getFirstMenuList')
  },
  data () {
    return {
      logo: 'bulma-logo'
    }
  },
  computed: {
    isEditing () {
      return this.$store.state.articlePageState === 'editingMenu'
    }
  },
  components: {
    MyHeader,
    FirstMenu,
    AsideMenu,
    VisitorPanel
  }
}
</script>

<style scoped>
</style>
