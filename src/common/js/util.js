export  function DelayedLoading( fun,time){
  // console.log("执行工具函数")
  let timer;
  return function(...args){
    console.log("----------args-----------")
    console.log(args)
    console.log("----------args-----------")
    if(timer){
      clearTimeout(timer)
    }
    timer=setTimeout(()=>{
      console.log("计时器开始")
      fun.apply(this,args)
    },time)
  }

}
