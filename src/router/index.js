import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Structrue from "../views/structrue/Structrue"; /*引入公共结构*/
Vue.use(VueRouter);

/*配路由*/
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  // 首页
  {
    path: "/home",
    component: Structrue,
    children: [
      {
        path: "",
        name: "home",
        component: Home,
        meta: {
          title: "首页"
        }
      }
    ]
  },
  // 分类
  {
    path: "/category",
    component: Structrue,
    children: [
      {
        path: "",
        name: "category",
        component: () => import("../views/category/Category")
      }
    ]
  },
  // 购物车
  {
    path: "/shoppingCar",
    component: Structrue,
    children: [
      {
        path: "",
        name: "shoppingCar",
        component: () => import("../views/shoppingCar/ShoppingCar")
      }
    ]
  },
  // 我的
  {
    path: "/mine",
    component: Structrue,
    children: [
      {
        path: "",
        name: "mine",
        component: () => import("../views/mine/Mine"),
        meta: {
          title: "我的"
        }
      }
    ]
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login"),
    meta:{
      title:"登录"
    }
  },
  // 定位
  {
    path: "/location",
    name: "location",
    component: () => import("../views/location/Location"),
    meta:{
      title:"定位"
    }
  },

  // 地址列表
  {
    path: "/adresslist",
    name: "adresslist",
    component: () => import("../views/adresslist/AdressList"),
    meta:{
      title:"地址列表"
    }
  },
  // 地址编辑
  {
    path: "/adressedit",
    name: "adressedit",
    component: () => import("../views/adressedit/Adressedit"),
    meta:{
      title:"地址编辑"
    }
  },
  // 订单结算
  {
    path: "/order",
    name: "order",
    component: () => import("../views/order/Order"),
    meta:{
      title:"订单结算"
    }
  },
  // 商品详情
  {
    path: "/detail",
    name: "detail",
    component: () => import("../views/detail/Detail"),
    meta:{
      title:"商品详情"
    }
  },
  // 收藏管理
  {
    path: "/collection",
    name: "collection",
    component: () => import("../views/collection/Collection"),
    meta:{
      title:"收藏管理"
    }
  },
  // 评价中心
  {
    path: "/evaluationcentre",
    name: "evaluationcentre",
    component: () => import("../views/evaluationcentre/EvaluationCentre"),
    meta:{
      title:"评价中心"
    }
  },
  // 评价详情
  {
    path: "/evaluationdetail",
    name: "evaluationdetail",
    component: () => import("../views/evaluationdetail/EvaluationDetail"),
    meta:{
      title:"评价详情"
    }
  },
  // 评价页面
  {
    path: "/evaluation",
    name: "evaluation",
    component: () => import("../views/evaluation/Evaluation"),
    meta:{
      title:"评价页面"
    }
  },
  // 已完成
  {
    path: "/completed",
    name: "completed",
    component: () => import("../views/completed/Completed"),
    meta:{
      title:"已完成"
    }
  },
  // 我的订单
  {
    path: "/myorder",
    name: "myorder",
    component: () => import("../views/myorder/MyOrder"),
    meta:{
      title:"我的订单"
    }
  },
  //最近浏览
  {
    path: "/watch",
    name: "watch",
    component: () => import("../views/watch/Watch"),
    meta:{
      title:"最近浏览"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//网页标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});
export default router;
