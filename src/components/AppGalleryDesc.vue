<template>
  <AppHeader />
  <div class="container mt-4">
    <div class="card">
      <h5 class="card-title">Picture Details</h5>
      <img :src="url" class="card-img-top" alt="gallery" />
      <div class="card-body">
        <p class="card-text">Description: {{ gallery.description }}</p>
        <p class="card-text">Type: {{ gallery.picture_type }}</p>
        <p class="card-text">Price: {{ gallery.price }}</p>
        <!-- Add other details here -->
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
  name: "AppGalleryDesc",
  data() {
    return {
      gallery: {},
    };
  },
  created() {
    this.fetchFrameDetails();
  },
  methods: {
    async fetchFrameDetails() {
      const galleryId = this.$route.params.id;
      console.log(galleryId);
      try {
        console.log(galleryId);
        let response = await axios.get(
          `https://sfa.xpertbotacademy.online/api/picture/${galleryId}`
        );
        this.gallery = response.data;
        let url = this.gallery.image_path;
        this.url = url.replace("/public", "");
        console.log(this.url);
      } catch (error) {
        console.error("Error fetching picture details:", error);
      }
    },
  },
};
</script>

<style scoped></style>
