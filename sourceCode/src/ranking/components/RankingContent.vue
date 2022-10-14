<template>
  <div class="wrapper">
    <b-tabs>
      <b-tab title="업적 횟수">
        <achieve-ranking></achieve-ranking>
      </b-tab>
      <b-tab title="봉사 시간">
        <vms-ranking></vms-ranking>
      </b-tab>
      <b-tab title="헌혈 횟수">
        <bd-ranking></bd-ranking>
      </b-tab>
      <b-tab title="기부액">
        <dona-ranking></dona-ranking>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import AchieveRanking from './AchieveRanking.vue'
import VMSRanking from './VMSRanking.vue'
import BDRanking from './BDRanking.vue'
import DonaRanking from './DonaRanking.vue'

export default {
  components: {
    'achieve-ranking': AchieveRanking,
    'vms-ranking': VMSRanking,
    'bd-ranking': BDRanking,
    'dona-ranking': DonaRanking
  }
}
</script>

<style>

</style>