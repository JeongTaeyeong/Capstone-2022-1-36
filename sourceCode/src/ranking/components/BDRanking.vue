<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
      <!-- <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(nickname)="data">
        {{ data.items.nickname }}
      </template>
      <template #cell(bloodNum)="data">
        {{ data.items.bloodNum }}
      </template> -->
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: 'index',
          label: '랭킹',
        },
        {
          key: 'nickname',
          label: '닉네임',
        },        
        {
          key: 'bloodNum',  //
          label: '헌혈 횟수',
          sortable: true
        },
      ],
      items: [
        // { index: 1, name: '홍*동', email: 'a****@naver.com', prog: 100 },
        // { index: 2, name: 'A*C', email: 'g****@google.com', prog: 66 },
        // { index: 3, name: 'D*F', email: 'a****@daum.com', prog: 30 },
      ]
    }
  },
  created(){
    // 수정 필요
    this.$axios.get("/api/ranking/blood").then(response =>{
    console.log(response.data);
        var arr = response.data;
        for(var i in arr){
            if(i>0){
                if(arr[i].bloodNum == arr[i-1].bloodNum){
                    arr[i].index = arr[i-1].index;
                }
                else{
            arr[i].index = Number(i)+1;
        }
            }
            else{
            arr[i].index = Number(i)+1;
        }}
        this.items = arr;
    })
  }
}
</script>

<style>

</style>