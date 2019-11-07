<template>
  <div>
    <div class="box">
      <div class="list">
        <div v-for="(item,index) in data.slice(0,2)" :key="item.goodsId" @click="buy(index)">
          <div class="left"><img :src="item.image" alt=""></div>
        </div>
      </div>
    <div class="list">
      <div v-for="(item,index) in data.slice(2)" :key="item.goodsId" @click="buy(index)">
        <div class="left"><img :src="item.image" alt=""></div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Floor",
  components: {},
  props: {
    data: {
      type: Array,
      default: () => [] /**子组件接收数据**/
    },

  },
  data() {
    return {};
  },
  methods: {
    buy(val){  //跳转详情页
      this.$router.push({name:"detail",query:{id:this.data[val].goodsId}})
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
  .box{
    display: flex;
    justify-content: space-around;
    .list{
      flex: 1;
    }
    img{
      width: 100%;
      display: block;
    }
  }
</style>
