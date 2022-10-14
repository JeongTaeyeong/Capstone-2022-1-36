<template>
  <div class="wrapper">
    <b-form-group v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="plain-stacked"
        plain
        stacked
      ></b-form-radio-group>
      <b-button variant="secondary" @click = "onSubmit">추가</b-button>
    </b-form-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      options: [],
      data: [],
    }
  },
  created() {
    this.$axios.get('/api/user_search/userlist')
    .then(response => {
      this.data = response.data;
      console.log('response.data='+response.data);

      for(var i in this.data) {
          this.data[i].text = '이름: ' + this.data[i].profile.username + ', 닉네임: ' + this.data[i].nickname;
          this.data[i].value = { username: this.data[i].profile.username, nickname: this.data[i].nickname };
      }
      this.options = this.data;
      console.log('this.options='+this.options);
    })
    .catch(error => {
      console.log('axios error');
    })

    this.$EventBus.$on('userSearch', this.receive);
  },
  methods: {
    receive(data) {
      console.log('this.options='+this.options)
      this.options.splice(0)
      this.$axios.post('/api/user_search/finduser', {
        username: data
      })
      .then(response => {
        console.log(response);
        this.data = response.data;
        this.data.text = '이름: '+this.data.profile.username+', 닉네임: '+this.data.nickname;
        this.data.value = { username: this.data.profile.username, nickname: this.data.nickname }
        this.options.push(this.data);
        console.log(this.options);
      })
    },
    onSubmit(event) {
      event.preventDefault();
      console.log('this.selected='+this.selected);
      this.$EventBus.$emit('addlist', this.selected);
    }
  },
}
</script>

<style scoped>
.bv-no-focus-ring {
  margin-bottom: 0.5rem;
  overflow: scroll;
  height: 10rem;
}
.form-group {
  border: 1px solid black;
}
</style>