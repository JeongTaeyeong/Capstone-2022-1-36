<template>
  <div class="wrapper">
    <b-card-group deck>
      <b-card title="사용자 계정" class="main-card">
        <b-card-text>일반 사용자 계정</b-card-text>
        <router-link :to="{ path: 'user_account'}" append>
          <b-button href="/" variant="primary">회원가입</b-button>
        </router-link>
      </b-card>
      <b-card title="발급 계정" class="main-card">
        <b-card-text>NFT 발급 계정</b-card-text>
        <router-link :to="{ path: 'director_account'}" append>
          <b-button href="/" variant="secondary">회원가입</b-button>
      </router-link>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.main-card {
  border: 1px solid lightgreen;
  background-color: #fdfdfd;
  margin-bottom: 1rem;
}
</style>