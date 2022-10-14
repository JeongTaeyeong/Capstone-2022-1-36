<template>
  <div class="wrapper">
    <hr>
    선택한 대상자 목록
    <hr>
    <div v-for="item in lists" :key="item.index">
      이름: {{ item.username }}<br>
      닉네임: {{ item.nickname }}<br>
      <hr>
    </div>
      <b-button @click = "onSubmit" variant="primary">발급</b-button>
    <router-link to="nft_choice">
      <b-button href="/" variant="outline-primary">뒤로 가기</b-button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [],
    }
  },
  created() {
    this.$EventBus.$on('addlist', this.receive) ;
      console.log(this.$route.query);
  },
  methods: {
      onSubmit(){
          console.log(this.$route.query.index);
          console.log("ok");
          var addr = '/nft_issue?index='+this.$route.query.index+"&nicklist="
          for(var i in this.lists){
              if(i==0){
                  addr += this.lists[i].nickname;
              }
              else{
                  addr += ","+this.lists[i].nickname;
              }
          }
          console.log(addr);
          location.href = addr;
      },
    receive(data) {
      console.log('data='+data)
      if (data.length === 0) {
        console.log("빈 리스트")
      }
      else 
      if (this.lists.includes(data)) {
        console.log("이미 존재");
      }
      else {
        this.lists.push(data);
      }
    },
  }
}
</script>

<style scoped>
.bv-no-focus-ring {
  margin-bottom: 0.5rem;
  overflow: scroll;
  height: 10rem;
}
.form-group {
  border: 1px solid black;
}
</style>