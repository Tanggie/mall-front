<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span
                class="checkbox"
                v-bind:class="{ checked: allChecked }"
                @click="toggleAll"
              ></span
              >全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li
              class="cart-item"
              v-for="(item, index) in list.value"
              v-bind:key="index"
            >
              <div class="item-check">
                <span
                  class="checkbox"
                  v-bind:class="{ checked: item.productSelected }"
                  @click="updateCart(item)"
                ></span>
              </div>
              <div class="item-name">
                <img :src="'img/productSingle/' + item.product.firstProductImage.id + '.jpg'" alt="" />
                <span>{{
                  item.product.name + ' , ' + item.product.subTitle
                }}</span>
              </div>
              <div class="item-price">{{ item.product.promotePrice }}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item, '-')">-</a>
                  <span>{{ item.number }}</span>
                  <a href="javascript:;" @click="updateCart(item, '+')">+</a>
                </div>
              </div>
              <div class="item-total">{{ item.productTotalPrice }}</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            共<span>{{ itemLength }}</span
            >件商品，已选择<span>{{ checkedNum }}</span
            >件
          </div>
          <div class="total fr">
            合计：<span>{{ cartTotalPrice }}</span
            >元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import ServiceBar from './../components/ServiceBar'
import NavFooter from './../components/NavFooter'
import { getCurrentInstance, onMounted, reactive, ref, watch, onBeforeMount} from 'vue'
import { message } from 'ant-design-vue'
export default {
  name: 'index',
  components: {
    OrderHeader,
    ServiceBar,
    NavFooter,
  },
  setup() {
    const { proxy } = getCurrentInstance()
    let list = reactive([]) //商品列表
    const allChecked = ref(false) //是否全选
    const cartTotalPrice = ref(0) //商品总金额
    const checkedNum = ref(0) //选中商品数量
    const itemLength = ref(0) // 数目
//  var result;
    onMounted(() => {
      checkLogin()
      getCartList()
      //  renderData(result)
    })
    onBeforeMount (()=>{
        //   if (localStorage.getItem("data") ) {
        //     //replaceState替换数据 Object.assign合并对象
        //     proxy.$store.replaceState(Object.assign({}, proxy.$store.state,JSON.parse(localStorage.getItem("data"))))
        // }
        // window.addEventListener("beforeunload",()=>{
        //     localStorage.setItem("data",JSON.stringify(proxy.$store.state))
        // });
    })
    // watch (()=>{
    //   getCartList()
    // })
 watch(proxy.$router.currentRoute, () => {
          // getData(); //获取列表数据方法
              // getCartList()
        });
    // 获取购物车列表
    const getCartList = () => {
      proxy.$axios.get('/fore_cart').then((res) => {
        // eslint-disable-next-line no-console
        console.log(res)
        // result = res;
        renderData(res)
      })
    }
    // 更新购物车数量和购物车单选状态
    const updateCart = (item, type) => {
      let quantity = item.number,
        selected = item.productSelected
      if (type == '-') {
        if (quantity == 1) {
          message.warning('商品至少保留一件')
          return
        }
        --item.number
      } else if (type == '+') {
        if (quantity > item.product.stock) {
          message.warning('购买数量不能超过库存数量')
          return
        }
        ++item.number
      } else {
        item.productSelected = !item.productSelected
      }
    
      updateCartItemTotal();
      proxy.$axios
        .get('/fore_changeOrderItem', {
        params: {
           pid: item.product.id,
          num: item.number,
        },})
        .then((res) => {
          // renderData(list)
          // eslint-disable-next-line no-console
          if (res !== "修改购物车成功!"){
     item.number = quantity;
      item.productSelected = selected;
          }
          // message.info(res)
          
        })
    }
    // 删除购物车商品
    const delProduct = (item) => {
      proxy.$axios.delete('/delete_cart', {
        params: {
           oiid: item.id,
        },}).then(() => {
               let i = list.value.indexOf(item);
                  list.value.splice(i, 1)
        message.success('删除成功')
        // renderData(res)
 
      })
    }
    // 控制全选功能
    const toggleAll = () => {
      let url = allChecked.value ? '/carts/unSelectAll' : '/carts/selectAll'
      proxy.$axios.put(url).then(() => {
        // renderData(res)
      })
    }
    const checkLogin=()=>{
      // let username = proxy.$store.state.username;
      // if (username == ""){
      //    proxy.$router.push('/login')
      // }
    }
    // 公共赋值
    const renderData = (res) => {
      list.value = res || []
      // allChecked.value = res.selectedAll
      // cartTotalPrice.value = res.cartTotalPrice
      // checkedNum.value = list.value.filter(
      //   (item) => item.number
      // ).length
      list.value.forEach((item) =>{
        item['productSelected'] = false;
        item['productTotalPrice'] = (item.product.promotePrice * item.number).toFixed(2);
       
      })
      itemLength.value = list.value.length;
    }
        const updateCartItemTotal = () => {

      list.value.forEach((item) =>{
        item['productTotalPrice'] = (item.product.promotePrice * item.number).toFixed(2);
       
      })
      updateCartTotal()
    }
          const updateCartTotal = () => {
       let total = 0;
       let check_num = 0;
       itemLength.value = list.value.length
      list.value.forEach((item) =>{
       if (item['productSelected']){
        total = total + Number(item['productTotalPrice']);
        check_num++
       }
            cartTotalPrice.value = total.toFixed(2)
            checkedNum.value =check_num
      })
    }
    
    // 购物车下单
    const order = () => {
        let ooid_list = [];
        list.value.forEach((item) =>{
       
       if (item['productSelected']){
        ooid_list.push(item.id)
       }
       })
   
      let isCheck = list.value.every((item) => !item.productSelected)
      if (isCheck) {
        message.warning('请选择一件商品')
      } else {
       proxy.$axios.get('/fore_buy', {
        params: {
           oiids: ooid_list + '',
        },}).then((res) => {
       // eslint-disable-next-line no-console
       console.log(res)
         proxy.$router.push({
        name: 'order-confirm',
        params:{
          res: JSON.stringify(res)
        }})
        // renderData(res)
      })
       
      }
    }
    return {
      list,
      allChecked,
      cartTotalPrice,
      checkedNum,
      getCartList,
      updateCart,
      delProduct,
      toggleAll,
      renderData,
      order,
      itemLength,
    }
  },
}
</script>
<style lang="scss">
.cart {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 114px;
    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999999;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url('/imgs/icon-gou.png') #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;
          .item-check {
            flex: 1;
          }
          .item-name {
            flex: 3;
            font-size: 14px;
            color: #333333;
            display: flex;
            align-items: center;
            img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }
          }
          .item-price {
            flex: 1;
            color: #333333;
          }
          .item-num {
            flex: 2;
            .num-box {
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #e5e5e5;
              font-size: 14px;
              a {
                display: inline-block;
                width: 49px;
                color: #333333;
              }
              span {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
            }
          }
          .item-total {
            flex: 1;
            color: #ff6600;
          }
          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url('/imgs/icon-close.png') no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }
    .order-wrap {
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip {
        margin-left: 29px;
        a {
          color: #666666;
          margin-right: 37px;
        }
        span {
          color: #ff6600;
          margin: 0 5px;
        }
      }
      .total {
        font-size: 14px;
        color: #ff6600;
        span {
          font-size: 24px;
        }
        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>
