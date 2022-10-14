<template>
  <div class="wrapper">
    <b-form-group label="발급 NFT 목록" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="NFT list"
        stacked
      ></b-form-checkbox-group>
      <!--    <router-link to="/user_search">-->
      <b-button type="submit" variant="primary" @click="onSubmit"
        >발급</b-button
      >
      <!--    </router-link>-->
    </b-form-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [], // Must be an array reference!
      options: [
        // 권한 신청과의 차이점: 권한을 받은 NFT 리스트만 표기해야 한다는 점
      ],
    };
  },
 async created() {
     this.cre()  
    },
  methods: {
      async cre() {
          var list;
     await this.$axios.get('/api/nft_choice/viewlist').then((response)=>{
          list = response.data.issList;
         console.log(response.data.issList);
          
      });
          for(var i in list){
              console.log(i);
              await this.$axios.post('/api/achieve/findachieve',{id:list[i]}).then((response2)=>{
                  console.log(response2);
                  list[i] = {text: response2.data.Name, value: list[i]};
              })
              console.log(list);
          }
          this.options = list;
    },
    onSubmit(event) {
      event.preventDefault();
        console.log(this.selected);
      if (this.selected.length == 1) {
        location.href = "/user_search?index=" + this.selected[0];
      } else {
        console.log("하나의 nft를 선택해주세요.");
      }
    },
  },
};
</script>

<style scoped>
.bv-no-focus-ring {
  margin-bottom: 1rem;
}
</style>
