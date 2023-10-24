<template>
  <div class="container my-5">
    <h1>About Us</h1>
    <p>
      We are a passionate team dedicated to providing exceptional services and products.
    </p>

    <div class="row">
      <!-- Right column for Review and Feedback -->
      <div class="col-md-6">
        <div class="col-md-8">
          <h2>Reviews and Feedback</h2>
          <p>Share your thoughts with us:</p>

          <!-- Feedback form -->
          <form @submit.prevent="submitFeedback">
            <div class="form-group">
              <label for="name"><strong>Your Name</strong></label>
              <input type="text" id="name" v-model="formData.name" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="comment"><strong>Your Comment</strong></label>
              <textarea id="comment" v-model="formData.comment" class="form-control" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Submit</button>
          </form>
        </div>

        <!-- Contact information -->
        <h2>Contact Information</h2>
        <p>
          Feel free to get in touch with us:
          <ul>
            <li><Strong>Email:</Strong> pierreencadrement@info.com</li>
            <li><Strong>Phone:</Strong> +961 01 327 652</li>
            <li><Strong>Address:</Strong> Elias Faraj Basil, Beirut, Lebanon</li>
          </ul>
        </p>
      </div>

      <!-- Left column for Location -->
      <div class="col-md-6">
        <h2>Our Location</h2>
        <!-- Button to show the location -->
        <button @click="showLocation" class="btn btn-primary">Locate Us</button>

        <!-- Hidden iframe to embed the Google Maps location -->
        <div v-if="displayLocation" class="embed-responsive embed-responsive-16by9">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.090549557547!2d35.52235701133795!3d33.88732172630892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17a02957897f%3A0x980cc70249b0f08e!2sPierre%20Habib%20Encadrement!5e0!3m2!1sen!2slb!4v1697974163480!5m2!1sen!2slb" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      displayLocation: false,
      formData: {
        name: '',
        comment: '',
      },
    };
  },
  methods: {
    showLocation() {
      this.displayLocation = !this.displayLocation;
    },
    submitFeedback() {
      // Prepare the data to send to the API
      const feedbackData = {
        name: this.formData.name,
        comment: this.formData.comment,
      };

      // Send a POST request to your API
      axios.post('https://your-api-url.com/feedback', feedbackData)
        .then((response) => {
          // Handle the response if needed
          console.log('Feedback submitted:', response.data);
          // Clear the form
          this.formData.name = '';
          this.formData.comment = '';
        })
        .catch((error) => {
          // Handle errors if the request fails
          console.error('Error submitting feedback:', error);
        });
    },
  },
};
</script>
