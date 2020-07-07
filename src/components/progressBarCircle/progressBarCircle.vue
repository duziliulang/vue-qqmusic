<template>
  <div class="progress-circle">
    <svg :height="radius" :width="radius" version="1.1" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" cx="25" cy="25" fill="transparent" r="25"/>
      <circle :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset" class="progress-bar" cx="25" cy="25" fill="transparent"
              r="25"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
    export default {
      props: {
        radius: {
          type: Number,
          default:50
        },
        percent: {
          type: Number,
          default: 0
        }
      },
      data() {
        return {
          dashArray: Math.PI * 50
        }
      },
      computed: {
        dashOffset() {
          return (1 - this.percent) * this.dashArray
        }
      },
      watch:{
        dashArray(){
        },
        percent(){
          // console.log("dashOffset==============="+this.dashOffset)
        }
    }
    }
</script>

<style >

  .progress-circle {
    position: relative;
  }
  circle{
    stroke-width: 8px;
    transform-origin: center;
  }
  .progress-background{
    transform: scale(0.9);
    stroke:#5b9bfe;
  }
  .progress-circle .progress-bar{
    transform: scale(0.9)rotate(-90deg);
    stroke:#e2edfe;
  }

</style>
