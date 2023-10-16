<template>
  <div>
    <h1>Home page</h1>
    <div id="imageCarousel" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div
          v-for="(image, index) in imageData.slice(0, 4)"
          :key="index"
          :class="{ active: index === 0 }"
          class="carousel-item"
        >
          <img :src="image.src" class="d-block w-100" alt="Image" />
        </div>
      </div>
      <a class="carousel-control-prev" href="#imageCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#imageCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AppHome",
  data() {
    return {
      imageData: [], // Array to store fetched images
    };
  },
  mounted() {
    this.fetchImages();
  },
  methods: {
    async fetchImages() {
      try {
        const response = await axios.get('https://sfa.xpertbotacademy.online/api/frames');
        this.imageData = response.data; // Assuming your data structure matches
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Your custom CSS styles for this component can go here */
</style>
