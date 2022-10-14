<template>
  <div class="contents">
    <h3>발급 대상자 검색</h3>
    <username-inputbox></username-inputbox>
    <userlist></userlist>
    <added-userlist></added-userlist>
  </div>
</template>

<script>
import UserNameInputBox from './components/UserNameInputBox.vue'
import UserList from './components/UserList.vue'
import AddedUserList from './components/AddedUserList.vue'

export default {
  components: {
    'username-inputbox': UserNameInputBox,
    'userlist': UserList,
    'added-userlist': AddedUserList
  },
}
</script>

<style scoped>
input {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>