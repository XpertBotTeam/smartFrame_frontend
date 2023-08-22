import { createRouter, createWebHistory } from "vue-router";
import AppHome from "@/components/AppHome.vue";
// import AppHeader from "@/components/AppHeader.vue";
import AppLogin from "@/components/AppLogin.vue";
import AppRegister from "@/components/AppRegister.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: AppHome,
    },
    {
      path: "/login",
      name: "Login",
      component: AppLogin,
    },
    {
      path: "/register",
      name: "Register",
      component: AppRegister,
    },
  ],
});

export default router;
