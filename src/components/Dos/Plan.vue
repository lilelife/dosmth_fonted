<template>
  <div>
    <h1>测试二维码 plan</h1>
    <Button @click="useqrcode('111')">生成111</Button>
    <Button @click="useqrcode('222')">生成222</Button>
    <div>
      <canvas id="canvas"></canvas>
    </div>
    <share :config="config"></share>
</div>
  </div>
</template>

<script>
  import QRCode from 'qrcode'
  
  export default {

    data() {
      return {
        msg: '江南无所有、聊赠一枝春',
        config:{
          sites: ['qzone', 'qq', 'weibo','wechat', 'douban'],
          wechatQrcodeTitle   : '微信扫一扫：分享',
          wechatQrcodeHelper  : '<p>扫一扫</p><p>二维码便可将本文分享至朋友圈。</p>'
        }
//         url                 : '', // 网址，默认使用 window.location.href
// source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
// title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
// description         : '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
// image               : '', // 图片, 默认取网页中第一个img标签
// sites               : ['qzone', 'qq', 'weibo','wechat', 'douban'], // 启用的站点
// disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
// wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
// wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'

      }
    },
    mounted() {
      this.useqrcode(this.msg);
    },
    methods: {
      useqrcode(txt) {
        //生成的二维码内容，可以添加变量
        var canvas = document.getElementById('canvas')
        QRCode.toCanvas(canvas, txt, error=>{
          if (error) console.error(error)
          console.log('二维码 生成成功!');
        })
      }
    }
  }

</script>

<style>

</style>