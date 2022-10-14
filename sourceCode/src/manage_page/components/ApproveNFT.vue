<!--
1. 지갑 이미지, NFT 이미지, 신청목록 불러오는 작업 필요
2. NFT 이미지는 index로 구별되어야 함(이미지 합성 좌표 지정 때문)
3. 이미지 합성 후 네이밍, 어떻게 저장할 지에 관한 논의 필요
-->
<template>
  <div>
    <b-form-group
        label="발급 승인 NFT 목록"
        v-slot="{ ariaDescribedby }"
        >
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="NFT list"
        stacked
      ></b-form-checkbox-group>
      <!-- 수정 -->
      <b-button @click="submitApprove" variant="primary">발급</b-button>
      <b-button @click="submitRevise" variant="danger">거절</b-button>
    </b-form-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [

      ], // Must be an array reference!
      options: [
        // DB에서 불러오는 작업 필요
        // { value: { user: 'YYY', nft: 'NFT1' }, html: 'NFT1 / 발급자: XXX / 대상자: YYY <a target=&apos;_blank&apos; href="">파일 보기</a>' },
        // { value: { user: 'YYY', nft: 'NFT2' }, html: 'NFT1 / 발급자: XXX / 대상자: YYY <a target=&apos;_blank&apos; href="">파일 보기</a>' },
        // { value: { user: 'YYY', nft: 'NFT3' }, html: 'NFT1 / 발급자: XXX / 대상자: YYY <a target=&apos;_blank&apos; href="">파일 보기</a>' },
        // { value: { user: 'YYY', nft: 'NFT4' }, html: 'NFT1 / 발급자: XXX / 대상자: YYY <a target=&apos;_blank&apos; href="">파일 보기</a>' },
      ],
      canvas: null,
      context: null,
        nftimage: null
    }
  },
  methods: {
    async submitApprove(event) {
      var walletImg = null;
      var NFTimage = {image:'',index:0};
      var reader1 = new FileReader();
      var reader2 = new FileReader();
        console.log(this.selected);
        
        
      for (var i in this.selected) {
      // 해당 유저의 DB에서 지갑 이미지를 불러오는 작업 필요
        await this.$axios.post("/api/auth_account/getwallimg", { 
          nickname: this.selected[i].user
          })
          .then(response => {
            walletImg = response.data.walletImage;
            console.log('walletImg='+walletImg);
          })
          .catch(error => {
            console.log('axios get wallet img error');
          })
          var arrdata;
      // 해당 NFT 이미지 불러오는 작업 필요
        await this.$axios.get("/api/image/getImage/"+this.selected[i].nft+".png",{responseType: "arraybuffer"})
          .then(response => {
            console.log(response.data)
            const blob = new Blob([response.data], {type: 'image/png'});
//            console.log(blob);
//            var a = URL.createObjectURL(blob);
//            console.log(a);
//            NFTimage.image = a;
//            console.log(NFTimage.image);
            NFTimage.index = this.selected[i].nftNum; // 업적 종류(이미지 합성 좌표 지정에 쓰임)
//          })
//          .catch(error => {
//            console.log(error);
//            console.log('axios get nft img error');
            console.log(response.data);
            console.log(blob);
            NFTimage.image = blob;
          })
          var a = URL.createObjectURL(NFTimage.image);
            console.log(a);
//          NFTimage.image = "http://localhost:8080/api/image/getImage/"+this.selected[i].nft+".png"
//          console.log(NFTimage.image);
//          NFTimage.index = this.selected[i].nftNum

//      // if 문으로 업적 종류마다 지갑 이미지 합성 좌표를 다르게 지정해야 함
          console.log(NFTimage.image);
          console.log(walletImg);
        reader1.readAsDataURL(NFTimage.image);
          console.log(reader1);
        reader1.onload = () => {
          console.log('reader1 onload executed');
          var tempImage1 = new Image(); //drawImage 메서드에 넣기 위해 이미지 객체화
          tempImage1.src = reader1.result; //data-uri를 이미지 객체에 주입
            console.log(tempImage1.src);
          tempImage1.onload = () => {
              //이미지를 캔버스에 그리기
            console.log('tempimg1 onload executed')
            this.context.drawImage(tempImage1, 0, 0, 500, 500); // 대상, (시작지점, 시작지점), (사진 크기, 사진 크기)
          }
           //FileReader 사용
            var byteString = atob(walletImg.split(',')[1]);

  // separate out the mime component
  var mimeString = walletImg.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var j = 0; j < byteString.length; j++) {
      ia[j] = byteString.charCodeAt(j);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
          reader2.readAsDataURL(blob);

  //        reader2.result = walletImg;
          reader2.onload = () => {
            console.log('reader2 onload executed')
            var tempImage2 = new Image(); //drawImage 메서드에 넣기 위해 이미지 객체화
            tempImage2.src = walletImg; //data-uri를 이미지 객체에 주입
              console.log(tempImage2.src);
            tempImage2.onload = () => {
                //이미지를 캔버스에 그리기
              var startx = 0, starty = 0, xvalue = 150, yvalue = 150;  
              console.log('tempimg2 onload executed')
              // if (NFTimage.index === 0) {startx = ;starty = ;xvalue = ;yvalue = ;}
              // else if (NFTimage.index === 1) {}
              // else if (NFTimage.index === 2) {}

              this.context.drawImage(tempImage2, startx, starty, xvalue, yvalue); // 대상, (시작지점, 시작지점), (사진 크기, 사진 크기)
              console.log(this.canvas.toDataURL("image/png"));
                this.nftimage = this.canvas.toDataURL("image/png");
                
            }
          }
            }
        
        await this.$axios.post('/api/manage_page/allownftapplys',{
            index: this.selected[i].index,
            nftNum: this.selected[i].nftNum,
            nickname: this.selected[i].user,
            nftName: this.selected[i].nft,
            date: new Date()
        }).then((response)=>{
                  var date = new Date();
            console.log(this.selected[i]);
      var fileName 
        = 'nft_'+escape(this.selected[i].user) + '_' + date.getDate() + date.getHours() 
        + date.getMinutes() + date.getSeconds()+'.png';
                        var byteString = atob(this.nftimage.split(',')[1]);
            console.log("OK");

  // separate out the mime component
  var mimeString = this.nftimage.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var j = 0; j < byteString.length; j++) {
      ia[j] = byteString.charCodeAt(j);
  }

  // write the ArrayBuffer to a blob, and you're done
//  var blob = new Blob([ab], {type: mimeString});
      var file = new File([ab], fileName, {type: 'image/png'});
      
      console.log(file);
      console.log('file.name='+file.name);
    this.$store.commit('changeNft', file.name);
      let fd = new FormData();
        fd.append('file',file);
    // to Server
    this.$axios.post('/api/upload2', fd,{headers: {'Content-Type':'multipart/form-data'}})
      .then(res => {
        console.log('to sv res='+res);
          if(res.status==200){
              location.href = '/manage_page'
          }
        this.file1 = null;
        this.volTime = '';
        this.volIss = ''
      })
      .catch(error => {
        console.log('To sv error.response='+error)
      });
        })
      }
      
    },
    submitRevise(event) {
    // 신청 DB에서 해당 목록 제거
    },
  },
  created() {
  // NFT 발급 신청목록을 DB 불러오는 작업 필요
  this.$axios.get("/api/manage_page/nftapplys").then(response => {
        console.log(response.data);
          this.data = response.data;
        console.log('response.data='+response.data);
        for(var i in this.data){
            this.data[i].html = '발급자: '+this.data[i].username+' / 대상자: '+this.data[i].nickname+' <a target=&apos;_blank&apos; href="../../tmp/uploads/'+this.data[i].nftIss+'">파일 보기</a>';
            this.data[i].value = {user:this.data[i].nickname, nft:this.data[i].nftName, nftNum:this.data[i].nftNum, index:this.data[i].index};
            }
        this.options = this.data;
    }).catch(error => {})
  
  // canvas 인스턴스 실행
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

<style scoped>
.bv-no-focus-ring {
  margin-bottom: 1rem;
  border: 1px solid black;
}
</style>