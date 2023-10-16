<template>
    <div class="artwork-detail">
      <img :src="artwork.image_path" alt="Artwork">
      <p>{{ artwork.description }}</p>
      <p>{{ artwork.picture_type }}</p>
      <p>{{ artwork.price }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        artwork: {},
      };
    },
    created() {
      this.fetchArtwork();
    },
    methods: {
      async fetchArtwork() {
        try {
          const response = await axios.get('https://sfa.xpertbotacademy.online/api/pictures/${this.$route.params.id}'); // Replace with your API endpoint.
          
          console.log(response);
          this.artwork = response.data;
        } catch (error) {
          console.error('Error fetching artwork:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styling for the detail page */
  </style>
  