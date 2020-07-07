<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return{}
    },
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style >
  .no-result{
    text-align: center;
  }
  .no-result-icon{
    width: 86px;
    height: 90px;
    margin: 0 auto;
    background: url("./noResult.png") center no-repeat;

    background-size: 86px 90px;
  }
  .no-result-text{
    margin-top: 30px;
    font-size: 16px;
    color:#cccccc;
  }

</style>
