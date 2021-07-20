import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import VerifyUser from "../views/VerifyUser.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/verify-user",
    name: "VerifyUser",
    component: VerifyUser,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const now = Date.now() / 1000;
    const TokenExpiation = localStorage.getItem("tokenExpireTime") || null;
    if (now > TokenExpiation) {
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
      next({ name: "Login" });
    } else if (store.state.auth.user != null && store.state.auth.token == "") {
      next({ name: "VerifyUser" });
    } else if (store.state.auth.user == null && store.state.auth.token == "") {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
