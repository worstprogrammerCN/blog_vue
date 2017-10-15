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
    firstMenuId: null,
    firstMenuList: null,
    secondMenuList: null,
    article: {
      firstMenuId: '0',
      secondMenuId: '1',
      _id: '1',
      title: 'title',
      content: '# original content'
    },
    leveledMenu: null,
    isAdmin: true
  },
  mutations: {
    setFirstMenuList (state, menuList) {
      state.firstMenuList = menuList
    },
    createFirstMenu (state, menu) {
      state.firstMenuList.push(menu)
    },
    deleteFirstMenu (state, menu) {
      if (menu.isActive) {
        state.secondMenuList = null
      }
      state.firstMenuList = state.firstMenuList.filter((firstMenu) => firstMenu._id !== menu._id)
    },
    onFirstMenuChanged (state, tMenu) {
      state.firstMenuList.forEach((menu, index) => { // 把选中的menu的状态设为激活，其它的设为不激活
        menu.isActive = menu._id === tMenu._id
        state.firstMenuList.splice(index, 1, menu)
      })
    },
    createSecondMenu (state, menu) {
      state.secondMenuList.push(menu)
    },
    deleteSecondMenu (state, menuId) {
      state.secondMenuList = state.secondMenuList.filter((menu) => menu._id !== menuId)
    },
    setSecondMenuList (state, menuList) {
      state.secondMenuList = menuList
    },
    createArticle (state, article) {
      if (!state.secondMenuList) {
        return
      }
      console.log(state.secondMenuList)
      let secondMenu = state.secondMenuList.find((secondMenu) => secondMenu._id === article.secondMenuId)
      if (!secondMenu) {
        return
      }
      secondMenu.articles.push({ _id: article._id, title: article.title, isActive: false })
    },
    deleteArticle (state, { secondMenuId, articleId }) {
      let secondMenu = state.secondMenuList.find((menu) => menu._id === secondMenuId)
      secondMenu.articles = secondMenu.articles.filter((article) => article._id !== articleId)
    },
    getArticle (state, tArticle) {
      state.article = tArticle
      // let menu = state.secondMenuList.find((menu) => menu._id === tArticle.secondMenuId)
      state.secondMenuList.forEach((menu, secondMenuIndex) => {
        menu.articles.forEach((article, index) => {
          article.isActive = article._id === tArticle._id && tArticle.secondMenuId === menu._id
          menu.articles.splice(index, 1, article)
        })
        state.secondMenuList.splice(secondMenuIndex, 1, menu)
      })
    },
    editArticle (state, { title, content }) {
      state.article.title = title
      state.article.content = content
    }
  }
})

export default store
