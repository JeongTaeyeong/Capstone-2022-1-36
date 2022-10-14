<template>
  <div class="wrapper">
    <div class="notice-title">
      <input class="write-area title" type="text" v-model="noticeData.title" placeholder="제목을 입력해주세요.">
    </div>
    <div class="notice-text">
      <textarea class="write-area word" v-model="noticeData.word" placeholder="내용을 입력해주세요."></textarea>
    </div>
    <div class="notice-submit">
      <b-button variant="secondary" @click="onSubmit">제출</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeData: {
        title: '',
        word: '',
        date: ''
      }
    }
  },
  methods: {
    onSubmit() {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var date = today.getDate();
        console.log(date);
      this.noticeData.date = year + '-' + month + '-' + date;
        console.log(this.noticeData.date);
      this.$axios.post("/api/notice/writenotice", {
        title: this.noticeData.title,
          date: this.noticeData.date,
        word: this.noticeData.word,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>
.notice-title {
  background-color: #f9f9f9;
  padding: 1rem 1rem 1rem;
  border-top: 1px solid #7e7e7e;
  border-bottom: 1px solid #e3e3e3;
  font-weight: bold;
  font-size: 1.2rem;
  color: black;
  margin-top: 1rem;
}
.text-right {
  float: right;
  font-weight: normal;
  font-size: 1rem;
}
.notice-text {
  height: 6rem;
  padding: 1rem 1rem 1rem;
}
.write-area {
  width: 100%;
}
.word {
  height: 25rem;
}
.notice-text {
  height: 27rem;
}
.notice-submit {
  padding: 1rem
}
</style>