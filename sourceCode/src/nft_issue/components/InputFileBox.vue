<template>
  <div class="wrapper">
    <b-form-file
          v-model="file1"
          :state="Boolean(file1)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          accept="image/jpg, image/png"
          required
        ></b-form-file>
        <div class="mt-3">Selected file: {{ file1 ? file1.name : '' }}</div>

      <b-button type="submit" variant="primary" @click="onSubmit">제출</b-button>
      <router-link to="/user_search">
        <b-button href="/" variant="outline-primary">뒤로 가기</b-button>
      </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        nftind: 0,
          nftname:'',
          nickname:'',
        username: '',
        count: 0
      },
      file1: null,
        userlist: []
    }
  },
    created(){
        console.log(this.$route.query.nicklist.split(','));
        this.userlist = this.$route.query.nicklist.split(',');
        this.form.nftidn = this.$route.query.index;
        this.$axios.post("api/achieve/findachieve",{id:this.form.nftidn}).then((response)=>{
            this.form.nftname = response.data.Name;
        })
        console.log(this.userlist[0]);
        
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
        for(var i in this.userlist){
            await this.$axios.post('/api/manage_page/nownft',{nickname:this.userlist[i]}).then((response)=>{
          for(var i in response.data){
              if(this.form.nftidn==response.data[i].idAch){
                    alert("이미 있는 업적");
                    location.href = '/';
                }
          }
      });
        }

    // bring vms count  
      await this.$axios.get("/api/nft_issue/count")
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
        = 'nft_'+escape(this.form.nickname) + '_' + date.getDate() + date.getHours() 
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
        this.volTime = '';
        this.volIss = ''
      })
      .catch(error => {
        console.log('To sv error.response='+error)
      });
    // to db
        for(var i in this.userlist){
            this.$axios.post('/api/nft_issue/nftapply', {
        index: this.form.count++,
        nftNum: this.form.nftidn,
          nftName: this.form.nftname,
        nftIss: unescape(file.name),
        nickname: this.userlist[i],
        username: this.form.username,
      })
      .then(res => {
        if (res.status == 200) {
            location.href = "/";
            alert('제출 완료');
            //this.$store.commit("login", res.data);
          }
      })
      .catch(error => {
        console.log('error='+error)
      });
        }
      
    }
  }
}
</script>

<style>

</style>