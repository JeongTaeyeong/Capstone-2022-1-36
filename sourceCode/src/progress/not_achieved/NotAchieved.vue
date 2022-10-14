<template>
  <div class="contents">
    <h3>전체 업적</h3>
    <not-achieved-list></not-achieved-list>
  </div>
</template>

<script>
import NotAchievedList from './components/NotAchievedList.vue'

export default {
  components: {
    'not-achieved-list': NotAchievedList
  }
}
</script>

<style>

</style>