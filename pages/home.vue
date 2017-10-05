<template>
  <section class="hero is-info is-large">
    <!-- Hero header: will stick at the top -->
    <div class="hero-head">
        <mHeader :href="href" :logo="logo"></mHeader>
    </div>


    <div class="hero-body">
        <div class="container has-text-centered">
            <div class="title is-1">
                {{ this.$store.state.title }}
            </div>
            <div class="subtitle">
                {{ this.$store.state.subtitle }}
            </div>
        </div>
    </div>

    <div class="hero-foot">
        <hr>
        <div class="container">
            <div class="content has-text-centered">
                <p>
                    <strong>Bulma</strong> by <a href="http://jgthms.com">Zili Jin</a>. The source code is licensed
                    <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                    is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                </p>
                <p>
                    <a class="icon" href="https://github.com/jgthms/bulma">
                    <i class="fa fa-github"></i>
                    </a>
                </p>
            </div>
        </div>
    </div>
    <!-- Hero footer: will stick at the bottom
    <div class="hero-foot">
        <nav class="tabs is-boxed is-fullwidth">
        <div class="container">
            <ul>
                <li v-for="(page, index) in pages" :key="page.id"
                  :class="{ 'is-active': href == page.href }" @click="href=page.href">
                    <router-link :to="page.href">
                        {{ page.name }}
                    </router-link>
                </li>
            </ul>
        </div>
        </nav>
    </div> -->
    </section>
</template>

<script>
import mHeader from '~/components/Header.vue'

export default {
  async asyncData (context) {
    let ret = {
      logo: 'bulma-type-white'
    }
    if (context.isServer) {
      ret.href = context.req.url
    }
    return ret
  },
  components: { mHeader }
}
</script>

<style scoped>
@import url('bulma/css/bulma.css');

</style>
