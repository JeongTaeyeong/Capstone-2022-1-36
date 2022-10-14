<!-- 마이 페이지 -->
<template>
  <div class="contents">
    <h3>마이 페이지</h3>
    <myinfolist></myinfolist>
  </div>
</template>

<script>
import MyInfoList from './components/MyInfoList.vue'

export default {
  components: {
    'myinfolist': MyInfoList
  }
}
</script>

<style scoped>

</style>