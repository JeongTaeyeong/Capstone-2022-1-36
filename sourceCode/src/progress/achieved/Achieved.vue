<template>
  <div class='contents'>
    <h3>달성 업적</h3>
    <achieved-list></achieved-list>
  </div>
</template>

<script>
import AchievedList from './components/AchievedList.vue'
export default {
  components: {
    'achieved-list': AchievedList
  }
}
</script>

<style>

</style>