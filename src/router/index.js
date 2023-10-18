import { createRouter, createWebHistory } from "vue-router";
import AppHome from "@/components/AppHome.vue";
// import AppHeader from "@/components/AppHeader.vue";
import AppLogin from "@/components/AppLogin.vue";
import AppRegister from "@/components/AppRegister.vue";
import AppContact from "@/components/AppContact.vue";
import AppCart from "@/components/AppCart.vue";
import AppGallery from "@/components/AppGallery.vue";
import AppGalleryDesc from "@/components/AppGalleryDesc.vue";
import AppFrames from "@/components/AppFrames.vue";
import AppFrameDesc from "@/components/AppFrameDesc.vue";
import AppCustomize from "@/components/AppCustomize.vue";
import AppUploadArt from "@/components/AppUploadArt.vue";
import AppUploadFrame from "@/components/AppUploadFrame.vue";

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
    {
      path: "/contact",
      name: "Contact",
      component: AppContact,
    },
    {
      path: "/gallery",
      name: "Gallery",
      component: AppGallery,
    },
    {
      path: "/gallery/id",
      name: "GalleryDesc",
      component: AppGalleryDesc,
    },
    {
      path: "/frames",
      name: "Frames",
      component: AppFrames,
    },
    {
      path: "/frames/:id",
      name: "FrameDesc",
      props: true,
      component: AppFrameDesc,
    },
    {
      path: "/cart",
      name: "Cart",
      component: AppCart,
    },
    {
      path: "/customize",
      name: "Customize",
      component: AppCustomize,
    },
    {
      path: "/uploadArt",
      name: "UploadArt",
      component: AppUploadArt,
    },
    {
      path: "/uploadFrame",
      name: "UploadFrame",
      component: AppUploadFrame,
    },
  ],
});

export default router;
