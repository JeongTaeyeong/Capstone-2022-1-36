<template>
  <div class="wrapper">
    <b-table small :fields="fields" :items="items" responsive="sm">
      <template #cell(image)="data">
        <!-- <img :src="baseUrl + 'path/path' + obj.key +'.png'"> -->
        <b-img :src="data.item.image" alt="NFT 이미지"></b-img>
      </template>
      <!-- <template #cell(name)="data">
        {{ data.item.name }}
      </template>
      <template #cell(text)="data">
        {{ data.item.text }}
      </template> -->
      <template #cell(gainedTime)="data">
        {{ data.item.gainedTime }}
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { 
          key: 'image',
          label: 'NFT 이미지',
          image: true
        },
        // { 
        //   key: 'name', 
        //   label: '업적명' 
        // },
        // {
        //   key: 'text',
        //   label: ''
        // },
        {
          key: 'gainedTime',
          label: '획득 시각'
        }
      ],
      items: [
        // { image: require("../../../assets/background.jpg"), gainedTime: '시간1' },
        // { image: require("../../../assets/googleIcon.png"), gainedTime: '시간2' },
        // { image: require("../../../assets/facebookIcon.png"), gainedTime: '시간3' },
      ],
    }
  }
  // created(){
  //   this.$axios.get("/").then(response =>{
  //       console.log(response);
  //   })
  // }
}
</script>

<style scoped>
img {
  width: 5rem;
  height: 5rem;
  border: 1px solid black;
}

</style>