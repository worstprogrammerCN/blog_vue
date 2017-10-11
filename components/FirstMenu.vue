<template>
  <div class="tabs is-centered">
    <ul>
      <li v-for="firstMenu in firstMenuList" :key="firstMenu.id"
        :class="{ 'is-active': firstMenu.isActive }">
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
    }
  },
  methods: {
    changeFirstMenu (firstMenu) {
      this.$store.commit('onFirstMenuChanged', firstMenu)
      this.$emit('changeFirstMenu', firstMenu)
    }
  }
}
</script>

<style scoped>
@import url('bulma/css/bulma.css');

</style>
