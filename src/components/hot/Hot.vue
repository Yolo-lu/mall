<template>
  <div>
    <div class="hot">
      <div class="list" v-for="(item,index) in data" :key="index">
        <img :src="item.image" alt="">
        <div class="text">{{ item.name }}</div>
        <div class="price">
          ￥{{ item.price }}
          <s>￥{{ item.mallPrice }}</s>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hot",
  components: {},
  props: {
    data:{
      type: Array,
      default: () => [] /**子组件接收数据**/
    }
  },
  data() {
    return {};
  },
  methods: {},

  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
  .hot{
    display: flex;
    flex-wrap: wrap;
    .list{
      flex: 0 0 50%;
      img {
        display: block;
      }
      .text {
        color: #E2534D;
        width: 180px;
        height: 16px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin: 5% 0;
        padding-left: 5px;
      }
      .price {
        color: #E2534D;
        padding-left: 6px;
        text-align: center;
        padding-bottom: 5px;
        s {
          color: #b6b6b6;
          font-size: 12px;
        }
      }
    }
  }
</style>
