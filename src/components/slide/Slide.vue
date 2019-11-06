<template>
  <div>
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in image" :key="index"
          ><img :src="item" alt=""
        /></van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slide",
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {

  },

  mounted() {},
  created() {},
  filters: {},
  computed: {
    image() {
      let arr = []; //装图片
      arr.push(this.data.image);
      arr.push(this.data.image_path);
      return arr;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
  img{
    display: block;
  }
</style>
