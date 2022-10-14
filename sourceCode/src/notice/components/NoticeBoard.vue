<!-- axiosGet에서 미리 만들어진 게시물 10개씩(index) 가져오는 작업 필요-->
<template>
  <div class="wrapper" v-if="show">
    <b-list-group>
      <b-list-group-item v-for="item in lists" :key="item.index">
        <transition>
        <router-link :to="{ path: './' + item.index }" append>
          <a>{{ item.title }}</a>
        </router-link>
      </transition>
          <span class="text-right">
            {{ item.date }}
          </span>
      </b-list-group-item>
    </b-list-group>
    <!-- for debug -->
    <span class="write-button text-right" v-if="this.$store.getters.getAccess === 2">
      <router-link :to="{ path: 'write' }" append>
          <b-img class='image' :src="require('../../assets/notice-write-icon.png')"></b-img>
      </router-link>
    </span>
    <div class="overflow-auto">
      <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="numberOfPages"
        align="center"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        @page-click="pageClick"
        use-router
      ></b-pagination-nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [
    
      ],
      show: true,
      index: 1,
      numberOfPages: 10,
    }
  },
  created() {
  // axios index;
    this.pageClick();
      this.$axios.get('/api/notice/getcount').then((response)=>{
          this.numberOfPages = response.data/10+1;
      })
  },
  methods: {
  // page url method
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  // watch pageNum and re-rendering
    pageClick() {
      var queryValue = this.$route.query.page;
      if (queryValue > 1) this.index = queryValue;
      else this.index = 1;
      this.axiosGet(this.index);
      console.log(this.index)
  },
  // axios get, 주소 임의 지정
    axiosGet(index) {
      this.show = false;
        console.log(index);
      this.$axios.get("/api/notice/getList/"+index).then(response => {
          console.log(response.data);
        this.lists = response.data;
        //this.lists.concat(response.data);
          console.log(this.lists);
      }).
      catch(error => {
       console.log(error)
      })
      this.$nextTick(() => { this.show = true; })
    }
  },
}
</script>

<style scoped>
a:link {
  color : black;
}
a:hover {
  color : blue;
}
.wrapper {
  margin-bottom: 1rem;
}
.image {
  height: 1rem;
  width: 1rem;
}
</style>