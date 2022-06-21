<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">拼夕夕</a>
          <a href="javascript:;">热点资讯</a>
          <a href="javascript:;">商家入驻</a>
          <a href="javascript:;">手机版</a>
        </div>
        <div class="topbar-user">
          <a  v-if="username">{{username}}</a>
          <a  v-if="!username" @click="login">登录</a>
          <a  v-if="username" @click="logout">退出</a>
          <a  v-if="username">我的订单</a>
          <a  class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="h-logo">
          <a href="/#/index"><img src="/imgs/pdd_logo_v2.png"></a>
        </div>
        
        <div class="header-search">
          <div class="wrapper">
            <input type="text" placeholder="输入关键词搜索" v-model="searchKey">
            <a @click="search"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="seckill-row" style="width: 100%;">
      <div class="isShown" v-if="recommendList.length <= 0 || recommendList[0].length <= 0" >
        <span>抱歉，还没有此类商品哦~</span>
      </div>
      <div  class="pline" v-show="recommendList.length > 0" v-for="(arr,i) in recommendList" :key="i" >
        <div class="seckill-part2">
          <div class="ads-box">
            <a  v-for="(item, index) in arr"
                v-bind:href="'/#/detail/' + item.id"
                v-bind:key="index">
              <img :src="'img/productSingle/' + item.firstProductImage.id + '.jpg'" alt="" />
              <div style="width:100%; display:block; text-align: center; margin-top:6px">
                <span class="text-row-limit" style="text-center;font-weight: 700;">{{item.name}}</span>
              </div>
              <div style="width:100%; display:block; text-align: center; margin-top:0px">
                <span style="text-center; color: #e1251b; font-weight: 700;">￥{{item.originalPrice}}</span>
              </div>
            </a>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { computed, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import {useRoute, useRouter} from 'vue-router'
  import axios from 'axios'
  import {message} from 'ant-design-vue'
  import cookie from 'vue-cookie'
  import Qs from 'qs'
  export default{
    name:'search-header',
    setup(){
      let phoneList = ref([])
      const recommendList = ref([]);
      let store = useStore()
      let route = useRoute()
      let router = useRouter()
      let params = route.params;
      let searchKey = ref('');
      let username = computed(()=>{
        return store.state.username
      })
      let cartCount = computed(()=>{
        return store.state.cartCount
      })
      onMounted(()=>{
        if(params && params.from == 'login'){
          getCartCount();
        }
        init()

      })
      const init = async () => {
        await axios.post('/product/search', Qs.stringify({
          keyword : params.keyword?params.keyword:'手机',
          page : 1,
          size : 20
        })).then((res)=>{
          recommendList.value = [res.slice(0,4),res.slice(4,8),res.slice(8,12),
                                  res.slice(12,16),res.slice(16,20)]
        })
    };
      const search = async ()=>{
        await axios.post('/product/search', Qs.stringify({
          keyword : searchKey.value,
          page : 1,
          size : 20
        })).then((res)=>{
          recommendList.value =[res.slice(0,4),res.slice(4,8),res.slice(8,12),
                                  res.slice(12,16),res.slice(16,20)]
          })
      }
      const login =()=>{ 
        router.push('/login');
      }
      const getCartCount = ()=>{
         axios.get('/fore_cart').then((res=0)=>{
          let result_list = res || []
          store.dispatch('saveCartCount',result_list.length);
        })
      }
      const logout = ()=>{
        axios.get('/user/logout').then(()=>{
          message.success('退出成功');
          cookie.set('userId','',{expires:'-1'});
          store.dispatch('saveUserName','');
          store.dispatch('saveCartCount','0');
        })
      }
      const goToCart = ()=>{
        router.push('/cart');
      }
      return {
        username,
        cartCount,
        phoneList,
        searchKey,
        recommendList,
        login,
        search,
        getCartCount,
        logout,
        goToCart
      }
    },
    filters:{
      currency(val){
        if(!val)return '0.00';
        return '￥' + val.toFixed(2) + '元';
      }
    },
    mounted(){
      
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/base.scss';
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/config.scss';
  .header{
    .nav-topbar{
      height:39px;
      line-height:39px;
      background-color:#333333;
      color:#B0B0B0;
      .container{
        @include flex();
        a{
          display:inline-block;
          color:#B0B0B0;
          margin-right:17px;
        }
        .my-cart{
          width:110px;
          background-color:#FF6600;
          text-align:center;
          color:#ffffff;
          margin-right:0;
          .icon-cart{
            @include bgImg(16px,12px,'/imgs/icon-cart-checked.png');
            margin-right:4px;
          }
        }
      }
    }
    .h-logo{

      height: 60px;
    }
    .nav-header{
      .container{
        position:relative;
        height:112px;
        @include flex();
        .header-menu{
          display:inline-block;
          width:643px;
          padding-left:209px;
          .item-menu{
            display:inline-block;
            color:#333333;
            font-weight:bold;
            font-size:16px;
            line-height:112px;
            margin-right:20px;
            span{
              cursor:pointer;
            }
            &:hover{
              color:$colorA;
              .children{
                height:220px;
                opacity:1;
                border-top:1px solid #E5E5E5;
              }
            }
            .children{
              position:absolute;
              top:112px;
              left:0;
              width:1226px;
              height:0;
              opacity:0;
              overflow:hidden;
              box-shadow:0px 7px 6px 0px rgba(0, 0, 0, 0.11);
              z-index: 10;
              transition:all .5s;
              background-color: #ffffff;
              .product{
                position:relative;
                float:left;
                width:16.6%;
                height:220px;
                font-size:12px;
                line-height:12px;
                text-align: center;
                a{
                  display:inline-block;
                }
                img{
                  width:auto;
                  height:111px;
                  margin-top:26px;
                }
                .pro-img{
                  height:137px;
                }
                .pro-name{
                  font-weight:bold;
                  margin-top:19px;
                  margin-bottom:8px;
                  color:$colorB;
                }
                .pro-price{
                  color:$colorA;
                }
                &:before{
                  content:' ';
                  position:absolute;
                  top:28px;
                  right:0;
                  border-left:1px solid $colorF;
                  height:100px;
                  width:1px;
                }
                &:last-child:before{
                  display:none;
                }
              }
            }
          }
        }
        .header-search{
          width:319px;
          .wrapper{
            height:50px;
            border:1px solid #E0E0E0;
            display:flex;
            align-items:center;
            input{
              border:none;
              box-sizing: border-box;
              border-right:1px solid #E0E0E0;
              width:264px;
              height:50px;
              padding-left:14px;
            }
            a{
              @include bgImg(18px,18px,'/imgs/icon-search.png');
              margin-left:17px;
            }
          }
        }
      }
    }
    .seckill-row{padding-top: 0.5cm;
      margin-bottom: 10px;
      .pline{
        margin-top: 0.5cm;
        margin-bottom: 5cm;
      }
    }
    .isShown{
      width: 55%;
      margin: auto;
      text-align: center;
      font-size: large;
      color: red;
      }
    .seckill-part2{
      width: 55%;
      margin: auto;
      img{
        width:auto;
        height:220px;
        margin-top:26px;
      }
      
      .ads-box {
        @include flex();
        margin-top: -59px;
        // margin-bottom: 31px;

        a {
          width: 296px;
          height: 180px;
          margin: 0px 5px;
        }
      }
    }
  }
</style>