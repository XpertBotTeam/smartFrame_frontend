<template>
  <AppHeaderAdmin />
  <div class="d-flex justify-content-center">
    <div class="border p-3" style="background-color: #ffffff">
      <div class="form-group">
        <label for="fileInput" style="color: #000000">Upload Image:</label>
        <div class="custom-file">
          <input
            type="file"
            ref="fileInput"
            @change="handleFileChange"
            accept="image/*"
            class="custom-file-input"
            id="fileInput"
          />
          <label class="custom-file-label" for="fileInput">{{
            selectedFile ? " " : " "
          }}</label>
        </div>
      </div>

      <!-- Display the selected image -->
      <div v-if="selectedFile" class="mt-3">
        <label style="color: #000000">Selected Image Preview:</label>
        <img
          :src="selectedImage"
          alt="Selected Image"
          style="max-width: 100%"
        />
      </div>
      <div class="form-group">
        <label for="imageType" style="color: #000000">Image Type:</label>
        <div class="input-group">
          <select v-model="imageType" id="imageType" class="custom-select">
            <option value="1">Digital</option>
            <option value="2">Oil Paint</option>
            <option value="3">Mosaic</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="imageDescription" style="color: #000000"
          >Image Description:</label
        >
        <input
          type="text"
          v-model="imageDescription"
          id="imageDescription"
          class="form-control"
          placeholder="Image Description"
          style="background-color: #fff; color: #8b4513"
        />
      </div>
      <div class="form-group">
        <label for="imagePrice" style="color: #000000">Image Price:</label>
        <input
          type="number"
          v-model="imagePrice"
          id="imagePrice"
          class="form-control"
          placeholder="Image Price"
          style="background-color: #fff; color: #8b4513"
        />
      </div>
      <button
        @click="uploadImage"
        class="btn btn-primary mt-3"
        style="background-color: #8b4513; color: #000000"
      >
        Upload Image
      </button>

      <!-- Display the uploaded image -->
      <div v-if="uploadedImage" class="mt-3">
        <label style="color: #000000">Uploaded Image:</label>
        <img
          :src="uploadedImage"
          alt="Uploaded Image"
          style="max-width: 100%"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
export default {
  components: {
    AppHeaderAdmin,
  },
  data() {
    return {
      selectedFile: null,
      selectedImage: null, // Add this property to store the selected image preview
      imageType: "Type 1",
      imageDescription: "",
      imagePrice: 0,
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      this.selectedImage = URL.createObjectURL(this.selectedFile); // Create a preview URL
      document.getElementById("fileInput").nextElementSibling.innerText =
        this.selectedFile.name;
    },
    uploadImage() {
      const formData = new FormData();
      formData.append("image", this.selectedFile);
      formData.append("picture_type", this.imageType);
      formData.append("description", this.imageDescription);
      formData.append("price", this.imagePrice);

      console.log(formData);

      axios
        .post("https://sfa.xpertbotacademy.online/api/addPicture", formData, {
          headers: {
            "Content-Type":
              "multipart/form-data;boundary=<calculated when request is sent>",
          },
        })
        .then((response) => {
          console.log(response.data);
          console.log("Successsssss");
          // Reset the file input and selectedImage to null
          this.selectedFile = null;
          this.selectedImage = null;
          // Clear the file input value
          const input = this.$refs.fileInput;
          input.value = "";
          // Clear other form fields as needed
          this.imageType = "Type 1";
          this.imageDescription = "";
          this.imagePrice = 0;
          document.getElementById("fileInput").nextElementSibling.innerText =
            "Choose file";
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
