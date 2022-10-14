<!-- 발급할 NFT 선택 페이지 (인증 권한 가진 사람만) -->
<template>
  <div class="contents">
    <h3>NFT 발급 신청</h3>
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

<style>

</style>