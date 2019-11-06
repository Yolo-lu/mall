<template>
  <div style="overflow: hidden">
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#EA6424">
      <van-tabbar-item icon="wap-home-o" @click="skip('/home')">商城</van-tabbar-item>
      <van-tabbar-item icon="apps-o" @click="skip('/category')">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" info="2" @click="skip('/shoppingCar')">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" @click="skip('/mine')">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Structrue",
  components: {},
  props: {},
  data() {
    return {
      active:0
    };
  },
  methods: {
    skip(index){
      this.$router.push(index)
    }
  },

  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">

</style>
