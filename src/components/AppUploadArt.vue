<template>
  <div class="d-flex justify-content-center">
    <div class="border p-3" style="background-color: #8B4513;">
      <div class="form-group">
        <label for="fileInput" style="color: #FFF;">Upload Image:</label>
        <div class="custom-file">
          <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" class="custom-file-input" id="fileInput">
          <label class="custom-file-label" for="fileInput">{{ selectedFile ? selectedFile.name : 'Choose file' }}</label>
        </div>
      </div>
      <div class="form-group">
        <label for="imageType" style="color: #FFF;">Image Type:</label>
        <div class="input-group">
          <select v-model="imageType" id="imageType" class="custom-select">
            <option value="1">Digital</option>
            <option value="2">Oil Paint</option>
            <option value="3">Mozaique</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="imageDescription" style="color: #FFF;">Image Description:</label>
        <input type="text" v-model="imageDescription" id="imageDescription" class="form-control" placeholder="Image Description" style="background-color: #FFF; color: #8B4513;">
      </div>
      <div class="form-group">
        <label for="imagePrice" style="color: #FFF;">Image Price:</label>
        <input type="number" v-model="imagePrice" id="imagePrice" class="form-control" placeholder="Image Price" style="background-color: #FFF; color: #8B4513;">
      </div>
      <button @click="uploadImage" class="btn btn-primary" style="background-color: #8B4513; color: #FFF;">Upload Image</button>
    </div>
  </div>
</template>

  
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selectedFile: null,
        imageType: 'Type 1',
        imageDescription: '',
        imagePrice: 0,
      };
    },
    methods: {
      handleFileChange(event) {
        this.selectedFile = event.target.files[0];
        document.getElementById('fileInput').nextElementSibling.innerText = this.selectedFile.name;
      },
      uploadImage() {
        const formData = new FormData();
        formData.append('image', this.selectedFile);
        formData.append('picture_type', this.imageType);
        formData.append('description', this.imageDescription);
        formData.append('price', this.imagePrice);
  
        console.log(formData);

        axios.post('https://sfa.xpertbotacademy.online/api/addPicture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data;boundary=<calculated when request is sent>',
            
          },
        })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      },
    },
  };
  </script>
  