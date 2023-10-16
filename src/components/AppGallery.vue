<template>
  <div class="container">
    <div class="mt-3">
      <router-link to="/uploadArt" class="btn btn-primary">Add Artwork</router-link>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Description</th>
          <th>Type</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="artwork in artworks" :key="artwork.id">
          <td>{{ artwork.id }}</td>
          <td><img :src="artwork.image_path" alt="Artwork" width="50"></td>
          <td>{{ artwork.description }}</td>
          <td>{{ artwork.picture_type }}</td>
          <td>{{ artwork.price }}</td>
          <td>
            <button @click="updateArtwork(artwork.id)" class="btn btn-primary">Update</button>
            <button @click="confirmDeleteArtwork(artwork.id)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: "AppGallery",
  data() {
    return {
      artworks: [],
    };
  },
  created() {
    this.fetchArtworks();
  },
  methods: {
    async fetchArtworks() {
      try {
        let response = await axios.get('https://sfa.xpertbotacademy.online/api/pictures');
        this.artworks = response.data;
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    },
    // async updateArtwork(artworkId) {
    //   // Implement the update logic here
    //   // You can use the artworkId to identify the artwork to update
    //   // Make an API call to update the artwork in your database
    // },
    async deleteArtwork(artworkId) {
      try {
        console.log(artworkId);
        // Make a DELETE request to the API endpoint to delete the artwork
        let response2 = await axios.get(`https://sfa.xpertbotacademy.online/api/pictures/delete/${artworkId}`);
        console.log(response2);
        // Remove the deleted artwork from the list
        this.artworks = this.artworks.filter(artwork => artwork.id !== artworkId);
        
        // Show a success message using SweetAlert2
        Swal.fire('Deleted!', 'The artwork has been deleted.', 'success');
      } catch (error) {
        console.error(`Error deleting artwork with ID ${artworkId}:`, error);
        // Show an error message using SweetAlert2
        Swal.fire('Error', 'An error occurred while deleting the artwork.', 'error');
      }
    },
    async confirmDeleteArtwork(artworkId) {
      Swal.fire({
        title: 'Delete Artwork',
        text: 'Are you sure you want to delete this artwork?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteArtwork(artworkId);
        }
      });
    },
  },
};
</script>
