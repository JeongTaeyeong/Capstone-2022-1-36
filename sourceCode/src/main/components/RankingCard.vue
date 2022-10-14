<!-- 
헌혈 랭킹: bd* / ex) bdrank, bdvalue
기부액 랭킹: d* / ex) drank, dvalue
axios get router 수정 필요
-->
<template>
  <b-card class="main-card">
    <h4 class="card-title">
      랭킹
      <span class="text-right">
        <router-link to="/ranking">
          <button class = "card-button" type="button">
            <img class="card-img" src="../../assets/cardButton.png"/>
          </button>
        </router-link>
      </span>
    </h4>
    <b-tabs content-class="mt-3">
      <b-tab title="업적 랭킹">
        <b-card-text>
          <!-- DB에서 불러내는 작업 필요. 최대 3개까지 -->
          {{ arank1 }}
          <b-progress :value="avalue1" :max="avalue1" height="1rem" show-value class="mb-1"></b-progress>
          {{ arank2 }}
          <b-progress :value="avalue2" :max="avalue1" height="1rem" show-value class="mb-2"></b-progress>
          {{ arank3 }}
          <b-progress :value="avalue3" :max="avalue1" height="1rem" show-value class="mb-3"></b-progress>
        </b-card-text>
      </b-tab> 
      <b-tab title="봉사시간 랭킹">
        <b-card-text>
          <!-- DB에서 불러내는 작업 필요. 최대 3개까지 -->
          {{ vrank1 }}
          <b-progress :value="vvalue1" :max="vvalue1" height="1rem" show-value class="mb-1"></b-progress>
          {{ vrank2 }}
          <b-progress :value="vvalue2" :max="vvalue1" height="1rem" show-value class="mb-2"></b-progress>
          {{ vrank3 }}
          <b-progress :value="vvalue3" :max="vvalue1" height="1rem" show-value class="mb-3"></b-progress>
        </b-card-text>
      </b-tab>
      <b-tab title="헌혈 랭킹">
          <b-card-text>
          <!-- DB에서 불러내는 작업 필요. 최대 3개까지 -->
          {{ bdrank1 }}
          <b-progress :value="bdvalue1" :max="bdvalue1" height="1rem" show-value class="mb-1"></b-progress>
          {{ bdrank2 }}
          <b-progress :value="bdvalue2" :max="bdvalue1" height="1rem" show-value class="mb-2"></b-progress>
          {{ bdrank3 }}
          <b-progress :value="bdvalue3" :max="bdvalue1" height="1rem" show-value class="mb-3"></b-progress>
        </b-card-text>
      </b-tab>
      <b-tab title="기부액 랭킹">
          <b-card-text>
          <!-- DB에서 불러내는 작업 필요. 최대 3개까지 -->
          {{ drank1 }}
          <b-progress :value="dvalue1" :max="dvalue1" height="1rem" show-value class="mb-1"></b-progress>
          {{ drank2 }}
          <b-progress :value="dvalue2" :max="dvalue1" height="1rem" show-value class="mb-2"></b-progress>
          {{ drank3 }}
          <b-progress :value="dvalue3" :max="dvalue1" height="1rem" show-value class="mb-3"></b-progress>
        </b-card-text>
      </b-tab>
      
    </b-tabs>
  </b-card>
</template>

<script>

export default {
  data () {
    return {
      avalue1: 0,
      avalue2: 0,
      avalue3: 0,

      arank1: 'none',
      arank2: 'none',
      arank3: 'none',
    
      vvalue1: 0,
      vvalue2: 0,
      vvalue3: 0,

      vrank1: 'none',
      vrank2: 'none',
      vrank3: 'none',
        
      bdvalue1: 0,
      bdvalue2: 0,
      bdvalue3: 0,

      bdrank1: 'none',
      bdrank2: 'none',
      bdrank3: 'none',
        
      dvalue1: 0,
      dvalue2: 0,
      dvalue3: 0,

      drank1: 'none',
      drank2: 'none',
      drank3: 'none',
    }
  },
  created(){
    this.$axios.get("/api/ranking/achieve").then(response =>{
        var data = response.data;
        var dat = data[0];
        this.avalue1 = dat.progressedAchieveNum,
        this.arank1 = dat.nickname
            if(data.length>1){
        dat = data[1];
        this.avalue2 = dat.progressedAchieveNum,
        this.arank2 = dat.nickname}
        if(data.length>2){
        dat = data[2];
        this.avalue3 = dat.progressedAchieveNum,
        this.arank3 = dat.nickname}
    });
    this.$axios.get("/api/ranking/vol").then(response =>{
        console.log(response);
        var data = response.data;
        var dat = data[0];
        this.vvalue1 = dat.volTime,
        this.vrank1 = dat.nickname
          if(data.length>1){
        dat = data[1];
        this.vvalue2 = dat.volTime,
        this.vrank2 = dat.nickname}
          if(data.length>2){
        dat = data[2];
        this.vvalue3 = dat.volTime,
        this.vrank3 = dat.nickname}
    });
    // this.$axios.get("/api/ranking/nft").then(response =>{
    //     var data = response.data;
    //     var dat = data[0];
    //     this.nvalue1 = dat.issuanceCount,
    //     this.nrank1 = dat.nickname
    //     if(data.length>1){
    //         dat = data[1];
    //         this.nvalue2 = dat.issuanceCount,
    //         this.nrank2 = dat.nickname}
    //     if(data.length>2){
    //         dat = data[2];
    //         this.nvalue3 = dat.issuanceCount,
    //         this.nrank3 = dat.nickname}
    // });
    // 수정 필요
    this.$axios.get("/api/ranking/blood").then(response =>{
        var data = response.data;
        var dat = data[0];
        this.bdvalue1 = dat.bloodNum, //
        this.bdrank1 = dat.nickname
        if(data.length>1){
            dat = data[1];
            this.bdvalue2 = dat.bloodNum, //
            this.bdrank2 = dat.nickname}
        if(data.length>2){
            dat = data[2];
            this.bdvalue3 = dat.bloodNum, //
            this.bdrank3 = dat.nickname}
    });
    // 수정 필요
    this.$axios.get("/api/ranking/done").then(response =>{
        var data = response.data;
        var dat = data[0];
        this.dvalue1 = dat.doneNum, //
        this.drank1 = dat.nickname
        if(data.length>1){
            dat = data[1];
            this.dvalue2 = dat.doneNum, //
            this.drank2 = dat.nickname}
        if(data.length>2){
            dat = data[2];
            this.dvalue3 = dat.doneNum, //
            this.drank3 = dat.nickname}
    });
  }
}
</script>

<style scoped>
.progress {
  margin-bottom: 1rem;
}
.main-card {
  border: 3px solid lightblue;
}
</style>