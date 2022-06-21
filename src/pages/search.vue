<template>
  <div>
    <search-header></search-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import SearchHeader from "./../components/SearchHeader";
import NavFooter from "./../components/NavFooter";

export default {
  name: "search",
  components: {
    NavFooter,
    SearchHeader,
  }
};
</script>

<style lang="scss">
.page {
  width: 100%;
  height: 1080px;
}
.red-envelope {
  width: 80%;
  height: 120px;
  padding: 10px 20px 5px;
  display: inline-flex;
  margin-left: 10%;
  margin-right: auto;

  .envelope-left {
    position: relative;
    height: 100%;
    width: 35%;
    border-radius: 10px 0px 0px 10px;
    border: 5px solid;
    border-color: red red red red;
    z-index: 3;
    // text-align: center;
    .envelope-m {
      position: absolute;
      // height: 100%;
      font-size: 76px;
      font-weight: 700;
      color: red;
      top: 50%;
      left: 46%;
      transform: translate(-50%, -50%);
 
    }
  }
       .envelope-m::before {
        content: "￥";
        position: relative;
        font-size: 32px;
        color: red;
        top: -28px;
        left: -2px;
      }

          .envelope-m::after {
        content: "最高";
        position: absolute;
        border: 1px solid rgb(239,224,208);
        font-weight: 400;
        border-radius: 4px;
        font-size: 20px;
        color: rgb(239,224,208);
        top: 30%;
        left: 105%;
       writing-mode: tb-rl;
       padding: 2px 1px;
      }
  .envelope-left::after {
    content: "";
    display: inline-block;
    width: 20px;
    height: 99%;
    background-color: white;
    border: 8px solid transparent;
    border-radius: 0px 50% 50% 0px;
    position: relative;
    z-index: 2;
    left: 98%;
    top: 1%;
    // -webkit-transform-origin: center bottom;
    // transform-origin: center bottom;
    // -webkit-transform: translate(-50%, 0) scaleY(.04);
    //  transform: translate(-50%, 0) scaleY(.04);
  }

  .envelope-right {
    height: 100%;
    width: 65%;
    background-color: rgb(244,59,39);
    border-radius: 0px 8px 8px 0px;
    z-index: 1;
    position: relative;

    .envelope-text{
      position: absolute;
       font-size: 28px;
      color: rgb(254,250,247);
      letter-spacing: 2px;
       top: 50%;
      left: 20%;
      transform: translate(0, -50%);
    }
    .envelope-btn{
      font-size: 24px;
      background-color: rgb(253, 236, 206);
      font-weight: 600;
      color: rgb(197,66,12);
       position: absolute;
       padding: 6px 8px;
       border: 1px solid rgb(219,81,53);
       border-radius: 5px;
       letter-spacing: 2px;
       top: 50%;
      left: 56%;
       transform: translate(0, -50%);
    }
  }
}
// .split-d{
//     position: absolute;
//     left: 30%;
//     z-index: 99;
//     width: 30px;
//     height: 105px;
//     border-style: solid;
//     border-color: white;
//     background-color: white;
//     border-radius: 0px 90px 90px 0px;
// }
</style>