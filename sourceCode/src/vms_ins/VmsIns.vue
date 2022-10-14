<template>
  <div class="contents">
    <h3>봉사 추가</h3>
    <b-tabs content-class="mt-3">
      <b-tab title="봉사시간 추가" active>
        <vms-input-box></vms-input-box>
      </b-tab>
      <b-tab title="헌혈 추가">
        <BD-input-box></BD-input-box>
      </b-tab>
      <b-tab title="기부액 추가">
        <dona-input-box></dona-input-box>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import VmsInputBox from './components/VmsInputBox.vue'
import BDInputBox from './components/BDInputBox.vue'
import DonationInputBox from './components/DonationInputBox.vue'

export default {
  components: {
    'vms-input-box': VmsInputBox,
    'BD-input-box': BDInputBox,
    'dona-input-box': DonationInputBox
  }
}
</script>

<style scoped>

</style>