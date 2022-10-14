<template>
  <div class="main-box" v-if="img !== ''">
    <p class="p-bold">최근 발행 NFT</p>
    <b-img-lazy
      b-img
      class="nft-image"
      v-bind="mainProps"
      alt="최근 발행된 NFT가 없음"
      :src=img
    ></b-img-lazy>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: ''
    }
  },
  created() {
    // 수정 필요
    this.$axios.get("/api/image/getimage2",{responseType: "arraybuffer"}).then(response => {
      console.log(response.data)
            const blob = new Blob([response.data], {type: 'image/png'});
            console.log(response.data);
            console.log(blob);
            this.img = URL.createObjectURL(blob);
    })
    .catch (error => {

    })
  }
}
</script>

<style scoped>
.main-box {
  margin-bottom: 1rem;
}
.p-bold {
  font-weight: bold;
}
.nft-image {
  width: 5rem;
  height: 5rem;
}
</style>