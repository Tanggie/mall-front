<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/pdd_logo_v2.png" alt="">
      <!-- <p>拼多多</p> -->
    </div>             
    <div class="footer-link">

    </div>
    <div class="copyright">Copyright ©2022 <span class="domain">www.xxx.com</span> All Rights Reserved.</div>
  </div>
</template>
<script>
  export default{
    name:'nav-footer'
  }
</script>
<style lang="scss" scoped>
  .footer{
    height:234px;
    border-top:4px solid rgb(235,66,89);
    background-color:#333333;
    color:#999999;
    font-size:16px;
    text-align:center;
    .footer-logo{
      margin-top:46px;
      margin-bottom:31px;
      img{
        width:108px;
        height:36px;
        margin-bottom:13px;
      }
    }
    .footer-link{
      a{
        color:#999999;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
      margin-bottom:13px;
    }
    .copyright{
      .domain{
        color:white;
      }
    }
  }
</style>