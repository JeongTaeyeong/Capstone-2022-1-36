<template>
  <div class="wrapper">
    <h2>로그인</h2>
    <b-form @submit="onSubmit">
      <!-- 대표 이메일 -->
      <b-form-input
        id="input-1"
        v-model="form.email"
        type="email"
        placeholder="Email"
        required
      ></b-form-input>
      <!-- password -->
      <b-form-input
        id="input-2"
        v-model="form.password"
        type="password"
        placeholder="Password"
        aria-describedby="password-help-block"
        required
      ></b-form-input>
      <b-button type="submit" variant="primary">로그인</b-button>
    </b-form>
    
    <!-- API 연결하기 -->
    <!-- 구글 API, 정책에 따라 정해진 이미지만 사용 가능-->
    <!-- URi 수정 필요-->
    <!-- <div id="g_id_onload"
     data-client_id="1066448151508-13obd0kqml3hbjt46v1pvmcekel0fd4t.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-login_uri="api/auth_account/login/local"
     data-auto_prompt="false">
    </div>
    <div class="g_id_signin"
      data-type="icon"
      data-shape="circle"
      data-theme="outline"
      data-text="signin_with"
      data-size="large">
    </div> -->
    <!-- <button class="button-image" href="">
      <b-img :src="require('../../assets/facebookIcon.png')"></b-img>
    </button> -->

    <p>
      계정이 없으신가요?
      <router-link to="auth_account">
        <a href="/">회원가입</a>
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit(event) {
      // for debug
      //      alert(this.form.email);
      //      fetch('/api/auth_account/login/local',{
      //  method: 'POST',
      //  mode: 'cors',
      //  credentials: 'include',
      //  headers: {
      //    "Content-Type": "application/json",
      //  },
      //  body: JSON.stringify({
      //    email: this.form.email,
      //    password: this.form.password
      //  })
      //})
      event.preventDefault();
      this.$axios
        .post("/api/auth_account/login/local", {
          email: this.form.email,
          password: this.form.password,
        })
        .catch(function (error) {
          if (error.response.status == 403) {
            alert("아이디 또는 비밀번호를 잘못 입력하였습니다.")
            console.log("아이디 또는 비밀번호를 잘못 입력하였습니다.");
          }
        })
        .then((res) => {
          // do something with res
          console.log(res);
          // temp
          if (res.status == 200) {
            location.href = "/";
            //this.$store.commit("login", res.data);
          }
        });
    },
  }
}

</script>

<style scoped>
p {
  margin-top: 1rem;
}
input {
  margin-bottom: 1.5rem;
}
.button-image {
  background-color: white;
  border: 0px;
}
img {
  width: 2rem;
  height: 2rem;
  object-fit: cover;
}
form {
  margin-bottom: 1rem;
}
</style>
