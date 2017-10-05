<template>
    <header class="nav navbar is-light">
        <div class="container">
            <div class="nav-left">
            <a class="nav-item">
                <img v-if="logoHref == 'bulma-logo'" src="~static/bulma-logo.png" alt="Logo">
                <img v-else-if="logoHref == 'bulma-type-white'" src="~static/bulma-type-white.png" alt="Logo">
            </a>
            </div>
            <span class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
            </span>
            <div class="nav-right nav-menu">
                <router-link v-for="(page, index) in pages" :key="page.id"
                  :to="page.href" 
                  :class="{ 'is-active' : href == page.href, 'nav-item': true }">
                  {{ page.name }}
                </router-link>
                <span class="nav-item">
                    <a class="button is-info is-inverted" href="https://github.com/worstprogrammerCN">
                    <span class="icon">
                        <i class="fa fa-github"></i>
                    </span>
                    <span>myGithub</span>
                    </a>
                </span>
            </div>
        </div>
    </header> 
</template>


<script>

export default {
  props: ['href', 'logo'],
  data () {
    return {
      title: 'Hello World.',
      subtitle: '从群众中来，到群众中去',
      pages: this.$store.state.pages,
      logoHref: this.logo
    }
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
  }
}
</script>

<style scoped>
@import url('bulma/css/bulma.css');

</style>
