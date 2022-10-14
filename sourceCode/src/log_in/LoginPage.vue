<!-- 로그인 페이지 -->
<!-- 로그인 성공, 실패 시 백엔드와 연동해서 작업 필요 -->
<template>
  <div class="login-page">
    <div class="login-container">
      <login-box></login-box>
    </div>
  </div>
</template>

<script>
import LoginBox from './components/LoginBox.vue'

export default {
  components: {
    'login-box': LoginBox
  }
}
</script>

<style scoped>
.login-page {
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100vh;
  background-image: url('../assets/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.login-container {
  margin: 1rem;
  padding: 3rem;
  background-color:white;
  border: 1px solid lightgray;
  border-radius: 10px;
}
</style>