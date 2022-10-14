<!-- 업로드한 파일 제목: bd_NICKNAME_ddhhmmss.{png. jpg} -->
<!-- 서버 전달: File 객체 -->
<!-- DB 전달: 
  index: this.form.count,
  nickname: this.form.nickname,
  username: this.form.username,
  volIss: file.name -->
<!-- 추가할 수 있는 것: b-form-input 입력 처리 -->
<template>
  <div class="wrapper">
    <p>헌혈 증명서를 등록해주세요.</p>
    <b-form @submit="onSubmit">
      <!-- <b-form-input
          id="input-1"
          v-model="form.volTime"
          type="number"
          placeholder="헌혈 을 입력해주세요."
          required
        ></b-form-input> -->
      <b-form-file
          v-model="file1"
          :state="Boolean(file1)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          accept="image/jpg, image/png"
          required
        ></b-form-file>
        <div class="mt-3">Selected file: {{ file1 ? file1.name : '' }}</div>
      <b-button type="submit" variant="primary">제출</b-button>

      <router-link to="/mypage">
        <b-button href="/" variant="outline-primary">뒤로 가기</b-button>
      </router-link>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        // volTime: null,
        nickname: '',
        username: '',
        count: 0
      },
      file1: null
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();

    // bring user data
      await this.$axios.get("/api/auth_account/check")
      .then(response => {
        this.form.nickname = response.data.nickname;
        this.form.username = response.data.profile.username;
      })
      .catch(error => {
        console.log('error='+error)
      })
      // await this.$axios.post('/api/manage_page/nowvms',{nickname:this.form.nickname}).then((response)=>{
      //           console.log(response.data.volTime);
      //           if(response.data.volTime>this.form.volTime){
      //               alert("현재 기부액보다 낮은 값");
      //               location.href = '/mypage';
      //           }
      // });
    // bring vms count  
      await this.$axios.get("/api/vms_ins/blcount")
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
        = 'bd_'+escape(this.form.nickname) + '_' + date.getDate() + date.getHours() 
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
      let fd = new FormData();
        fd.append('file',file);
    // to Server
      await this.$axios.post('/api/upload', fd,{headers: {'Content-Type':'multipart/form-data'}})
      .then(res => {
        console.log('to sv res='+res);
        this.file1 = null;
        // this.volTime = '';
        this.volIss = ''
      })
      .catch(error => {
        console.log('To sv error.response='+error)
      });
    // to db(수정 예상)
      this.$axios.post('/api/vms_ins/blapply', {
        index: this.form.count,
        // volTime: this.form.volTime,
        bloodIss: unescape(file.name),
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
// // createObjectURL 사용
// this.form.imageData = window.URL.createObjectURL(this.file1);
// console.log('form.imageData='+this.form.imageData)
// this.form.imageData.onload = () => {
//   window.URL.revokeObjectURL(this.form.imageData)
//   console.log('after revoke, form.imageData='+this.form.imageData)
// }
// // FileReader 사용
// var reader = new FileReader();
// reader.readAsText(this.file1);
// // 
// reader.onload = () => {
//   this.imageData = reader.result;
//   console.log('imageData='+this.imageData);
// }
</script>

<style scoped>
form {
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.form-group {
  margin-bottom: 1rem;
}
</style>