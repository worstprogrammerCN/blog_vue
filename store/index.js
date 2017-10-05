import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    title: 'hello world',
    subtitle: '从群众中来，到群众中去',
    pages: [
      {
        'id': 0,
        'name': '主页',
        'href': '/home'
      },
      {
        'id': 1,
        'name': '文档',
        'href': '/articles'
      },
      {
        'id': 2,
        'name': '其它',
        'href': '/other'
      }
    ]
  },
  mutations: {

  }
})

export default store
