<!-- 대표 이메일, PW, 기관명, 기관번호 -->
<!-- https://bootstrap-vue.org/docs/components/form -->
<!-- 추가로 더 할 수 있는 것: UX / 유효성 검사 -->
<template>
  <div class="wrapper">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <!-- 대표 이메일 -->
      <b-form-group
        id="input-group-1"
        label="대표 이메일"
        :invalid-feedback="emailInvalidFeedback"
        :state="emialState">
        <!-- <b-row class="my-1">
          <b-col sm="7"> -->
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="대표 이메일을 입력해주세요. ex)example@example.com"
            :state="emailState"
            required
          ></b-form-input>
          <!-- </b-col>
          <b-col sm="2">
            <b-button variant="outline-primary" @click="emailfunc">중복 체크</b-button>
          </b-col>
        </b-row> -->
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
      <!-- 기관명 -->
      <b-form-group
        id="input-group-3"
        label="기관명"
        :invalid-feedback="nicknameInvalidFeedback"
        :state="nicknameState"
          ><b-form-input
            id="input-3"
            v-model="form.organization_name"
            placeholder="기관명을 입력해주세요."
            :state="nicknameState"
            required
          ></b-form-input>
      </b-form-group>
      <!-- 기관번호 -->
<!--
      <b-form-group id="input-group-4" label="기관 전화번호">
        <b-form-input
          id="input-4"
          v-model="form.number"
          placeholder="기관 전화번호를 입력해주세요. ex)021234567"
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
        email: '',
        password: '',
        organization_name: '',
        number: '',
      },
      state: {
        email: null,
        organization_name: null
      },
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
        this.state.email = null;
      this.state.organization_name = null;
      console.log(JSON.stringify(this.form)) // for debug
      this.$axios.post('/api/auth_account/register/ins', { 
        username: this.form.organization_name,
        email: this.form.email,
        password: this.form.password, 
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
                this.state.organization_name = false;
            }
          // do something with res
          if (res.status == 200) {
            this.$router.push('/')
          }
          console.log(res);
        });
      // .catch(function (error) {
      //   if (error.response) {
      //     // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
      //     console.log(error.response.data);
      //     console.log(error.response.status);
      //     console.log(error.response.headers);
      //   }
      //   else if (error.request) {
      //     // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      //     // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      //     // Node.js의 http.ClientRequest 인스턴스입니다.
      //     console.log(error.request);
      //   }
      //   else {
      //     // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      //     console.log('Error', error.message);
      //   }
      //   console.log(error.config);
      // })
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      this.form.organization_name = ''
      this.form.number = ''

      this.state.email = null
      this.state.organization_name = null

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
  computed: {
      emailState(){
          return this.form.email.length>1&&this.state.email!=false;
      },
      nicknameState(){
          return this.form.organization_name.length>2&&this.state.organization_name!=false&&this.form.organization_name.length<16;
      },
      passwordState(){
          return this.form.password.length>5;
      },
    emailInvalidFeedback() {
        if(this.state.email==false){
            return "이메일 중복입니다.";
        }
      return "이메일을 입력해주세요.";
    },
      nicknameInvalidFeedback() {
        if(this.state.organization_name==false){
            return "기관명 중복입니다.";
        }
      return "3자 이상 15자 이하 기관명을 입력해주세요.";
    },
      passwordInvalidFeedback() {
      return "6자 이상 비밀번호를 입력해주세요.";
    },
  },
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}
</style>