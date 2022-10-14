<!-- 랭킹 페이지 -->
<template>
  <div class="contents">
    <h3>랭킹</h3>
    <ranking-content></ranking-content>
  </div>
</template>

<script>
import RankingContent from './components/RankingContent.vue'
export default {
  components: {
    'ranking-content': RankingContent
  }
}
</script>

<style>

</style>