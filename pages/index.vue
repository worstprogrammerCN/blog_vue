<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>
    <ul class="users">
      <li v-for="(user, index) in users" :key="index" class="user">
        <nuxt-link :to="{ name: 'id', params: { id: index }}">
          {{ user.name }}
        </nuxt-link>
      </li>
    </ul>
    <nuxt-link to="/home"> home </nuxt-link>
    <h1> {{ name }} </h1>
    <h1 id="test"></h1>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import $ from 'jquery'

export default {
  async asyncData (context) {
    let { data } = await axios.get('/api/users')
    let res = await axios.get('https://api.myjson.com/bins/mven1')
    return { users: data, name: res.data.name }
  },
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
