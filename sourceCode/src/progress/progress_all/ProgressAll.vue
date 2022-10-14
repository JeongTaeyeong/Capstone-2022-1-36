<template>
  <div class="contents">
    <h3>진행도</h3>
    <all-progress-bar></all-progress-bar>
  </div>
</template>

<script>
import AllProgressBar from './components/AllProgressBar.vue'

export default {
  components: {
    'all-progress-bar': AllProgressBar
  }
}
</script>

<style>

</style>