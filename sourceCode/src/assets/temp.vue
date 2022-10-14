<template>
  <div class="wrapper">
    <b-form-file :state="Boolean(file1)" v-model="file1" accept="image/*"></b-form-file>
    <b-form-file :state="Boolean(file2)" v-model="file2" accept="image/*"></b-form-file>
    <b-button @click="onSubmit"></b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file1: null,
      file2: null,
      canvas: null,
      context: null
    }
  },
  methods: {
    async onSubmit() {
      // FileReader 사용
      console.log('onsubmit executed')
      var reader1 = new FileReader();
      reader1.readAsDataURL(this.file1);
      reader1.onload = () => {
        console.log('reader1 onload executed')
        var tempImage1 = new Image(); //drawImage 메서드에 넣기 위해 이미지 객체화
        tempImage1.src = reader1.result; //data-uri를 이미지 객체에 주입
        console.log(tempImage1.src);
        tempImage1.onload = () => {
            //이미지를 캔버스에 그리기
            console.log('tempimg2 onload executed')
            this.context.drawImage(tempImage1, 0, 0, 500, 500); // 대상, (시작지점, 시작지점), (사진 크기, 사진 크기)
        }
        // FileReader 사용
        var reader2 = new FileReader();
        reader2.readAsDataURL(this.file2);
        reader2.onload = () => {
          console.log('reader2 onload executed')
          var tempImage2 = new Image(); //drawImage 메서드에 넣기 위해 이미지 객체화
          tempImage2.src = reader2.result; //data-uri를 이미지 객체에 주입
          tempImage2.onload = () => {
              //이미지를 캔버스에 그리기
            console.log('tempimg2 onload executed')
            this.context.drawImage(tempImage2, 20, 20, 50, 60); // 대상, (시작지점, 시작지점), (사진 크기, 사진 크기)
            console.log(this.canvas.toDataURL("image/jpeg"));
          }
        }
      }
    }
  },
  created() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 500; //가로 100px
    this.canvas.height = 500; //세로 100px
    
    this.context = this.canvas.getContext("2d");
    this.context.globalCompositeOperation = "source-over";
    this.context.fillStyle = "white"
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
</script>

<style>

</style>