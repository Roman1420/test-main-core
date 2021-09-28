<template lang="pug">
  .error(@click="$emit('closeError')")
    .error-head ERROR: 
    .error-text {{text}}
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style lang="scss">
.error { 
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0, .7);
  &-head{
    color: green;
    font-size: 40px;
    font-weight: bold;
  }
  &-text{
    font-size: 28px;
  }
}
</style>
