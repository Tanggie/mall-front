<template>
<div class="seckill-box">
<div class="seckill-title">
  商品秒杀
</div>
<div class="seckill-dsc">
<strong>{{targetTime}}</strong>点场 距结束
</div>
<span class="timmer timer-main">
<span class="timer_util util-hour">{{c_hour}}</span>
<span class="timer_util util-minute">{{c_minute}}</span>
<span class="timer_util util-second">{{c_second}}</span>
</span>
</div>
  
</template>
<script>
import { onMounted } from '@vue/runtime-core';
import moment from 'moment'
import { ref } from 'vue'
export default {
  name: "seckill",
  props:{
    targetTime: String
  },
  setup(props){
   const  c_hour = ref(0);
   const  c_minute = ref(0);
   const  c_second = ref(0);
      var m1 = moment();
  let t =  props.targetTime.split(":");

  m1.set("hour", t[0]);
  m1.set("minute", t[1]);
     

  const updateTime = () =>{
let now = moment();
     let _c_hour = m1.diff(now, 'hours') % 60;
    let _c_minute = m1.diff(now, 'minutes') % 60;
     let _c_second = m1.diff(now, 'seconds') % 60;
    c_hour.value = _c_hour < 10 ? '0' + _c_hour : _c_hour;
    c_minute.value = _c_minute < 10 ? '0' + _c_minute : _c_minute;
    c_second.value = _c_second < 10 ? '0' + _c_second : _c_second;
  }

  onMounted(() => {
        setInterval(updateTime, 100)
    })
 return {
   c_hour, c_minute, c_second
 }
  }
};
</script>

<style lang="scss">
.page {
  width: 100%;
  height: 1080px;
}
.seckill-box{
    width: 190px;
    height: 248px;
    background-color: #e83632;
    background-image: url(https://misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/img/4a15d8883775742e3efbb850ae14def7.png);
    background-size: contain;
    background-position: 50%;
   background-repeat: no-repeat;
   float: left;
   color: #ffffff;
   .seckill-title{
       width: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    margin-top: 22px;
    
   }
   .seckill-dsc{
       margin-top: 81px;
    font-size: 14px;
    text-align: center;
    strong {
    font-size: 18px;
    padding-right: 2px;
    vertical-align: middle;
    display: inline-block;
    margin-top: -1px;
}
   }
   .timer-main{
           margin-left: 29px;
    // margin-right: auto;
    width: 154px;
    height: 30px;
    margin-top: 10px;
    display: block;
    .timer_util{
          position: relative;
    float: left;
    width: 30px;
    height: 30px;
    text-align: center;
    background-color: #2f3430;
    margin-right: 20px;
    color: white;
    font-size: 20px;
    }
    .timer_util::after{
          content: ":";
    display: block;
    position: absolute;
    right: -20px;
    font-weight: bolder;
    font-size: 18px;
    width: 20px;
    height: 100%;
    top: 0;
    }
    .timer_util:last-child::after{
      content: "";
    }
   }
   .timmer {
    color: #333;
    font-weight: 700;
}
}

</style>