<!-- 이메일, PW, 이름, 전화번호, 생년월일, 성별 -->
<!-- https://bootstrap-vue.org/docs/components/form -->
<!-- 추가로 더 할 수 있는 것: UX / 유효성 검사 -->
<template>
  <div class="wrapper">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <!-- 이메일 -->
      <b-form-group
        id="input-group-1"
        label="이메일"
        :invalid-feedback="emailInvalidFeedback"
        :state="emialState"
          ><b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="이메일을 입력해주세요. ex)example@example.com"
            :state="emailState"
            required
          ></b-form-input>
      </b-form-group>
      <!-- password -->
      <b-form-group id="input-group-2" label="비밀번호" :invalid-feedback="passwordInvalidFeedback" :state="passwordState">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          aria-describedby="password-help-block"
          :state="passwordState"
          required
        ></b-form-input>
      </b-form-group>
      <!-- username -->
      <b-form-group id="input-group-3" label="이름" :invalid-feedback="usernameInvalidFeedback" :state="usernameState">
        <b-form-input
          id="input-3"
          v-model="form.username"
          placeholder="이름을 입력해주세요."
          :state="usernameState"
          required
        ></b-form-input>
      </b-form-group>
      <!-- nickname -->
      <b-form-group
        id="input-group-4"
        label="닉네임"
        :invalid-feedback="nicknameInvalidFeedback"
        :state="nicknameState"
        ><b-form-input
          id="input-4"
          v-model="form.nickname"
          placeholder="닉네임을 입력해주세요."
          :state="nicknameState"
          required
        ></b-form-input>
      </b-form-group>
      <!-- 전화번호 -->
    <!--
      <b-form-group id="input-group-5" label="전화번호">
        <b-form-input
          id="input-5"
          v-model="form.number"
          placeholder="전화번호를 입력해주세요. ex)01012345678"
          type="tel"
          class="int"
          maxlength="16"
          required
        ></b-form-input>
      </b-form-group>
    -->
      <b-button type="submit" variant="primary">제출</b-button>
      <b-button type="reset" variant="danger">초기화</b-button>
    </b-form>
    <!-- for debug -->
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
    <!-- for debug -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        username: "",
        nickname: "",
        number: "",
      },
      state: {
        email: null,
        nickname: null,
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.state.email = null;
      this.state.nickname = null;
      var res = 
        this.$axios.post("/api/auth_account/register/local", {
          email: this.form.email,
          password: this.form.password,
          username: this.form.username,
          nickname: this.form.nickname,
          //number: this.form.number,
        })
        .catch(function (error) {
          if (error.response.status == 400) {
            console.log("입력오류");
          } else if (error.response.status == 409) {
              console.log(error.response);
            console.log("이메일 또는 닉네임 중복");
              console.log(error.response.data.key);
            if(error.response.data.key == "email"){
                return "email"
            }
            else if(error.response.data.key == "nickname"){
                return "nickname"
            }
            console.log(error);
          }
        })
        .then((res) => {
          if (res == "email"){
              this.state.email = false;
          }
            if(res=="nickname"){
                this.state.nickname = false;
            }
          // do something with res
          if (res.status == 200) {
            this.$router.push('/')
          }
        });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.form.username = "";
      this.form.nickname = "";
      this.form.number = "";

      this.state.email =null
      this.state.nickname = null

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      })
    },
  },
  computed: {
      emailState(){
          return this.form.email.length>1&&this.state.email!=false;
      },
      nicknameState(){
          return this.form.nickname.length>2&&this.state.nickname!=false&&this.form.nickname.length<16;
      },
      passwordState(){
          return this.form.password.length>5;
      },
      usernameState(){
          return this.form.username.length>0;
      },
    emailInvalidFeedback() {
        if(this.state.email==false){
            return "이메일 중복입니다.";
        }
      return "이메일을 입력해주세요.";
    },
      nicknameInvalidFeedback() {
        if(this.state.nickname==false){
            return "닉네임 중복입니다.";
        }
      return "3자 이상 15자 이하 닉네임을 입력해주세요.";
    },
      passwordInvalidFeedback() {
      return "6자 이상 비밀번호를 입력해주세요.";
    },
      usernameInvalidFeedback() {
      return "이름을 입력해주세요";
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}
</style>
