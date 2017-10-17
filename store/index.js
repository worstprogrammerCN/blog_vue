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
    // 有菜单主界面状态, 编辑菜单状态, 浏览文章状态, 修改文章状态  , 以及新建文章状态
    //             main, editingMenu , viewing     , editingArticle, creatingArticle
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
      console.log(menu._id === state.activeFirstMenu._id)
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
      let activeArticle = state.activeArticle
      activeArticle.title = title
      activeArticle.content = content

      // 用splice替换掉菜单数组的文章, 才能被vue察觉数组变化
      let secondMenu = state.secondMenuList.find(menu => menu._id === activeArticle.secondMenuId)
      let articleIndex = secondMenu.articles.findIndex(article => article._id === activeArticle._id)
      secondMenu.articles.splice(articleIndex, 1, activeArticle)
    }
  },
  actions: {
    getFirstMenuList ({ commit }) {
      axios.get('http://localhost:3000/api/firstMenu')
        .then(({ data }) => {
          let firstMenuList = data
          commit('setFirstMenuList', firstMenuList)
        })
    },
    changeFirstMenu ({ state, commit }, firstMenu) {
      if (state.adminPageState !== 'editingMenu') {
        commit('setAdminPageState', 'main')
      }
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
    },
    postEditedArticle ({ commit }, article) {
      axios.post('http://localhost:3000/api/article', { article }).then(({ data }) => {
        if (data.ok) {
          commit('editArticle', { title: article.title, content: article.content })
          commit('setAdminPageState', 'viewing')
        }
      })
    },
    deleteSecondMenu ({ commit }, secondMenuId) {
      axios.delete(`http://localhost:3000/api/secondMenu/${secondMenuId}`)
        .then(({ data }) => {
          if (data.ok) {
            commit('deleteSecondMenu', secondMenuId)
          }
        })
    },
    deleteArticle ({ commit }, { secondMenuId, articleId }) {
      axios.delete(`http://localhost:3000/api/article/${articleId}`)
        .then(({ data }) => {
          if (data.ok) {
            console.log(secondMenuId, articleId)
            commit('deleteArticle', { secondMenuId, articleId })
          }
        })
    },
    createSecondMenu ({ state, commit }, name) {
      let firstMenuId = state.activeFirstMenu._id

      return axios.put('http://localhost:3000/api/secondMenu',
        { secondMenu: { firstMenuId, name } })
        .then(({ data }) => {
          if (data.ok) {
            commit('pushSecondMenu', { _id: data._id, name })
            return data
          }
        })
    }
  }
})

export default store
