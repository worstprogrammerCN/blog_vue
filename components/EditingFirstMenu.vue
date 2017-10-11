<template>
  <div>
    <div class="tabs is-centered">
        <ul>
            <li v-for="firstMenu in firstMenuList" :key="firstMenu.id"
             :class="{ 'is-active': firstMenu.isActive}">
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
  </div>
</template>

<script>

export default {
  data () {
    return {
      isAdding: false,
      newFirstMenuName: '',
      errorMsg: ''
    }
  },
  computed: {
    firstMenuList () {
      return this.$store.state.firstMenuList
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
      // post create request
      // ...
      // if seccuess
      this.isAdding = false
      console.log('post ', this.newFirstMenuName)

      let newFirstMenu = {
        name: this.newFirstMenuName,
        id: '4',
        isActive: false
      }
      this.$store.commit('createFirstMenu', newFirstMenu)
    },
    cancelCreatingFirstMenu () {
      this.isAdding = false
    },
    deleteFirstMenu (menu) {
      this.$store.commit('deleteFirstMenu', menu) // delete secondMenu
      console.log('deleteFirstMenu')
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
