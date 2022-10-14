<template>
  <div class="wrapper">
    <p class="notice-title">
      {{ noticeData.title }}
      <span class="text-right">
        {{ noticeData.date }}
      </span>
    </p>
    <div class="notice-text">
      {{ noticeData.word }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeData: { 
        index: 0, 
        title: '', 
        date: '', 
        word: `` 
    }
    }
  },
  created() {
      console.log(this.$route.params.id)
    this.$axios.get("/api/notice/findnotice/"+this.$route.params.id).then(response => {
        console.log(response.data);
      this.noticeData = response.data;
    })
    .catch(error => {
      console.log(error);
    })
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
  height: auto;
  white-space: pre-line;
  border-bottom: 1px solid #e3e3e3;
  padding: 1rem 1rem 1rem;
}
</style>