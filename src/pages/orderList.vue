<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(order, index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{ order.createDate }}
                <span>|</span>
                {{ order.address.recipient }}
                <span>|</span>
                订单号：{{ order.orderCode }}
                <span>|</span>
                {{ order.statusDesc }}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{ order.total }}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div
                  class="good-list"
                  v-for="(item, i) in order.orderItems"
                  :key="i"
                >
                  <div class="good-img">
                    <img :src="'img/productSingle/' + item.product.firstProductImage.id + '.jpg'" alt="" />
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{ item.product.name }}</div>
                    <div class="p-money">
                      {{  item.product.promotePrice + 'X' + item.number }}元
                    </div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status == 'waitDelivery'">
                <a href="javascript:;">{{ order.statusDesc }}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(order.id)">{{
                  order.statusDesc
                }}</a>
              </div>
            </div>
          </div>
          <div class="load-more" v-if="total > 0">
            <a-button type="primary" :loading="loading" @click="loadMore"
              >加载更多</a-button
            >
          </div>
          <no-data v-if="!loading && list.length == 0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import Loading from './../components/Loading'
import NoData from './../components/NoData'
export default {
  name: 'order-list',
  components: {
    OrderHeader,
    Loading,
    NoData,
  },
  data() {
    return {
      loading: false,
      list: [],
      pageNum: 1,
      total: 0,
      showNextPage: true, //加载更多：是否显示按钮
    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      this.loading = true
      this.$axios
        .get('/orders', {
          params: {
            start: this.pageNum,
            size: 1,
          },
        })
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res)
          this.loading = false
          this.list = this.list.concat(res.content)
          this.total = res.navigatePages
          this.showNextPage = res.hasPrevious
        })
        .catch(() => {
          this.loading = false
        })
    },
    goPay(orderNo) {
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo,
        },
      })
    },
   
    loadMore() {
      this.pageNum++
      this.getOrderList()
    },
  },
}
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      .pagination {
        text-align: right;
      }
      .ant-btn-primary {
        background-color: #ff6600;
        border-color: #ff6600;
      }
      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>
