<template>
  <b-card-group deck>
    <b-card title="달성 업적">
      <b-card-text>{{ card1[0] }}</b-card-text>
      <b-card-text>{{ card1[1] }}</b-card-text>
      <b-card-text>{{ card1[2] }}</b-card-text>
      <router-link to="/progress/achieved" class="card-link">더보기</router-link>
    </b-card>

    <b-card title="보유 NFT(미구현)">
      <b-card-text v-show="card2.img1">
        <b-img :src="card2.img1"></b-img>  
        <b-img :src="card2.img2"></b-img>  
        <b-img :src="card2.img3"></b-img>
      </b-card-text>
      <router-link to="/progress/my_own_NFT" class="card-link">더보기</router-link>
    </b-card>

    <b-card title="전체업적">
      <router-link to="/progress/not_achieved" class="card-link">더보기</router-link>
    </b-card>

    <b-card title="진행도">
      <b-card-text>
        {{ card4.prog1 }}
        <b-progress :max="card4.max1" height="1rem">
          <b-progress-bar :value="card4.value1">
            <span><strong>{{ card4.value1 }} / {{ card4.max1 }}</strong></span>
          </b-progress-bar>
        </b-progress>
        {{ card4.prog2 }}
        <b-progress :max="card4.max2" height="1rem">
          <b-progress-bar :value="card4.value2">
            <span><strong>{{ card4.value2 }} / {{ card4.max2 }}</strong></span>
          </b-progress-bar>
        </b-progress>
        {{ card4.prog3 }}
        <b-progress :max="card4.max3" height="1rem">
          <b-progress-bar :value="card4.value3">
            <span><strong>{{ card4.value3 }} / {{ card4.max3 }}</strong></span>
          </b-progress-bar>
        </b-progress>
        {{ card4.prog4 }}
        <b-progress :max="card4.max4" height="1rem">
          <b-progress-bar :value="card4.value4">
            <span><strong>{{ card4.value4 }} / {{ card4.max4 }}</strong></span>
          </b-progress-bar>
        </b-progress>
      </b-card-text>
      <!-- <router-link to="/progress/progress_all" class="card-link">더보기</router-link> -->
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  data() {
    return {
      card1: [
        '',
        '',
        ''
      ],
      card2: {
        // img1: require("../../assets/background.jpg"),
        // img2: require("../../assets/googleIcon.png"),
        // img3: require("../../assets/facebookIcon.png"),
      },
      card3: {
        text1: '업적2',
        text2: '업적4',
        text3: '업적6',
      },
      card4: {
        value1: 0,
        max1: 0,
        value2: 0,
        max2: 0,
        value3: 0,
        max3: 0,
        value4: 0,
        max4: 0,

        prog1: '봉사시간',
        prog2: '기부액',
        prog3: '헌혈',
        prog4: 'NFT보유'
      }
    }
  },
    created(){
        this.$axios.get("/api/progress/viewprogress").then((response)=>{
          this.card4.value1 = response.data.volTime;
          if(this.card4.value1>=50){
              this.card4.max1 = 100;
              if(this.card4.value1>=100){
                  this.card4.max1 = 500;
                  if(this.card4.value1>=500){
                      this.card4.max1 = 1000;
                  }
              }
          }
          this.card4.value2 = response.data.doneNum;
          if(this.card4.value2>=100000){
              this.card4.max2 = 1000000;
              if(this.card4.value2>=1000000){
                  this.card4.max2 = 10000000;
              }
          }
          this.card4.value3 = response.data.bloodNum;
          if(this.card4.value3>=10){
              this.card4.max3 = 50;
              if(this.card4.value3>=50){
                  this.card4.max3 = 100;
              }
          }
      });
        this.$axios.get("/api/progress/viewachieve").then(response =>{
         console.log(response);
         for(var i=0;i<3;i++){
             this.card1.splice(i,1,response.data.ProgAchieve[i].nameAch);
             console.log(this.card1);
         }
     })
    }
}
</script>

<style scoped>
img {
  width: 5rem;
  height: 5rem;
  margin-bottom: 1rem;
}
.card {
  border: 3px solid lightblue;
  background-color: #fdfdfd;
  margin-bottom: 1rem;
}
</style>