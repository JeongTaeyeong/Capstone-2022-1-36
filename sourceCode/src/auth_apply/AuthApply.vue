<!-- 권한 신청 페이지 -->
<!-- 현재 발급 중인 NFT 목록 및 발급 권한 신청 -->
<template>
  <div class="contents">
    <h3>권한 신청</h3>
    <nft-checkbox></nft-checkbox>
  </div>
</template>

<script>
import NFTCheckBox from './components/NFTCheckBox.vue'

export default {
  components: {
    'nft-checkbox': NFTCheckBox
  }
}
</script>

<style scoped>

</style>