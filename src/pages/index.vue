<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电脑 数码</a>
              <div class="children">
                <ul v-for="(item, i) in menuList" v-bind:key="i">
                  <li v-for="(sub, j) in item" v-bind:key="j">
                    <a v-bind:href="sub ? '/#/detail/' + sub.id : ''">
                      <img
                        v-bind:src="sub ? sub.img : '/imgs/menu/reachAll.png'"
                        alt=""
                      />
                      {{ sub ? sub.name : "查看全部" }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">男装 女装 童装</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">美妆 个护清洁 宠物</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">女鞋 箱包 钟表</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">零食 生鲜 茶酒</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家纺 家饰 鲜花</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">手表 眼睛 珠宝饰品</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家具 家居 家装</a>
            </li>
          </ul>
        </div>
        <a-carousel autoplay>
          <div v-for="(item, index) in slideList" v-bind:key="index" class="auto-play">
            <a v-bind:href="'/#/detail/' + item.id"
              ><img v-bind:src="item.img"
            /></a>
          </div>
        </a-carousel>
      </div>
      <div class="seckill-row" style="width: 100%; display:flex">
        <div class="seckill-part" style="width:20%">
     <seckill target-time="23:30"> </seckill>
        </div>
        <div class="seckill-part2">
               <div class="ads-box">
        <a
          v-bind:href="'/#/seckill/' + item.id"
          v-for="(item, index) in adsList"
          v-bind:key="index"
        >
          <img :src="'img/productSingle/' + item.firstProductImage.id + '.jpg'" alt="" />
               <div style="width:100%; display:block; text-align: center; margin-top:6px">
            <span class="text-row-limit" style="text-center;font-weight: 700;">{{item.name}}</span></div>
          <div style="width:100%; display:block; text-align: center; margin-top:0px">
            <span style="text-center; color: #e1251b; font-weight: 700;">￥{{item.originalPrice}}</span></div>
      
        </a>
      </div>
        </div>
 
      </div>
      <!-- <div class="banner">
        <a href="/#/product/30">
          <img src="/imgs/banner-1.png" alt="" />
        </a>
      </div> -->

    </div>
    <div class="product-box">
      <div class="container">
        <h2>推荐</h2>
        <hr class="divider" />
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35"><img src="/imgs/find_ads1.png" alt="" /></a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr, i) in recommendList" v-bind:key="i">
              <div class="item"  v-for="(item, j) in arr" v-bind:key="j">
                <span v-bind:class="{ 'new-pro': j % 2 == 0 }">新品</span>
                <div class="item-img">
                 <a :href="'/#/detail/' + item.id"> <img :src="'img/productSingle/' + item.firstProductImage.id + '.jpg'" alt="" /> </a>
                </div>
                <div class="item-info">
                <a :href="'/#/detail/' + item.id">    <h3>{{ item.name }}</h3>
                  <p>{{ item.subtitle }}</p></a>
                  <p class="price" @click="addCart(item.id)">
                    {{ item.originalPrice }}元
                  </p>
                </div>
                </div>
              </div>
            </div>
     
        </div>
        <div class="envelope-wrapper"><ad-envelope></ad-envelope></div>
      </div>
      <div class="container">
        <h2>精彩活动</h2>
        <hr class="divider" />
        <div class="wrapper">
          <div class="t-img">
            <a> <img src="imgs/ads/seckill_v2.jpg" alt="" /> </a>
          </div>
          <div class="mm-img">
            <div class="m1-img">
              <a><img src="imgs/ads/sale_v2.jpg" alt="" /> </a>
            </div>
            <div class="m2-img">
              <a> <img src="imgs/ads/supermarket_v2.jpg" alt="" /> </a>
            </div>
            <div class="m1-img" style="padding-right: 5px">
              <a> <img src="imgs/ads/download.jpg" alt="" /> </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal
      title="提示"
      sureText="查看购物车"
      btnType="1"
      modalType="middle"
      v-bind:showModal="showModal"
      v-on:submit="goToCart"
      v-on:cancel="showModal = false"
    >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>
<script>
import ServiceBar from "./../components/ServiceBar";
import Modal from "./../components/Modal";
import adEnvelope from "./../components/ad_v1.vue";
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import seckill from './../components/seckill.vue';
// import axios from 'axios';
// import Qs from 'qs';
export default {
  name: "index",
  components: {
    ServiceBar,
    Modal,
    adEnvelope,
    seckill,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const slideList = reactive([
      {
        id: "42",
        img: "/imgs/ads/auto_1.png",
      },
      {
        id: "45",
        img: "/imgs/ads/auto_2.jpg",
      },
      {
        id: "46",
        img: "/imgs/slider/slide-3.jpg",
      },
      {
        id: "",
        img: "/imgs/slider/slide-4.jpg",
      },
      {
        id: "",
        img: "/imgs/slider/slide-1.jpg",
      },
    ]);
    const menuList = reactive([
      [
        {
          id: 30,
          img: "/imgs/menu/earphone.webp",
          name: "耳机麦克风",
        },
        {
          id: 31,
          img: "/imgs/menu/phone.webp",
          name: "手机",
        },
        {
          id: 32,
          img: "/imgs/menu/protableBattery.webp",
          name: "充电宝",
        },
        {
          id: 33,
          img: "/imgs/menu/applePhone.webp",
          name: "苹果",
        },
      ],
        [
        {
          id: 30,
          img: "/imgs/menu/secondHand.webp",
          name: "二手数码",
        },
        {
          id: 31,
          img: "/imgs/menu/audioMovie.webp",
          name: "音响影视",
        },
        {
          id: 32,
          img: "/imgs/menu/kemozhijia.webp",
          name: "壳膜支架",
        },
        0
      ],    
       [
        {
          id: 30,
          img: "/imgs/menu/others.png",
          name: "外设配件",
        },
        {
          id: 31,
      img: "/imgs/menu/others.png",
          name: "3C配件",
        },
        {
          id: 32,
            img: "/imgs/menu/others.png",
          name: "台式电脑",
        },
             {
          id: 32,
      img: "/imgs/menu/others.png",
          name: "学习机",
        },
      ],
             [
        {
          id: 30,
         img: "/imgs/menu/others.png",
          name: "网络设备",
        },
        {
          id: 31,
        img: "/imgs/menu/others.png",
          name: "办公设备",
        },
        {
          id: 32,
       img: "/imgs/menu/others.png",
          name: "游戏电玩",
        },
           0
      ],
    [
        {
          id: 30,
         img: "/imgs/menu/others.png",
          name: "个性保健",
        },
        {
          id: 31,
           img: "/imgs/menu/others.png",
          name: "生活电器",
        },
        {
          id: 32,
         img: "/imgs/menu/others.png",
          name: "中式厨电",
        },
               {
          id: 32,
         img: "/imgs/menu/others.png",
          name: "电视",
        },     
      ],
        [
        {
          id: 30,
         img: "/imgs/menu/others.png",
          name: "洗衣机",
        },
        {
          id: 31,
           img: "/imgs/menu/others.png",
          name: "冰箱",
        },
        {
          id: 32,
         img: "/imgs/menu/others.png",
          name: "热水器",
        },
              0   
      ],
    ]);
    const adsList = ref([]);
    const recommendList = ref([]);
    const showModal = ref(false);

    onMounted(() => {
     init_products()
      init();

    });
    const init = async () => {
      const res = await proxy.$axios.get("/product/product_list", {
        params: {
           start: 4,
          size: 8,
        },
      });
      recommendList.value = [res.content.slice(0, 4), res.content.slice(4, 8)];
    };

    const init_products = async () => {
      const res = await proxy.$axios.get("/product/product_list", {
        params: {
           start: 12,
          size: 5,
        },
      
    });
  
      // res.content = res.list.slice(6, 14);
      adsList.value = res.content;
    
            // eslint-disable-next-line no-console
      console.log(adsList);
    };
        const addCart = async(id) => {
      proxy.$axios
        .get('/add_cart', {
        params: {
           pid: id,
          num: 1,
        },
      })
        .then(() => {
          let cart_count = proxy.$store.state.cartCount;
          proxy.$store.dispatch('saveCartCount', cart_count + 1)
        })
            showModal.value = true;
    };
    const goToCart = () => {
      proxy.$router.push({name:'cart',
          params: {
            date:new Date().getTime()
          }});
    };

  //   const getImageByIdList = async (imageId) => {
  //  const res = await proxy.$axios.get("/products/" + imageId + "/productImages", Qs.stringify({
  //       params: {
  //         // cid: 60,
  //         type: "single",

  //       },
  //     }));
  //     // eslint-disable-next-line no-console
  //     console.log(res)
  //   }
    return {
      slideList,
      menuList,
      adsList,
      recommendList,
      showModal,
      init,
      addCart,
      goToCart,
    };
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.auto-play{
  a img{
height: 460px;
  }
}
.text-row-limit{
      text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    overflow: hidden;
    width: 100%;
    line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    color: #333;
    font-weight: 400;
}
.index {
  .swiper-box {
    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 9;
      padding: 26px 0;
      background-color: #55585a7a;
      box-sizing: border-box;
      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;
          a {
            position: relative;
            display: block;
            font-size: 16px;
            color: #ffffff;
            padding-left: 30px;
            &:after {
              position: absolute;
              right: 30px;
              top: 17.5px;
              content: " ";
              @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
            }
          }
          &:hover {
            background-color: $colorA;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            width: 962px;
            height: 451px;
            background-color: $colorG;
            position: absolute;
            top: 0;
            left: 264px;
            border: 1px solid $colorH;
            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;
              li {
                height: 75px;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;
              }
              a {
                color: $colorB;
                font-size: 14px;
              }
              img {
                width: 42px;
                height: 35px;
                vertical-align: middle;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
    .swiper-container {
      height: 451px;
      .swiper-button-prev {
        left: 274px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .container:not(:first-child) {
    margin-top: 66px;
  }
  .seckill-row{
    margin-bottom: 10px;
  }
  .seckill-part2{
    width: 83%;
    margin: auto
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
  .banner {
    margin-bottom: 50px;
  }
  .divider {
    margin-bottom: 28px;
    color: #c1c1c1;
  }
  .product-box {
    background-color: $colorJ;
    padding: 30px 0 50px;
    h2 {
      font-size: $fontF;
      height: 21px;
      line-height: 21px;
      color: $colorB;
      margin-bottom: 20px;
    }
    .envelope-wrapper {
      margin-top: 19px;
    }
    .wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      .t-img {
        width: 100%;
        padding: 10px;
        align-content: center;
        display: table-cell;
        text-align: center;
        vertical-align: center;
        img {
          width: 100%;
          margin: auto;
        }
      }
      a {
        width: 100%;
        height: 100%;
      }
      .mm-img {
        width: 100%;
      }
      .m1-img {
        padding: 10px;
        width: 25%;
        display: table-cell;
        text-align: center;
        vertical-align: center;
        img {
          width: 100%;
          margin: auto;
        }
      }
      .m2-img {
        padding: 10px;
        width: 37%;
        display: table-cell;
        text-align: center;
        vertical-align: center;
        img {
          width: 100%;
          margin: auto;
        }
      }

      .banner-left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 619px;
        }
      }
      .list-box {
        .list {
          @include flex();
          width: 986px;
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0;
          }
          .item {
            width: 236px;
            height: 302px;
            background-color: $colorG;
            text-align: center;
            span {
              display: inline-block;
              width: 67px;
              height: 24px;
              font-size: 14px;
              line-height: 24px;
              color: $colorG;
              &.new-pro {
                background-color: #7ecf68;
              }
              &.kill-pro {
                background-color: #e82626;
              }
            }
            .item-img {
              img {
                width: 100%;
                height: 195px;
              }
            }
            .item-info {
              h3 {
                font-size: $fontJ;
                color: #333;
                line-height: $fontJ;
                font-weight: 400;
                font-size: 12px;
                margin-top: 6px;
              }
              p {
                color: $colorD;
                line-height: 13px;
                margin: 4px auto 13px;
              }
              .price {
                color: #f20a0a;
                font-size: $fontJ;
                font-weight: bold;
                cursor: pointer;
                &:after {
                  @include bgImg(22px, 22px, "/imgs/icon-cart-hover.png");
                  content: " ";
                  margin-left: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
