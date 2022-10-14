<!-- 공지사항 리스트 갯수는 최신 게시물 5개 이하로 맞추기 -->
<template>
  <b-card class="main-card">
    <h4 class="card-title">
      필독 공지사항
      <span class="text-right">
        <router-link to="/notice">
          <button class = "card-button" type="button">
            <img class="card-img" src="../../assets/cardButton.png"/>
          </button>
        </router-link>
      </span>
    </h4>
    <b-card-text>
      <b-list-group>
        <b-list-group-item v-for="item in lists" :key="item.index">
          <router-link :to="{ path: 'notice/' + item.index }" append>
            <a>{{ item.title }}</a>
          </router-link>
            <span class="text-right">
              {{ item.date }}
            </span>
        </b-list-group-item>
      </b-list-group>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        // { index: '1', title: 'aaa', date: '2022-09-23' },
        // { index: '2', title: 'bbb', date: '2022-08-15' },
        // { index: '3', title: 'ccc', date: '2022-07-16' },
        // { index: '4', title: 'ddd', date: '2022-05-05' },
        // { index: '5', title: 'eee', date: '2022-03-01' },
      ],
    }
  },
  created() {
     this.$axios.get('/api/notice/viewmustread')
     .then(response => {
       this.lists = response.data;
     })
     .catch(error => {
       console.log('error='+error)
     })
  }
}
</script>

<style scoped>
a:link {
  color : black;
}
a:hover {
  color : blue;
}
.main-card {
  border: 3px solid lightgreen;
}
</style>