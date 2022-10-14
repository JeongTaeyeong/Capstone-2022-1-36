<template>
  <div class='contents'>
    <h3>보유 NFT</h3>
    <my-NFT-list></my-NFT-list>
  </div>
</template>

<script>
import MyNFTList from './components/OwnNFTList.vue'

export default {
  components: {
    'my-NFT-list': MyNFTList
  }
}
</script>

<style>

</style>