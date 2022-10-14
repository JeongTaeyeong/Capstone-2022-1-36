<!-- 발급 계정 입력 폼 -->
<template>
  <div class="contents">
    <h4>발급 계정 회원가입</h4>
    <dir-account-input-form></dir-account-input-form>
  </div>
</template>

<script>
import DirectorAccountInputForm from './components/directorAccountInputForm.vue'

export default {
  components: {
    'dir-account-input-form': DirectorAccountInputForm
  }
}
</script>

<style scoped>

</style>