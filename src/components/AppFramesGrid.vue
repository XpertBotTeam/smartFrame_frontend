<template>
  <AppHeader />
  <div class="image-grid">
    <div v-for="item in items" :key="item.id" class="image-card" onclick="goToDesc(${{ item.id }})">
      <img :src="item.image_path" :alt="item.type" class="image" />
      <div class="details">
        <p>Type: {{ item.artwork_type }}</p>
        <p>Price: ${{ item.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import AppHeader from "@/components/AppHeader.vue";
  
export default {
  name: "AppFramesGrid",
  components: {
      // AppHome,
      AppHeader,
    },
  data() {
    return {
      items: [], // To store the data fetched from the API
    };
  },
  mounted() {
    this.fetchData(); // Fetch data when the component is mounted
  },
  methods: {
    async fetchData() {
      try {
        let response = await axios.get("http://localhost:8000/api/frames");
        this.items = response.data;
        console.log(response);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
      },
      goToDesc(itemId) {
        router.push({ name: "AppPictureDesc", params: { id: itemId } });
    }
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
