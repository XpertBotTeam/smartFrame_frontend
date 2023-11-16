<template>
  <AppHeaderAdmin />
  <div class="container">
    <div class="mt-3">
      <router-link to="/uploadFrame" class="btn btn-primary"
        >Add Frame</router-link
      >
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Frame</th>
          <th>Description</th>
          <th>Type</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="frame in frames" :key="frame.id">
          <td>{{ frame.id }}</td>
          <td>
            <img :src="frame.image_path" alt="frame" width="50" />
          </td>
          <td>
            <span v-if="editingFrameId !== frame.id">{{
              frame.description
            }}</span>
            <input v-else v-model="frameEditData.description" />
          </td>
          <td>
            <span v-if="editingFrameId !== frame.id">{{
              frame.frame_type
            }}</span>
            <select v-else v-model="frameEditData.frame_type">
              <option
                v-for="type in frameTypes"
                :key="type.value"
                :value="type.code"
              >
                {{ type.value }}
              </option>
            </select>
          </td>

          <td>
            <span v-if="editingFrameId !== frame.id">{{ frame.price }}</span>
            <input v-else v-model="frameEditData.price" />
          </td>
          <td>
            <button @click="toggleEdit(frame.id)" class="btn btn-primary">
              {{ editingFrameId === frame.id ? "Cancel" : "Edit" }}
            </button>
            <button
              @click="viewFrameDetails(frame.id)"
              class="btn btn-primary m-2"
            >
              View
            </button>
            <button
              @click="confirmUpdate(frame)"
              class="btn btn-primary m-2"
              v-if="editingFrameId === frame.id"
            >
              Update
            </button>
            <button
              @click="confirmDeleteFrame(frame.id)"
              class="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";

export default {
    name: "AppFrames",
    components: {
    AppHeaderAdmin,
  },
  data() {
    return {
      frames: [],
      updatingFrame: null,
      updatedDescription: "",
      updatedFrameType: "",
      updatedPrice: null,
      editingFrameId: null,
      frameTypes: [],
      frameEditData: {}, // Temporary storage for edited data
    };
  },
  created() {
    this.fetchFrames();
  },
  mounted() {
    axios
      .get("http://sfa.xpertbotacademy.online/api/frameTypes")
      .then((response) => {
        this.frameTypes = response.data;
      })
      .catch((error) => {
        console.error("Error fetching frame types: ", error);
      });
  },
  methods: {
    async fetchFrames() {
      try {
        let response = await axios.get("http://sfa.xpertbotacademy.online/api/frames");
        this.frames = response.data;
        console.log(response);
      } catch (error) {
        console.error("Error fetching frames:", error);
      }
    },
    async toggleEdit(frameId) {
      if (this.editingFrameId === frameId) {
        // Cancel the edit and restore original data
        this.editingFrameId = null;
        this.frameEditData = {};
      } else {
        // Start editing, save a copy of the original data
        this.editingFrameId = frameId;
        const frameToEdit = this.frames.find((frame) => frame.id === frameId);
        this.frameEditData = { ...frameToEdit };
      }
    },
    async confirmUpdate(frame) {
      Swal.fire({
        title: "Update Frame",
        text: "Are you sure you want to update this frame?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          this.saveUpdatedFrame(frame);
        }
      });
    },
    async viewFrameDetails(frameId) {
      this.$router.push(`/frames/${frameId}`);
    },
    async saveUpdatedFrame(frame) {
      try {
        // Make an API call to update the frame with the new data
        const frameId = frame.id;
        const updatedData = {
          description: this.frameEditData.description,
          frame_type: this.frameEditData.frame_type,
          price: this.frameEditData.price,
        };
        console.log(updatedData);
        let response = await axios.put(
          `http://sfa.xpertbotacademy.online/api/frames/${frameId}`,
          updatedData
        );
        console.log(response);

        // Clear the edit mode
        this.editingFrameId = null;
        this.frameEditData = {};

        // Show a success message using SweetAlert2
        Swal.fire("Updated!", "The frame has been updated.", "success");
        window.location.reload();
      } catch (error) {
        console.error(`Error updating frame with ID ${frame.id}:`, error);

        // Show an error message using SweetAlert2
        Swal.fire(
          "Error",
          "An error occurred while updating the frame.",
          "error"
        );
      }
    },
    async deleteFrame(frameId) {
      try {
        // Make a DELETE request to the API endpoint to delete the frame
        let response2 = await axios.delete(
          `http://sfa.xpertbotacademy.online/api/frames/${frameId}`
        );
        console.log(response2);

        // Remove the deleted frame from the list
        this.frames = this.frames.filter((frame) => frame.id !== frameId);

        // Show a success message using SweetAlert2
        Swal.fire("Deleted!", "The frame has been deleted.", "success");
      } catch (error) {
        console.error(`Error deleting frame with ID ${frameId}:`, error);

        // Show an error message using SweetAlert2
        Swal.fire(
          "Error",
          "An error occurred while deleting the frame.",
          "error"
        );
      }
    },
    async confirmDeleteFrame(frameId) {
      Swal.fire({
        title: "Delete frame",
        text: "Are you sure you want to delete this frame?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteFrame(frameId);
        }
      });
    },
  },
};
</script>

<style scoped></style>
