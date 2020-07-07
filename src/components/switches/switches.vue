<template>
  <ul class="switches">
    <li :class="{'active':currentIndex === index}" @click="switchItem(index)"
        class="switch-item"
        v-for="(item ,index) in switches"
    >
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "switches",
      props:{
          switches :{
             type:Array,
            default:[]
          },
        currentIndex:{
            type :Number,
          default:0
        }
      },
      methods:{
        switchItem(index){
          this.$emit("switch",index)
        }
      }
    }
</script>

<style scoped>

  .switches{
    display: flex;
    align-items: center;
    width: 240px;
    margin: 0 auto;
    border: 1px solid #cccccc;
    border-radius: 5px;
  }

  .switch-item{
    flex: 1;
    padding: 8px;
    text-align: center;
    font-size:14px;
    color: #fff;
  }

  .switch-item.active{
         background:#fff;
         color: #cccccc;
       }

</style>
