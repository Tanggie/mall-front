<template>
  <div class="order-header">
    <div class="container clearfix">
      <div class="h1-logo">
           <a href="/#/index"><img src="/imgs/pdd_logo_v2.png" ></a>
      </div>
      <div class="title-text">
        <span>{{title}}<slot name="tip"></slot></span>
      </div>
      <div class="username">
        <a href="javascript:;">{{username}}</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    name:'order-header',
    props:{
      title:String
    },
    computed:{
      ...mapState(['username'])
    },
  }
</script>
<style lang="scss">
   .h1-logo{
      height: 60px;
      width: 171px;
       float:left;
    }

  .order-header{
    padding:30px 0;
    border-bottom:2px solid #FF6600;
    .header-logo{
      float:left;
    }
    .title-text,.username{
      display:inline-block;
      height:55px;
      line-height:55px;
    }
    .title-text{
      float:left;
      margin-left:54px;
      span{
           font-size:28px;
        color:#333333;
      }
      // h2{
      //   font-size:28px;
      //   color:#333333;
      // }
      // span{
      //   font-size:14px;
      //   margin-left:17px;
      //   color:#999999;
      //   font-weight:200;
      // }
    }
    .username{
      float:right;
      a{
        color:#666666;
        font-size:16px;
      }
    }
  }
</style>