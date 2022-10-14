<template>
  <b-card class="main-card">
    <h4 class="card-title">
      달성 업적
      <span class="text-right" v-if="token">
        <router-link to="/progress">
          <button class="card-button" type="button">
            <img class="card-img" src="../../assets/cardButton.png" />
          </button>
        </router-link>
      </span>
    </h4>
    <div v-if="token">
      <b-card-text>
        <b-tabs content-class="mt-3">
          <b-tab title="달성 임박" active>
            <div>
              <h5>현재 업적</h5>
              <!-- DB에서 불러내는 작업 필요. 최대 3개까지 -->
              {{ prog1 }}
              <b-progress :max="max1" height="1rem">
                <b-progress-bar :value="value1">
                  <span>
                    <strong>{{ value1 }} / {{ max1 }}</strong>
                  </span>
                </b-progress-bar>
              </b-progress>
              {{ prog2 }}
              <b-progress :max="max2" height="1rem">
                <b-progress-bar :value="value2">
                  <span>
                    <strong>{{ value2 }} / {{ max2 }}</strong>
                  </span>
                </b-progress-bar>
              </b-progress>
              {{ prog3 }}
              <b-progress :max="max3" height="1rem">
                <b-progress-bar :value="value3">
                  <span>
                    <strong>{{ value3 }} / {{ max3 }}</strong>
                  </span>
                </b-progress-bar>
              </b-progress>
                {{ prog4 }}
              <b-progress :max="max4" height="1rem">
                <b-progress-bar :value="value4">
                  <span
                    ><strong>{{ value4 }} / {{ max4 }}</strong></span
                  >
                </b-progress-bar>
              </b-progress>
            </div>
          </b-tab>
          <!-- b-img 태그로 수정하기 -->
          <b-tab title="달성업적">
            <div>
              <b-img-lazy
                b-img
                v-bind="mainProps"
                alt="Transparent image"
                :src="require(`../../assets/achieves/${this.imglist[0]}`)"
              ></b-img-lazy>
              <b-img-lazy
                b-img
                v-bind="mainProps"
                alt="Transparent image"
                :src="require(`../../assets/achieves/${this.imglist[1]}`)"
              ></b-img-lazy>
              <b-img-lazy
                b-img
                v-bind="mainProps"
                alt="Transparent image"
                :src="require(`../../assets/achieves/${this.imglist[2]}`)"
              ></b-img-lazy>
              <b-img-lazy
                b-img
                v-bind="mainProps"
                alt="Transparent image"
                :src="require(`../../assets/achieves/${this.imglist[3]}`)"
              ></b-img-lazy>
              <b-img-lazy
                b-img
                v-bind="mainProps"
                alt="Transparent image"
                :src="require(`../../assets/achieves/${this.imglist[4]}`)"
              ></b-img-lazy>
              <b-img-lazy
                b-img
                v-bind="mainProps"
                alt="Transparent image"
                :src="require(`../../assets/achieves/${this.imglist[5]}`)"
              ></b-img-lazy>
              <b-img-lazy
                b-img
                v-bind="mainProps"
                alt="Transparent image"
                :src="require(`../../assets/achieves/${this.imglist[6]}`)"
              ></b-img-lazy>
              <b-img-lazy
                b-img
                v-bind="mainProps"
                alt="Transparent image"
                :src="require(`../../assets/achieves/${this.imglist[7]}`)"
              ></b-img-lazy>
              <b-img-lazy
                b-img
                v-bind="mainProps"
                alt="Transparent image"
                :src="require(`../../assets/achieves/${this.imglist[8]}`)"
              ></b-img-lazy>
              <b-img-lazy
                b-img
                v-bind="mainProps"
                alt="Transparent image"
                :src="require(`../../assets/achieves/${this.imglist[9]}`)"
              ></b-img-lazy>
              <b-img-lazy
                b-img
                v-bind="mainProps"
                alt="Transparent image"
                :src="require(`../../assets/achieves/${this.imglist[10]}`)"
              ></b-img-lazy>
              <b-img-lazy
                b-img
                v-bind="mainProps"
                alt="Transparent image"
                :src="require(`../../assets/achieves/${this.imglist[11]}`)"
              ></b-img-lazy>
              <b-img-lazy
                b-img
                v-bind="mainProps"
                alt="Transparent image"
                :src="require(`../../assets/achieves/${this.imglist[12]}`)"
              ></b-img-lazy>
              <b-img-lazy
                b-img
                v-bind="mainProps"
                alt="Transparent image"
                :src="require(`../../assets/achieves/${this.imglist[13]}`)"
              ></b-img-lazy>
              <b-img-lazy
                b-img
                v-bind="mainProps"
                alt="Transparent image"
                :src="require(`../../assets/achieves/${this.imglist[14]}`)"
              ></b-img-lazy>
            </div>
          </b-tab>
          <!-- <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab> -->
        </b-tabs>
      </b-card-text>
      <!-- <b-card-text>A second paragraph of text in the card.</b-card-text> -->
      <!-- <a href="/progress" class="card-link">더보기</a> -->
    </div>
    <!-- <b-link href="#" class="card-link">Another link</b-link> -->
    <div v-else>
      <b-card-text>
        <p>로그인이 필요합니다</p>
      </b-card-text>
    </div>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      max1: 50,
      value2: 0,
      max2: 100000,
      value3: 0,
      max3: 10,
      value4: 0,
      max4: 0,
      list: [],
      imglist: [
        "blank.png",
        "blank.png",
        "blank.png",
        "blank.png",
        "blank.png",
        "blank.png",
        "blank.png",
        "blank.png",
        "blank.png",
        "blank.png",
        "blank.png",
        "blank.png",
        "blank.png",
        "blank.png",
        "blank.png",
      ],
      file: "vol_50.png",

      prog1: "봉사시간",
      prog2: "기부액",
      prog3: "헌혈",
      prog4: "NFT보유",

      mainProps: { blank: true, width: 75, height: 75, class: "m1" },
    };
  },
  created() {
    var data = this.$axios.get("/api/progress/viewachieve").then((response) => {
      this.list = response.data.ProgAchieve;
        console.log(this.list);
      for (var i in this.list) {
        this.imglist.splice(i, 1, this.list[i].imgAch);
        console.log(this.imglist);
      }
    });
      this.$axios.get("/api/progress/viewprogress").then((response)=>{
          this.value1 = response.data.volTime;
          if(this.value1>=50){
              this.max1 = 100;
              if(this.value1>100){
                  this.max1 = 500;
                  if(this.value1>500){
                      this.max1 = 1000;
                  }
              }
          }
          this.value2 = response.data.doneNum;
          if(this.value2>=100000){
              this.max2 = 1000000;
              if(this.value2>1000000){
                  this.max2 = 10000000;
              }
          }
          this.value3 = response.data.bloodNum;
          if(this.value3>=10){
              this.max3 = 50;
              if(this.value3>50){
                  this.max3 = 100;
              }
          }
      });
  },
  methods: {
    getImageUrl(imageId) {
      const { width, height } = this.mainProps;
      var data = this.$axios.get("/api/progress/viewachieve").then((response) => {
        this.list = response.data.ProgAchieve;
      });
      //        this.$axios.get('api/image/getimage/'+this.list[imageId].imgAch,{ responseType: 'arraybuffer' }).then((reaponse)=>{
      //            console.log(response);
      //        })
      //        console.log(this.list);
      if (this.list.length - 1 < imageId) {
        console.log(imageId);
        console.log(this.list.length);
        return "blank.png";
      }
      return this.list[imageId].imgAch;
    },
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },
};
</script>

<style scoped>
.progress {
  margin-bottom: 1rem;
}
.img {
  width: 5rem;
  height: 5rem;
  border: 1px solid black;
}
.main-card {
  border: 3px solid lightskyblue;
}
</style>
