<template lang="pug">
  .preloader
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
.preloader{
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 50%;
  background-color: transparent;
  border-top: 5px solid rgba(255,255,255, .8);
  border-left: 5px solid rgba(255,255,255, .8);
  border-right: 5px solid transparent;
  border-bottom: 5px solid transparent;
  animation: isLoading .5s infinite;
  @keyframes isLoading {
    from {
      transform: translateY(-50%) translateX(-50%) rotate(0deg);
    }
    to {
      transform: translateY(-50%) translateX(-50%) rotate(360deg);
    }
  }
}
</style>
