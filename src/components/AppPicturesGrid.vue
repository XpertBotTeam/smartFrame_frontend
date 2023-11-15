<template>
  <AppHeader />
  <div class="image-grid ml-4">
    <div v-for="item in items" :key="item.id" class="card" style="width: 18rem">
      <img :src="item.image_path" :alt="item.type" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">Price: ${{ item.price }}</h5>
        <p class="card-text">Type: {{ item.artwork_type }}</p>
        <!-- <button
          class="btn btn-primary"
          @click="navigateToCustomize(item.price)"
        >
          Customize
        </button> -->
        <button class="btn btn-primary" @click="customizeItem(item.price)">
          Customize
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    // AppHome,
    AppHeader,
  },
  name: "AppPicturesGrid",
  data() {
    return {
      items: [], // To store the data fetched from the API
    };
  },
  mounted() {
    this.fetchData(); // Fetch data when the component is mounted
  },
  methods: {
    // navigateToCustomize(imagePath) {
    //   var price = '100'
    //   console.log(imagePath);
    //   this.$router.push({
    //     name: "Customize",
    //     path: "/customize",
    //     props: { price },
    //   });
    // },
    customizeItem(price) {
      this.$emit("customize-item", price);
    },
    async fetchData() {
      try {
        let response = await axios.get("http://localhost:8000/api/pictures");
        this.items = response.data;
        console.log(response);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    },
  },
};
</script>

<style scoped>
.image-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.image-card {
  border: 1px solid #ccc;
  padding: 10px;
}

.image {
  max-width: 100%;
  height: auto;
}

.details {
  text-align: center;
}
</style>
