<template>
  <AppHeader />
  <div>
    <AppPicturesGrid @customize-item="onCustomizeItem" />
    <AppCustomize :price="selectedPrice" />
  </div>
</template>

<script>
import AppPicturesGrid from "./AppPicturesGrid.vue";
import AppCustomize from "./AppCustomize.vue";

import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader,
    AppPicturesGrid,
    AppCustomize,
  },
  data() {
    return {
      selectedPrice: null,
    };
  },
  methods: {
    onCustomizeItem(price) {
      this.selectedPrice = price;
    },
  },
};
</script>
