<template>
  <div>
    <div class="mine">
      <div class="vip">会员中心</div>
      <div class="info" v-if="flag">
        <settings ></settings>
        <div class="img"><img :src="users.avatar" alt="" /></div>
        <div class="text">欢迎您 :{{ users.nickname }}</div>
        <div class="logout" >
          <div  @click="exit">退出登录</div>
        </div>
      </div>
      <div class="info" v-else>
        <settings :users="users"></settings>
        <div class="img"><img src="../../assets/head.jpg" alt="" /></div>
        <div class="text">欢迎您</div>
        <div class="logout" >
          <div @click="login">登录/注册</div>
        </div>
      </div>

      <vipcenter></vipcenter>
    </div>
  </div>
</template>

<script>
import vipcenter from "../../components/vipcenter/vipCenter";
import settings from "../../components/settings/Settings";
export default {
  name: "Mine",
  components: {
    vipcenter,
    settings
  },
  props: {},
  data() {
    return {
      flag:true
    };
  },
  methods: {
    exit(){
      this.$store.state.user=null;    /*退出登录*/
      localStorage.removeItem("user");
      this.loginOut();
      this.flag=false
    },

    async loginOut() {
      try {
        let res = await this.$api.loginOut();
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    login() {
      this.$router.push("./login");
    },

  },

  mounted() {

  },
  created() {},
  filters: {},
  computed: {
    users(){
      return this.$store.state.user
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.mine {
  .vip {
    text-align: center;
    height: 40px;
    line-height: 40px;
    background: white;
    z-index: 99;
    position: relative;
  }

  .info {
    background: #e30c7b;
    height: 200px;
    text-align: center;
    color: white;
    .img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: white;
      margin: auto;
      position: relative;
      top: 30px;
      img {
        display: block;
        border-radius: 50%;
      }
    }
    .text {
      margin-top: 40px;
      font-weight: bold;
      font-size: 18px;
    }
    .logout {
      margin-top: 20px;
    }
  }
}
</style>
