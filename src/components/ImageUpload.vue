<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <input type="file" @change="handleFileUpload" />
          <img :src="imageUrl" alt="Uploaded Image" class="img-thumbnail" />
        </div>
        <div class="col-md-6">
          <!-- Framing Options (add Bootstrap-styled options here) -->
        </div>
      </div>
    </div>
    <RecommendationBox :recommendations="recommendations" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      recommendations: [],
    };
  },
  methods: {
    handleFileUpload(event) {
      // Handle image upload
      const file = event.target.files[0];
      this.imageUrl = URL.createObjectURL(file);

      // Fetch recommendations (you'll need to implement this)
      this.fetchRecommendations();
    },
    fetchRecommendations() {
      // Use Axios to fetch recommendations (e.g., from an API)
      // Update this.recommendations with the fetched data
    },
  },
};
</script>
