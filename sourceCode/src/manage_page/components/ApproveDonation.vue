<template>
  <div>
    <b-form-group
        label="기부액 승인 목록"
        v-slot="{ ariaDescribedby }"
        >
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="Donation list"
        value-field="value"
        stacked
      ></b-form-checkbox-group>
      <!-- 수정 -->
      <b-button @click="submitApprove" variant="primary">발급</b-button>
      <b-button @click="submitRevise" variant="danger">거절</b-button>
    </b-form-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [], // Must be an array reference!
      options: [
        // DB에서 불러오는 작업 필요
        { nickname: 'AAA', html: '대상자: AAA / 기부액: N 원 <a target=&apos;_blank&apos; href="">파일 보기</a>' },
        { nickname: 'BBB', html: '대상자: BBB / 기부액: N 원 <a target=&apos;_blank&apos; href="">파일 보기</a>' },
        { nickname: 'CCC', html: '대상자: CCC / 기부액: N 원 <a target=&apos;_blank&apos; href="">파일 보기</a>' },
        { nickname: 'DDD', html: '대상자: DDD / 기부액: N 원 <a target=&apos;_blank&apos; href="">파일 보기</a>' },
      ],
      data:[],
    }
  },
    created(){
      this.$axios.get('/api/manage_page/donapplys').then((response)=>{
          console.log(response.data);
          this.data = response.data;
        console.log('response.data='+response.data);
        for(var i in this.data){
            this.data[i].html = '대상자: '+this.data[i].username+' / 기부액: '+this.data[i].doneNum+' 원 <a target=&apos;_blank&apos; href="../../tmp/uploads/'+this.data[i].doneIss+'">파일 보기</a>';
            this.data[i].value = {index:this.data[i].index, doneNum:this.data[i].doneNum, nickname:this.data[i].nickname};
        }
        this.options = this.data;
        console.log('this.options='+this.options);
          //this.options = response.data;
      }) 
    },
    
  methods: {
    submitApprove(event) {
      console.log(this.selected);
      for(var i in this.selected){
        this.$axios.post('/api/manage_page/allowdonapplys',this.selected[i])
          .then((response)=>{
            console.log(response);
          })
      }
      location.href='/manage_page';
    },
    submitRevise(event) {
      console.log(this.selected);
      for(var i in this.selected){
          this.$axios.post('/api/manage_page/denydonapplys',this.selected[i])
            .then((response)=>{
              console.log(response);
            })
      }
      location.href='/manage_page';
    }
  }
}
</script>

<style scoped>
.bv-no-focus-ring {
  margin-bottom: 1rem;
  border: 1px solid black;
}
</style>