<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
    <!-- <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(nickname)="data">
        {{ data.items.nickname }}
      </template>
      <template #cell(volTime)="data">
        {{ data.items.volTime }}
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
          key: 'progressedAchieveNum',
          label: '업적 갯수',
          sortable: true
        },
      ],
      items: [
        // { index: 1, name: 'A*C', email: 'a****@naver.com', prog: 1000 },
        // { index: 2, name: 'D*F', email: 'g****@google.com', prog: 660 },
        // { index: 3, name: '홍*동', email: 'a****@daum.com', prog: 300 },
      ]
    }
  },
created(){
    this.$axios.get("/api/ranking/achieve").then(response =>{
    console.log(response.data);
        var arr = response.data;
        for(var i in arr){
            if(i>0){
                if(arr[i].progressedAchieveNum == arr[i-1].progressedAchieveNum){
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