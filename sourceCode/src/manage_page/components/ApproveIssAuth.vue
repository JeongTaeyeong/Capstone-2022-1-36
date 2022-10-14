<template>
  <div>
    <b-form-group
        label="발급권한 승인 목록"
        v-slot="{ ariaDescribedby }"
        >
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="Iss Auth list"
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
        { nickname: '1', html: '대상자: AAA / 봉사시간: N 시간 <a target=&apos;_blank&apos; href="../../tmp/uploads/vol_nick1_23194735.png">파일 보기</a>' },
        { nickname: '2', html: '대상자: BBB / 봉사시간: N 시간 <a target=&apos;_blank&apos; href="">파일 보기</a>' },
        { value: '3', html: '대상자: CCC / 봉사시간: N 시간 <a target=&apos;_blank&apos; href="">파일 보기</a>' },
        { value: '4', html: '대상자: DDD / 봉사시간: N 시간 <a target=&apos;_blank&apos; href="">파일 보기</a>' },
      ],
        data:[]
    }
  },
    created(){
      this.$axios.get('/api/manage_page/issapplys').then((response)=>{
          console.log(response.data);
          this.data = response.data;
        console.log('response.data='+response.data);
        for(var i in this.data){
            this.data[i].html = '대상자: '+this.data[i].username+' / 신청업적: '+this.data[i].issName+' <a target=&apos;_blank&apos; href="../../tmp/uploads/'+this.data[i].issIss+'">파일 보기</a>';
            this.data[i].value = {index:this.data[i].index, issNum:this.data[i].issNum, nickname:this.data[i].nickname,username:this.data[i].username};
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
                    this.$axios.post('/api/manage_page/allowissapplys',this.selected[i]).then((response)=>{
                console.log(response);
            })
        }
        location.href='/manage_page';
    },
    submitRevise(event) {
      console.log(this.selected);
        for(var i in this.selected){
            this.$axios.post('/api/manage_page/denyissapplys',this.selected[i]).then((response)=>{
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