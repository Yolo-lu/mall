<template>
  <div>
    <div class="icon" is-link @click="showPopup">
      <van-icon name="setting" color="white" size="25px" />
    </div>
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '100%' }"
      get-container="body"
    >
      <div class="title">
        <div class="close" @click="back">
          <van-icon name="arrow-left" color="#58A9FB" size="35px" />
        </div>
        <div class="info">个人资料</div>
      </div>
      <div class="text">
        <div class="photo">
          <div class="head">头像</div>
          <div class="img"><img :src=users.avatar alt="">
            <div class="next"><van-icon name="arrow" /></div>
          </div>

        </div>
        <div class="name">
          <van-field
              v-model="users.username"
              clearable
              label="用户名"
              placeholder="users.username"
              size="large"
          />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "Settings",
  components: {},
  props: {
    users: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    back() {
      this.show = false;
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
.icon {
  position: absolute;
  top: 50px;
  right: 10px;
}
.title {
  display: flex;
  height: 45px;
  border-bottom: #f2f2f2 1px solid;
  .close {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .info {
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin: auto;
  }
}
  .text{
    .photo{
      display: flex;
      height: 60px;
      justify-content: space-between;
      .head{
        line-height: 60px;
        margin-left: 20px;
      }
      .img{
        width: 55px;
        height: 55px;
        border-radius: 50%;
        img {
          display: block;
          border-radius: 50%;
        }
      }
      .next{
        line-height: 60px;
      }
    }
  }
</style>
