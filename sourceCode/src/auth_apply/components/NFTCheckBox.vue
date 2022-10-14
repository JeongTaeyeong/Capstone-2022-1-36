<template>
  <div class="wrapper">
    <b-form-group
        label="발급 NFT 목록"
        v-slot="{ ariaDescribedby }"
        >
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="NFT list"
        stacked
      ></b-form-checkbox-group>
    </b-form-group>

    <!-- Styled -->
    <b-form-file
      v-model="file1"
      :state="Boolean(file1)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <div class="mt-3">Selected file: {{ file1 ? file1.name : '' }}</div>
    
    <b-button type="submit" variant="primary" @click="onSubmit">발급권한 신청</b-button>
    <router-link to="/mypage">
      <b-button href="/" variant="outline-primary">뒤로 가기</b-button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [], // Must be an array reference!
      options: [
        // 수정 필요. DB에서 불러와서 배치
        // { text: 'num1', value: '1번' },
        // { text: 'num2', value: '2번' },
        // { text: 'num3', value: '3번' },
        // { text: 'num4', value: '4번' }
      ],
      file1: null,
        form: {
            nickname: '',
            username: '',
            count: 0,
        }
    }
  },
  created() {
    this.$axios.get("/api/achieve/loadcond").then(response => {
      var arr = response.data;
        console.log(arr);
      this.options = arr;
        for(var i in arr){
            this.options[i].text = "NFT명: "+this.options[i].Name;
            this.options[i].value = {id: this.options[i].Id, name:this.options[i].Name};
        }
    })
    .catch(function (error) {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        }
        else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
  },
    methods: {
    async onSubmit(event) {
      event.preventDefault();

    // bring user data
      await this.$axios.get("/api/auth_account/check")
      .then(response => {
        this.form.email = response.data.email;
        this.form.nickname = response.data.nickname;
          console.log(this.form.nickname);
        this.form.username = response.data.profile.username;
      })
      .catch(error => {
        console.log('error='+error)
      })
      await this.$axios.post('/api/manage_page/nowiss',{nickname:this.form.nickname,email:this.form.email}).then((response)=>{
                console.log(response.data.issList);
          for(var i in response.data.issList){
              if(response.data.issList[i]==this.selected[0].id){
                  alert("이미 허가된 권한!");
                  //location.href = '/mypage';
              }
          }
            
      });
        await this.$axios.get("/api/auth_apply/count")
      .then(response => {
        this.form.count = response.data;
        if(this.form.count == null){
          this.form.count = 0;
        }
      })
      .catch(error => {
        console.log('error='+error)
      })

    // making image file + filename
      var date = new Date();
      var fileName 
        = 'iss_'+escape(this.form.username) + '_' + date.getDate() + date.getHours() 
        + date.getMinutes() + date.getSeconds();
      if (this.file1.type == 'image/jpg') {
        fileName += '.jpg';
      }
      else {
        fileName += '.png';
      }
      var file = new File([this.file1], fileName, {type: this.file1.type});
      
      console.log(file);
      console.log('file1.name='+this.file1.name)
      console.log('file.name='+file.name);
      
    // to Server
      await this.$axios.post('/api/upload', {file:file},{headers: {'Content-Type':'multipart/form-data'}})
      .then(res => {
        console.log('to sv res='+res);
        this.file1 = null;
      })
      .catch(error => {
        console.log('To sv error.response='+error)
      });
    // to db
      this.$axios.post('/api/auth_apply/issapply',{
        index: this.form.count,
        issNum: this.selected[0].id,
        issName: this.selected[0].name,
        issIss: unescape(file.name),
        nickname: this.form.nickname,
        username: this.form.username,
      })
      .then(res => {
        if (res.status == 200) {
            location.href = "/mypage";
            alert('제출 완료');
            //this.$store.commit("login", res.data);
          }
      })
      .catch(error => {
        console.log('error='+error)
      })
    }
  }
}
</script>

<style>

</style>