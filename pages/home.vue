<template>
  <section class="hero is-info is-large">
    <!-- Hero header: will stick at the top -->
    <div class="hero-head">
        <MyHeader :href="href" :logo="logo"></MyHeader>
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
        <MyFooter/>
    </div>

    </section>
</template>

<script>
import MyHeader from '~/components/Header.vue'
import MyFooter from '~/components/Footer.vue'

export default {
  async asyncData ({ isServer, store, req }) {
    // if (isServer) {
    //   store.state.href = req.url
    // }
    return {
      logo: 'bulma-type-white'
    }
  },
  computed: {
    href () {
      return this.$store.state.href
    }
  },
  components: { MyHeader, MyFooter }
}
</script>

<style scoped>
@import url('bulma/css/bulma.css');
section.hero{
  height: 100vh;
}
</style>
