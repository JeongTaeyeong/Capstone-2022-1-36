<!-- 회원가입 페이지 -->

<template>
  <div class="contents">
    <h4>회원가입</h4>
		<auth-account-card></auth-account-card>
	</div>
</template>

<script>
import AuthAccountCard from './components/AuthAccountCard.vue'

export default {
	components: {
		'auth-account-card': AuthAccountCard
	}
}
</script>

<style scoped>

</style>