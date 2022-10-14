<template>
  <div class='contents'>
    <h3>진행 정보</h3>
    <progress-page></progress-page>
  </div>
</template>

<script>
import ProgressPage from './components/ProgressPage.vue'

export default {
  components: {
    'progress-page': ProgressPage
  }
}
</script>

<style>

</style>