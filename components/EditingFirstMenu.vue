<template>
  <div class="tabs is-centered">
      <ul>
          <li v-for="firstMenu in firstMenuList" :key="firstMenu._id"
           :class="{ 'is-active': firstMenu._id === activeFirstMenu._id }">
            <a>
                <span>{{ firstMenu.name }}</span>
                <button @click="deleteFirstMenu( firstMenu )" class="delete is-small"></button>
            </a>
          </li>
          <template v-if="isAdding">
            <li>
              <input v-model="newFirstMenuName" class="input addingInput" type="text" placeholder="first menu">
              <button @click="createFirstMenu" class="button is-primary">确定</button>
              <button @click="cancelCreatingFirstMenu" class="button">取消</button>
              
            </li>
            <li class="errorMsg">
              <span>{{ errorMsg }}</span>
            </li>
          </template>
          <li v-else>
            <button @click="startCreatingFirstMenu" class="button is-primary">新建</button>
          </li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      isAdding: false,
      newFirstMenuName: '',
      errorMsg: '',
      api: 'http://localhost:3000/api/firstMenu'
    }
  },
  computed: {
    firstMenuList () {
      return this.$store.state.firstMenuList
    },
    activeFirstMenu () {
      return this.$store.state.activeFirstMenu
    }
  },
  methods: {
    startCreatingFirstMenu () {
      this.isAdding = true
      this.newFirstMenuName = ''
      this.errorMsg = ''
    },
    createFirstMenu () {
      if (this.newFirstMenuName === '') {
        this.errorMsg = 'should not be empty!'
        return
      }

      axios.put(this.api, { firstMenu: { name: this.newFirstMenuName } })
        .then((res) => {
          let ok = res.data.ok
          let _id = res.data._id
          if (!ok) {
            console.log('things wrong!')
            return
          }
          this.isAdding = false

          let newFirstMenu = {
            name: this.newFirstMenuName,
            _id,
            isActive: false
          }
          this.$store.commit('createFirstMenu', newFirstMenu)
        })
    },
    cancelCreatingFirstMenu () {
      this.isAdding = false
    },
    deleteFirstMenu (menu) {
      axios.delete(`${this.api}/${menu._id}`)
        .then((res) => {
          if (!res.data.ok) {
            console.log('fail!')
          } else {
            this.$store.commit('deleteFirstMenu', menu) // delete secondMenu
          }
        })
    }
  }
}
</script>

<style scoped>
.addingInput {
  width: 150px;
  margin-right: 5px;
}

.errorMsg{
  margin-left: 5px;
}
</style>
