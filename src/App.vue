<script>
// import AppHome from "./components/AppHome.vue";
import AppHeader from "./components/AppHeader.vue";
import "./styles.css";

export default {
  name: "App",
  components: {
    // AppHome,
    AppHeader,
  },
};
</script>

<template>
  <AppHeader />
  <RouterView />
</template>

<style></style>
