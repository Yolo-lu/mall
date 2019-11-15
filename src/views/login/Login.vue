<template>
  <div>
    <div class="all">
      <div class="back" @click="goBack">
        <van-icon name="arrow-left" size="25px" class="left" />
      </div>
      <div class="login">
        <div class="text">登录/注册</div>
        <div class="content">
          <van-cell-group>
            <div class="name">
              <van-field
                v-model="user.nickname"
                clearable
                placeholder="USERNAME"
                size="large"
              />
            </div>
            <div class="key">
              <van-field
                v-model="user.password"
                type="password"
                placeholder="PASSWORD"
                size="large"
              />
            </div>
            <div class="code">
              <van-field
                v-model="user.verify"
                label="验证码"
                required
                size="large"
                placeholder="请输入验证码"
              />
              <div v-html="code" @click="turn" class="vertify"></div>
            </div>
          </van-cell-group>
        </div>
        <div class="button">
          <van-button
            type="primary"
            class="left"
            @click="login(user.nickname, user.password, user.verify)"
            >登录</van-button
          >
          <van-button
            type="danger"
            @click="register(user.nickname, user.password, user.verify)"
            >注册</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      user: {
        nickname: "",
        password: "",
        verify: "",
        msg: ""
      },
      code: ""
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    //获取验证码接口
    getAverify() {
      axios.get(`api/verify?mt=${Math.random()}`).then(res => {
        this.code = res;
      });
    },
    turn() {
      //点击图片重新获取验证码
      this.getAverify();
    },
    //注册
    async register(nickname, password, verify) {
      try {
        let res = await this.$api.register(nickname, password, verify);
        this.$toast(res.msg);
        if(res.code===200){
          let user = res.userInfo;
          this.$store.state.user = user;
          localStorage.setItem("user", JSON.stringify(user));
          this.$router.push("./mine");
        }
      } catch (e) {
        console.log(e);
      }
    },
    //登录
    async login(nickname, password, verify) {
      try {
        let res = await this.$api.login(nickname, password, verify);
        this.$toast(res.msg);
        if(res.code===200){
          let user = res.userInfo;
          this.$store.state.user = user;
          localStorage.setItem("user", JSON.stringify(user));
          this.$router.push("./mine");
        }
        // console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  },

  mounted() {
    this.getAverify();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.all {
  background: url("../../assets/bg.jpg");
  height: 100vh;
  background-size: cover;
  .back {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(91, 92, 86, 0.5);
    text-align: center;
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 99;
    .left {
      line-height: 40px;
      color: white;

    }
  }
  .login {
    padding: 120px 10px;
    opacity: 0.7;
    .text {
      height: 40px;
      background: white;
      line-height: 40px;
      font-size: 18px;
      font-weight: bold;
      color: #6c6c6c;
      padding-left: 10px;
    }
    .button {
      background: white;
      .left {
        margin: 10px;
      }
    }
  }
  .code {
    display: flex;
    .vertify {
      margin-right: 10px;
    }
  }
  .name,
  .key,
  .code {
    padding-top: 10px;
    border-bottom: 1px solid #e9e9e9;
    height: 60px;
  }
}
</style>
