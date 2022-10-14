<!-- 메인 페이지 -->
<template>
  <div class="contents">
    <intro></intro>
    <last-nft></last-nft>
    <notice-card></notice-card>
    <ranking-card></ranking-card>
    <progress-card></progress-card>
    <!-- <community-card></community-card> -->
  </div>
</template>

<script>
import Introduce from "./components/Introduce.vue"
import LastNFT from "./components/LastNFT.vue"
import NoticeCard from "./components/NoticeCard.vue";
import RankingCard from "./components/RankingCard.vue";
import ProgressCard from "./components/ProgressCard.vue";
// import CommunityCard from "./components/CommunityCard.vue";

export default {
  components: {
    "intro": Introduce,
    "last-nft": LastNFT,
    "notice-card": NoticeCard,
    "ranking-card": RankingCard,
    "progress-card": ProgressCard,
    // "community-card": CommunityCard,
  },
};
</script>

<style scoped>
.main-card {
  border: 1px solid lightgreen;
  background-color: #fdfdfd;
  margin-bottom: 1rem;
}
</style>
