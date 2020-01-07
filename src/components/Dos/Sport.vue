<template>
  <div class="sport_box">

    <h2>{{title}}</h2>
    <List header="开始运动" footer=" 开始GO GO GO !!!" border>
      <ListItem>
        <ListItemMeta avatar="http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180720/6f57a42071a04568a45156c669b69fef.gif" title="俯卧撑" description="5分钟，你必须完成30+个"></ListItemMeta>
      </ListItem>
      <ListItem>
        <ListItemMeta avatar="http://p1.qhimgs4.com/t01cd0374b41973fbda.gif" title="深蹲" description="5分钟，你必须完成30+个"></ListItemMeta>
      </ListItem>
      <ListItem>
        <ListItemMeta avatar="http://img1.imgtn.bdimg.com/it/u=2821305855,699567172&fm=26&gp=0.jpg" title="仰卧起做" description="10分钟，你必须完成70+个"></ListItemMeta>
      </ListItem>
    </List>
   
    <div @click="changeOn" :class="isOff?'isOff':'isOn'">
    </div>
    <audio id="audio" :src="mus" loop autoplay></audio>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isOff: true,
        title: 'YOU MUST KEEP RUNNING',
        mus: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_3356597&response=res&type=convert_url&'
      }
    },
    mounted() {
      // 自动播放音乐效果，解决微信自动播放问题
   
      let oAudio = document.querySelector("#audio");
      oAudio.onended = function () {//播放完毕，重新循环播放
        oAudio.load();
        oAudio.play();
      }

    },
    methods: {
      
      changeOn() {
        let oAudio = document.querySelector("#audio");
        if (this.isOff) {
          oAudio.play();//让音频文件开始播放     
        } else {
          oAudio.pause();//让音频文件暂停播放 
        }
        this.isOff = !this.isOff;
      },
      audioAutoPlay() {
        let audio = document.getElementById('audio');
        this.isOff = false; // 播放
        audio.play();
       
      }
    }
  }

</script>

<style>
  .sport_box {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 20px
  }
  
  .isOn {
    width: 28px;
    height: 28px;
    position: fixed;
    z-index: 2000;
    top: 20px;
    left: 20px;
    -webkit-animation: rotating 1.2s linear infinite;
    animation: rotating 1.2s linear infinite;
    background: url("../../assets/play.png") 0 0 no-repeat;
    background-size: 100%;
  }
  
  @keyframes rotating {
    from {
      -webkit-transform: rotate(0)
    }
    to {
      -webkit-transform: rotate(360deg)
    }
  }
  
  @-webkit-keyframes rotating {
    from {
      -webkit-transform: rotate(0)
    }
    to {
      -webkit-transform: rotate(360deg)
    }
  }
  
  .isOff {
    width: 28px;
    height: 28px;
    position: fixed;
    z-index: 2000;
    top: 20px;
    left: 20px;
    background: url("../../assets/play.png") 0 0 no-repeat;
    background-size: 100%;
  }
</style>