<template>
    <div class="tabs is-centered">
        <ul>
            <li class="is-active">
            <a>
                <span class="icon is-small"><i class="fa fa-image"></i></span>
                <span>Pictures</span>
            </a>
            </li>
            <li>
            <a>
                <span class="icon is-small"><i class="fa fa-music"></i></span>
                <span>Music</span>
            </a>
            </li>
            <li>
            <a>
                <span class="icon is-small"><i class="fa fa-film"></i></span>
                <span>Videos</span>
            </a>
            </li>
            <li>
            <a>
                <span class="icon is-small"><i class="fa fa-file-text-o"></i></span>
                <span>Documents</span>
            </a>
            </li>
        </ul>
    </div>
  <!-- <div class="tabs is-centered">
    <ul>
    <li v-for="firstMenu in firstMenuList" :key="firstMenu.id"
        :class="{ 'is-active': firstMenu.isActive }">
        <a>{{ firstMenu.name }}</a>
    </li>
    </ul>
  </div> !-->
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
  }
}
</script>

<style scoped>

</style>
