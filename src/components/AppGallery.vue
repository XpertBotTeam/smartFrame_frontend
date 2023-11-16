<template>
  <AppHeaderAdmin />
  <div class="container">
    <div class="mt-3">
      <router-link to="/uploadArt" class="btn btn-primary"
        >Add Artwork</router-link
      >
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Artwork</th>
          <th>Description</th>
          <th>Type</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="artwork in artworks" :key="artwork.id">
          <td>{{ artwork.id }}</td>
          <td>
            <img :src="artwork.image_path" alt="artwork" width="50" />
          </td>
          <td>
            <span v-if="editingartworkId !== artwork.id">{{
              artwork.description
            }}</span>
            <input v-else v-model="artworkEditData.description" />
          </td>
          <td>
            <span v-if="editingartworkId !== artwork.id">{{
              artwork.picture_type
            }}</span>
            <select v-else v-model="artworkEditData.picture_type">
              <option
                v-for="type in artworkTypes"
                :key="type.value"
                :value="type.code"
              >
                {{ type.value }}
              </option>
            </select>
          </td>
          <td>
            <span v-if="editingartworkId !== artwork.id">{{
              artwork.price
            }}</span>
            <input v-else v-model="artworkEditData.price" />
          </td>
          <td>
            <button @click="toggleEdit(artwork.id)" class="btn btn-primary">
              {{ editingartworkId === artwork.id ? "Cancel" : "Edit" }}
            </button>
            <button
              @click="viewartworkDetails(artwork.id)"
              class="btn btn-primary m-2"
            >
              View
            </button>
            <button
              @click="confirmUpdate(artwork)"
              class="btn btn-primary m-2"
              v-if="editingartworkId === artwork.id"
            >
              Update
            </button>
            <button
              @click="confirmDeleteartwork(artwork.id)"
              class="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add an update form for a selected artwork -->
    <div v-if="updatingartwork">
      <h3>Update artwork</h3>
      <div class="form-group">
        <label for="updatedDescription">Description</label>
        <input
          type="text"
          v-model="updatedDescription"
          id="updatedDescription"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="updatedartworkType">artwork Type</label>
        <input
          type="text"
          v-model="updatedartworkType"
          id="updatedartworkType"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="updatedPrice">Price</label>
        <input
          type="number"
          v-model="updatedPrice"
          id="updatedPrice"
          class="form-control"
        />
      </div>
      <button @click="saveUpdatedartwork" class="btn btn-primary">Save</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";

export default {
  name: "AppGallery",
  components: {
    AppHeaderAdmin,
  },
  data() {
    return {
      artworks: [],
      updatingartwork: null,
      updatedDescription: "",
      updatedartworkType: "",
      updatedPrice: null,
      editingartworkId: null,
      artworkTypes: [],
      artworkEditData: {}, // Temporary storage for edited data
    };
  },
  created() {
    this.fetchartworks();
  },
  mounted() {
    axios
      .get("https://sfa.xpertbotacademy.online/api/pictureTypes")
      .then((response) => {
        this.artworkTypes = response.data;
      })
      .catch((error) => {
        console.error("Error fetching picture types: ", error);
      });
  },
  methods: {
    async fetchartworks() {
      try {
        let response = await axios.get("https://sfa.xpertbotacademy.online/api/pictures");
        this.artworks = response.data;
        console.log(response);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    },
    async toggleEdit(artworkId) {
      if (this.editingartworkId === artworkId) {
        // Cancel the edit and restore original data
        this.editingartworkId = null;
        this.artworkEditData = {};
      } else {
        // Start editing, save a copy of the original data
        this.editingartworkId = artworkId;
        const artworkToEdit = this.artworks.find(
          (artwork) => artwork.id === artworkId
        );
        this.artworkEditData = { ...artworkToEdit };
      }
    },
    async confirmUpdate(artwork) {
      Swal.fire({
        title: "Update artwork",
        text: "Are you sure you want to update this artwork?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          this.saveUpdatedartwork(artwork);
        }
      });
    },
    async viewartworkDetails(artworkId) {
      this.$router.push(`/gallery/${artworkId}`);
    },
    async saveUpdatedartwork(artwork) {
      try {
        // Make an API call to update the artwork with the new data
        const artworkId = artwork.id;
        const updatedData = {
          description: this.artworkEditData.description,
          picture_type: this.artworkEditData.picture_type,
          price: this.artworkEditData.price,
        };
        let response = await axios.put(
          `https://sfa.xpertbotacademy.online/api/pictures/${artworkId}`,
          updatedData
        );
        console.log(response);

        // Clear the edit mode
        this.editingartworkId = null;
        this.artworkEditData = {};

        // Show a success message using SweetAlert2
        Swal.fire("Updated!", "The artwork has been updated.", "success");
        location.reload();
      } catch (error) {
        console.error(`Error updating artwork with ID ${artwork.id}:`, error);

        // Show an error message using SweetAlert2
        Swal.fire(
          "Error",
          "An error occurred while updating the artwork.",
          "error"
        );
      }
    },
    async deleteartwork(artworkId) {
      try {
        // Make a DELETE request to the API endpoint to delete the artwork
        let response2 = await axios.delete(
          `https://sfa.xpertbotacademy.online/api/pictures/${artworkId}`
        );
        console.log(response2);

        // Remove the deleted artwork from the list
        this.artworks = this.artworks.filter(
          (artwork) => artwork.id !== artworkId
        );

        // Show a success message using SweetAlert2
        Swal.fire("Deleted!", "The artwork has been deleted.", "success");
      } catch (error) {
        console.error(`Error deleting artwork with ID ${artworkId}:`, error);

        // Show an error message using SweetAlert2
        Swal.fire(
          "Error",
          "An error occurred while deleting the artwork.",
          "error"
        );
      }
    },
    async confirmDeleteartwork(artworkId) {
      Swal.fire({
        title: "Delete artwork",
        text: "Are you sure you want to delete this artwork?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteartwork(artworkId);
        }
      });
    },
  },
};
</script>

<style scoped></style>
