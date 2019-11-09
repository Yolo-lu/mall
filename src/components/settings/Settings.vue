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
          <div class="img">
            <img :src="users.avatar" alt="" />
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
        <div class="name">
          <van-field
            v-model="users.nickname"
            clearable
            label="昵称"
            placeholder="users.nickname"
            size="large"
          />
        </div>
        <div class="name">
          <van-field
            v-model="users.gender"
            clearable
            label="性别"
            placeholder="users.gender"
            size="large"
          />
        </div>
        <div class="name">
          <van-field
            clearable
            label="邮箱"
            placeholder="请输入邮箱"
            size="large"
          />
        </div>
        <div class="name">
          <van-field
            v-model="showDate"
            clearable
            label="出生年月"
            placeholder="请输入出生年月"
            size="large"
            is-link
            @click="showPopups"
          >
          </van-field>
        </div>
        <div>
          <van-popup
            v-model="shows"
            position="bottom"
            :style="{ height: '40%', width: '100%' }"
            get-container="body"
          >
            <van-datetime-picker
              v-model="date"
              type="date"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="sure(date)"
              @cancel="close"
            />
          </van-popup>
        </div>
      </div>
      <div class="button">
        <div class="save">
          <van-button type="primary" size="large" @click="save"
            >保存</van-button
          >
        </div>
        <div class="cancel">
          <van-button type="default" size="large" @click="cancel">取消</van-button>
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
    // users: {
    //   type: Object,
    //   default: () => {}
    // }
  },
  data() {
    return {
      show: false, //设置的遮罩层
      shows: false, //时间选择器的遮罩层
      date: "", //拿到的user的年月日
      showDate: "", //展示的格式化的出生年月
      minDate: new Date(1930, 0, 1), //创建时间选择器的最小日期
      maxDate: new Date() ,//创建时间选择器的最大日期，即当前时间
      id:'', //获取用户id
      users:{}, // 获取用户信息
    };
  },
  methods: {
    showPopup() {
      //打开设置德遮罩层
      this.show = true;
      this.date = this.$dayjs()
        .year(this.users.year)
        .month(this.users.month)
        .day(this.users.day);
      this.showDate = this.$dayjs(this.date).format("YYYY年MM月DD日");
    },
    back() {
      this.show = false;
    },
    showPopups() {
      //打开时间选择器的遮罩层
      this.shows = true;
    },
    sure(date) {
      //点击时间选择器的确认
      this.shows = false;
      this.showDate = this.$dayjs(date).format("YYYY年MM月DD日");

    },
    close() {
      //点击时间选择器的qu
      this.shows = false;
    },
    //获取用户
    async user() {
      try {
        let res = await this.$api.user();
        this.id=res.userInfo._id;
        this.users=res.userInfo
        // console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    async saveUser(val) {  //保存的接口
      try {
        let res = await this.$api.saveUser(val);
        this.$toast(res.msg);
        console.log(res);
        if(res.code===200){
          let user = res.user;
          this.$store.state.user = user;
          localStorage.setItem("user", JSON.stringify(user));
          this.$router.push("./mine");
        }
      } catch (e) {
        console.log(e);
      }
    },
    save(){  //点击保存
      let user={};
      user.year=this.$dayjs(this.date).year();
      user.month=this.$dayjs(this.date).month();
      user.day=this.$dayjs(this.date).date();
      user.gender=this.users.gender;
      user.nickname=this.users.nickname;
      user.id=this.users._id;
      this.saveUser(user);
    },
    cancel(){  //点击取消关闭设置的遮罩层
      this.show=false
    }
  },

  mounted() {
    //取出数据库中存的用户信息
    this.user();
  },
  created() {},
  filters: {},
  computed: {
    // users(){
    //   return this.$store.state.user
    // }
  },
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
.text {
  .photo {
    display: flex;
    height: 60px;
    justify-content: space-between;
    .head {
      line-height: 60px;
      margin-left: 20px;
    }
    .img {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      margin-right: 20px;
      display: flex;
      img {
        display: block;
        border-radius: 50%;
      }
    }
    .next {
      line-height: 60px;
    }
  }
}
.button {
  margin: 0 30px;
  .save {
    margin-top: 30px;
  }
  .cancel {
    margin-top: 20px;
  }
}
</style>
