<!-- uri 수정 필요, 기존 헌혈 횟수 불러오기 필요 -->
<template>
  <div>
    <b-form-group
        label="헌혈 승인 목록"
        v-slot="{ ariaDescribedby }"
        >
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="BD list"
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
        { nickname: '1', html: '대상자: AAA / <a target=&apos;_blank&apos; href="">파일 보기</a>' },
        { nickname: '2', html: '대상자: BBB / <a target=&apos;_blank&apos; href="">파일 보기</a>' },
        { nickname: '3', html: '대상자: CCC / <a target=&apos;_blank&apos; href="">파일 보기</a>' },
        { nickname: '4', html: '대상자: DDD / <a target=&apos;_blank&apos; href="">파일 보기</a>' },
      ],
      data:[],
    }
  },
    created(){
      this.$axios.get('/api/manage_page/bldapplys').then((response)=>{
          console.log(response.data);
          this.data = response.data;
        console.log('response.data='+response.data);
        for(var i in this.data){
            this.data[i].html = '대상자: '+this.data[i].username+' / <a target=&apos;_blank&apos; href="../../tmp/uploads/'+this.data[i].bloodIss+'">파일 보기</a>';
            this.data[i].value = {index:this.data[i].index, nickname:this.data[i].nickname};
        }
        this.options = this.data;
        console.log('this.options='+this.options);
          //this.options = response.data;
      }) 
    },
    
  methods: {
    async submitApprove(event) {
      console.log(this.selected);
        for(var i in this.selected){
          await this.$axios.post('/api/manage_page/allowbldapplys',this.selected[i])
            .then((response)=>{
              console.log(response);
            })
        }
        location.href='/manage_page';
    },
    submitRevise(event) {
      console.log(this.selected);
        for(var i in this.selected){
            this.$axios.post('/api/manage_page/denybldapplys',this.selected[i])
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