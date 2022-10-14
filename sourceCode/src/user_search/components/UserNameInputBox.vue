<template>
    <div class="wrapper">
      <b-form-input 
        type="search" 
        @keyup.enter="doSearch" 
        v-model="name" 
        placeholder="대상 이름 입력"
      ></b-form-input>
    </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    doSearch(event) {
      var name = this.name
      this.$EventBus.$emit('userSearch', name)
      console.log('name='+name)
    }
  }
}
</script>

<style scoped>
.form-control {
  border: 1px solid blue;
}
</style>