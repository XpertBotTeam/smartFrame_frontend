<script>
export default {
  props: ["id"],
  data() {
    return {
      frame: null,
    };
  },
  created() {
    // Fetch the frame details using the frame ID from the route parameter
    // You should make an API request here to retrieve the frame's data.
    // For example, axios.get('/api/frames/' + this.id)...

    // For this example, let's assume that you have already fetched the frame data.
    this.frame = {
      id: this.id,
      imageUrl: "frame-image-url",
      title: "Frame Title",
      // Other frame details
    };
  },
};
</script>

<template>
  <div class="frame-description">
    <h2>Frame Description</h2>
    <div v-if="frame">
      <img :src="frame.imageUrl" alt="Frame" />
      <p>{{ frame.title }}</p>
      <!-- Display other frame details here -->
    </div>
  </div>
</template>



<style scoped>
/* CSS styles for the frame description page */
</style>
