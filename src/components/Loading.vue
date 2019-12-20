
<template>
  <div class="load-container">
    <div class="load"></div>
    <div class="text">加载中...</div>
  </div>
</template>
 
<script>
export default {
  name: 'Loading',
}
</script>
 
<style scoped >
  .load-container .load {
    width: 60px;
    height: 60px;
    background-color: #ee1;
    margin: 50px auto;
    border-radius: 6px;
    animation: rotateplane 1.2s infinite ease-in-out;
  }
 
  .load-container .text {
    text-align: center;
  }
 
  @keyframes rotateplane {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    } 50% {
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    } 100% {
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
  } 
</style>