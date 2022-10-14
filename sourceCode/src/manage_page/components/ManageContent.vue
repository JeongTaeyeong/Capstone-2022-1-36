<template>
  <div class="wrapper">
    <b-tabs>
     <b-tab title="NFT 발급 승인">
       <approve-nft></approve-nft>
     </b-tab>
     <b-tab title="봉사시간 승인">
       <approve-vms></approve-vms>
     </b-tab>
     <b-tab title="헌혈 승인">
       <approve-bd></approve-bd>
     </b-tab>
     <b-tab title="기부액 승인">
       <approve-donation></approve-donation>
     </b-tab>
     <b-tab title="발급권한 부여">
       <approve-iss-auth></approve-iss-auth>
     </b-tab>
     </b-tabs>
  </div>
</template>

<script>
import ApproveNFT from './ApproveNFT.vue'
import ApproveVMS from './ApproveVMS.vue'
import ApproveIssAuth from './ApproveIssAuth.vue'
import ApproveBD from './ApproveBD.vue'
import ApproveDonation from './ApproveDonation.vue'

export default {
  components: {
    'approve-nft': ApproveNFT,
    'approve-vms': ApproveVMS,
    'approve-bd': ApproveBD,
    'approve-donation': ApproveDonation,
    'approve-iss-auth': ApproveIssAuth
  }
}
</script>

<style scoped>
.nav-tabs {
  margin-bottom: 1rem;
}

</style>