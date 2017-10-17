<template>
  <div class="tabs is-centered">
    <ul>
      <li v-for="firstMenu in firstMenuList" :key="firstMenu._id"
        :class="{ 'is-active': firstMenu._id === activeFirstMenu._id }">
        <a @click="changeFirstMenu(firstMenu)">{{ firstMenu.name }}</a>
      </li>
    </ul>
</div>
</template>

<script>

export default {
  data () {
    return {
      newFirstMenu: '',
      isAdding: false
    }
  },
  computed: {
    firstMenuList () {
      return this.$store.state.firstMenuList
    },
    activeFirstMenu () {
      return this.$store.state.activeFirstMenu
    }
  },
  methods: {
    changeFirstMenu (firstMenu) {
      this.$store.dispatch('changeFirstMenu', firstMenu)
    }
  }
}
</script>

<style scoped>
@import url('bulma/css/bulma.css');

</style>
