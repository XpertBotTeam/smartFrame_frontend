<template>
  <AppHeader />
  <div class="frame-details">   
    <div>
      <img :src="frame.image_path" class="m-4" alt="frame" height="150" width="150">
      <p>Description: {{ frame.description }}</p>
      <p>Type: {{ frame.frame_type }}</p>
      <p>Price: {{ frame.price }}</p>
      <!-- Display other frame details here -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    // AppHome,
    AppHeader,
  },
  name: 'AppFrameDesc',
  data() {
    return {
      frame: {},
    };
  },
  created() {
    this.fetchFrameDetails();
  },
  methods: {
    async fetchFrameDetails() {
      const frameId = this.$route.params.id;
      try {
        console.log(frameId);
        let response = await axios.get(`http://localhost:8000/api/frame/${frameId}`);
        this.frame = response.data;
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching frame details:', error);
      }
    },
  },
};
</script>

<style scoped>
</style>
