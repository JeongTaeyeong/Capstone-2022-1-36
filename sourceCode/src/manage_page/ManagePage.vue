<!-- 관리자 승인 페이지 -->
<template>
  <div class="contents">
    <h3>관리자 승인 페이지</h3>
    <manage-content></manage-content>
  </div>
</template>

<script>
import ManageContent from './components/ManageContent.vue'

export default {
  components: {
    'manage-content': ManageContent
  }
}
</script>

<style scoped>

</style>