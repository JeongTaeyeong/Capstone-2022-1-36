<template>
  <div class="wrapper">
    <b-table small :fields="fields" :items="items" responsive="sm">
      <template #cell(image)="data">
        <!-- <img :src="baseUrl + 'path/path' + obj.key +'.png'"> -->
        <b-img :src="data.item.image" alt="업적 이미지"></b-img>
      </template>
      <template #cell(name)="data">
        {{ data.item.name }}
      </template>
      <template #cell(text)="data">
        {{ data.item.text }}
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
          label: '',
          image: true
        },
        { 
          key: 'name', 
          label: '업적명' 
        },
        {
          key: 'text',
          label: ''
        },
      ],
      items: [
        // { image: require("../../../assets/background.jpg"), name: '업적1', text: '업적 설명' },
        // { image: require("../../../assets/googleIcon.png"), name: '업적2', text: '업적 설명' },
        // { image: require("../../../assets/facebookIcon.png"), name: '업적3', text: '업적 설명' },
      ],
    }
  },
   created(){
     this.$axios.get("/api/achieve/list").then(response =>{
         console.log(response);
         var list = response.data
         for(var i in list){
             list[i].image = "/api/image/getimage/"+list[i].Image;
             list[i].name = list[i].Name;
             list[i].text = list[i].Name;
         }
         this.items = list;
     })
   }
}
</script>

<style scoped>
img {
  width: 5rem;
  height: 5rem;
  border: 1px solid black;
  filter: grayscale(100%)
}

</style>