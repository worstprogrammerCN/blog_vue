<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>
    <nuxt-link to="/home"> home </nuxt-link>
    <h1 id="test"></h1>
  </section>
</template>

<script>
import $ from 'jquery'

export default {
  head () {
    return {
      title: 'Users'
    }
  },
  mounted () {
    $(function () {
      $('#test').text('ok')
    })
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
