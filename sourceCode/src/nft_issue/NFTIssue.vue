<template>
  <div class="contents">
    <h3>파일 첨부</h3>
    <input-file-box></input-file-box>
  </div>
</template>

<script>
import InputFileBox from './components/InputFileBox.vue'
export default {
  components: {
    'input-file-box': InputFileBox
  }
}
</script>

<style>

</style>