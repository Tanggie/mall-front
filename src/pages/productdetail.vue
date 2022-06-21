<template>
  <div class="detail">
    <product-param v-bind:title="product.name"></product-param>

   <div>
       <div class="product">
  </div>
   </div>
    <service-bar></service-bar>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, ref } from 'vue'
import ProductParam from './../components/ProductParam'
import ServiceBar from './../components/ServiceBar'
export default {
  name: 'detail',
  components: {
    ProductParam,
    ServiceBar,
  },
  setup() {
    const { ctx } = getCurrentInstance()
    let id = ctx.$router.currentRoute.value.params.id //获取商品ID
    const version = ref(1) //商品版本切换
    const product = ref({}) //商品信息

    onMounted(() => {
      getProductInfo()
    })
    const getProductInfo = () => {
      ctx.$axios.get(`/products/${id}`).then((res) => {
        product.value = res
      })
    }
    const addCart = () => {
      ctx.$axios
        .post('/carts', {
          productId: id.value,
          selected: true,
        })
        .then((res = { cartProductVoList: 0 }) => {
          ctx.$store.dispatch('saveCartCount', res.cartTotalQuantity)
          ctx.$router.push('/cart')
        })
    }
    return {
      id,
      version,
      product,
      getProductInfo,
      addCart,
    }
  },
}
</script>
<style lang="scss">

</style>
