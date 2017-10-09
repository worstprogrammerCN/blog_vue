import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    href: '/',
    title: 'hello world',
    subtitle: '从群众中来，到群众中去',
    pages: [
      {
        'id': 0,
        'name': '主页',
        'href': '/home',
        'isActive': true
      },
      {
        'id': 1,
        'name': '文档',
        'href': '/articles',
        'isActive': false
      },
      {
        'id': 2,
        'name': '其它',
        'href': '/other',
        'isActive': false
      }
    ],
    firstMenuList: [{
      name: '技术',
      id: '0',
      isActive: true
    }, {
      name: '算法',
      id: '1',
      isActive: false
    }, {
      name: '资源',
      id: '2',
      isActive: false
    }],
    secondMenuList: [{
      id: '0',
      name: 'vue',
      articles: [{
        id: '0',
        title: 'vue first article',
        isActive: true
      }, {
        id: '1',
        title: 'vue second article',
        isActive: false
      }]
    }, {
      id: '1',
      name: 'nuxt',
      articles: [{
        id: '0',
        title: 'nuxt first article',
        isActive: false
      }]
    }],
    isAdmin: true
  },
  mutations: {
    addFirstMenu (state, menu) {
      state.firstMenuList.push(menu)
    },
    addSecondMenu (state, menu) {
      state.secondMenuList.push(menu)
    },
    deleteSecondMenu (state, menuId) {
      state.secondMenuList = state.secondMenuList.filter((menu) => menu.id !== menuId)
    },
    deleteArticle (state, { secondMenuId, articleId }) {
      let secondMenu = state.secondMenuList.find((menu) => menu.id === secondMenuId)
      secondMenu.articles = secondMenu.articles.filter((article) => article.id !== articleId)
    }
  }
})

export default store
