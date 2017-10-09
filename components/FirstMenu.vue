<template>
  <div class="tabs is-centered">
    <ul>
      <li v-for="firstMenu in firstMenuList" :key="firstMenu.id"
        :class="{ 'is-active': firstMenu.isActive }">
        <a>{{ firstMenu.name }}</a>
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
    curFirstMenuId () {
      return this.$store.state.curFirstMenuId
    },
    isAdmin () {
      return this.$store.state.isAdmin
    },
    firstMenuList () {
      return this.$store.state.firstMenuList
    }
  }
}
</script>

<style scoped>
@import url('bulma/css/bulma.css');

</style>
