import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

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
    adminPageState: 'main',
    activeFirstMenu: {},
    activeArticle: {},
    firstMenuList: [],
    secondMenuList: [],
    leveledMenu: null,
    isAdmin: true
  },
  mutations: {
    setAdminPageState (state, nState) {
      state.adminPageState = nState
    },
    setFirstMenuList (state, menuList) {
      state.firstMenuList = menuList
      state.activeFirstMenu = {}
    },
    createFirstMenu (state, menu) { // push a newly created first menu
      state.firstMenuList.push(menu)
    },
    deleteFirstMenu (state, menu) {
      if (menu._id === state.activeFirstMenu._id) { // if (deleted menu is active)
        state.secondMenuList = []
        state.activeFirstMenu = {}
        state.activeArticle = {}
      }
      // 删除该菜单
      state.firstMenuList = state.firstMenuList.filter((firstMenu) => firstMenu._id !== menu._id)
    },
    setActiveFirstMenu (state, menu) {
      state.activeFirstMenu = menu
    },
    pushSecondMenu (state, menu) {
      state.secondMenuList.push(menu)
    },
    deleteSecondMenu (state, menuId) {
      if (state.activeArticle && menuId === state.activeArticle.secondMenuId) {
        state.activeArticle = {}
      }
      state.secondMenuList = state.secondMenuList.filter((menu) => menu._id !== menuId)
    },
    setSecondMenuList (state, menuList) {
      state.secondMenuList = menuList
      state.activeArticle = {}
    },
    createArticle (state, article) {
      if (!state.secondMenuList) { // 未加载二级菜单
        return
      }
      let secondMenu = state.secondMenuList.find(secondMenu => secondMenu._id === article.secondMenuId)
      if (!secondMenu) { // 文章不在当前二级菜单内
        return
      }
      secondMenu.articles.push({ _id: article._id, title: article.title })
    },
    deleteArticle (state, { secondMenuId, articleId }) {
      if (state.activeArticle && articleId === state.activeArticle._id) {
        state.activeArticle = null
      }
      let secondMenu = state.secondMenuList.find(menu => menu._id === secondMenuId)
      secondMenu.articles = secondMenu.articles.filter(article => article._id !== articleId)
    },
    setActiveArticle (state, article) {
      state.activeArticle = article
    },
    editArticle (state, { title, content }) {
      state.activeArticle.title = title
      state.activeArticle.content = content
    }
  },
  actions: {
    changeFirstMenu ({ commit }, firstMenu) {
      commit('setAdminPageState', 'main')
      commit('setActiveFirstMenu', firstMenu)
      axios.get('http://localhost:3000/api/secondMenu', { params: { firstMenuId: firstMenu._id } })
        .then(res => {
          let ok = res.data.ok
          let secondMenuList = res.data.secondMenuList

          if (ok) {
            commit('setSecondMenuList', secondMenuList)
          }
        })
    },
    getLeveledMenu ({ state }) {
      axios.get('http://localhost:3000/api/leveledMenu').then(({ data }) => {
        state.leveledMenu = data
      })
    }
  }
})

export default store
