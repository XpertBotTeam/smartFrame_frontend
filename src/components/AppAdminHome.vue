<template>
  <AppHeaderAdmin />
  <div class="slideshow light-brown-background">
    <div class="slideshow-container">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="'/images/' + image"
        :style="{
          display: index === currentIndex ? 'block' : 'none',
          width: '950px',
          height: '550px',
        }"
        class="slide fade"
      />
    </div>
  </div>
  <div class="section white-background">
    <div class="image-with-links">
      <div class="image-container">
        <img
          src="/images/4.jpg"
          alt="Your Image"
          width="500"
          height="500"
          loading="lazy"
        />
      </div>
      <div class="links-container">
        <h2 class="image-with-text__heading">Four Easy Options</h2>
        <router-link to="/frame">
          <p>
            <strong>FULL SERVICE</strong> Mail us your art and we’ll custom
            frame it.
          </p>
        </router-link>

        <router-link to="/print">
          <p>
            <strong>PRINT AND FRAME</strong> We’ll print your file and custom
            frame it.
          </p>
        </router-link>

        <router-link to="/frame">
          <p>
            <strong>FRAME ONLY</strong> We’ll build and ship your frame without
            art.
          </p>
        </router-link>

        <router-link to="/print">
          <p>
            <strong>PRINT ONLY</strong> Upload a file. We’ll print and ship it.
          </p>
        </router-link>
      </div>
    </div>
  </div>
  <div class="section light-brown-background">
    <!-- Content for the first section -->
    <div class="image-container">
      <img
        src="/images/5.jpg"
        alt="Your Image"
        width="1650"
        height="700"
        loading="lazy"
      />
    </div>
  </div>

  <div class="section white-background">
    <!-- Content for the third section -->
  </div>
</template>

<script>
import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
export default {
  components: {
    AppHeaderAdmin,
  },
  data() {
    return {
      currentIndex: 0,

      images: ["1.jpg", "2.jpg", "3.jpg"],
    };
  },
  created() {
    // Start the slideshow automatically
    this.startSlideshow();
  },
  methods: {
    startSlideshow() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }, 3000); // Change images every 3 seconds (adjust as needed)
    },
  },
};
</script>

<style scoped>
.slideshow {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Make the container full viewport height */
}

.light-brown-background {
  background-color: #f3d9b6; /* Light brown background color */
  padding: 20px; /* Add padding for spacing */
}

.white-background {
  background-color: #ffffff; /* White background color */
  padding: 20px; /* Add padding for spacing */
}
.slideshow-container {
  max-width: 100%; /* Make it responsive */
  text-align: center;
}

.slide {
  width: 50%; /* Set the width to 50% */
  max-width: 100%; /* Make the images responsive */
  height: auto;
  animation-name: fade;
  animation-duration: 3s; /* Adjust the animation duration for smoother transitions */
  transition: opacity 1.5s; /* Add a smooth opacity transition */
}
/* Style for the image-with-links container */
.image-with-links {
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Vertically center the content */
}

/* Style for the image container */
.image-container {
  flex: 1; /* Allow the image to expand and fill available space */
  margin-right: 20px; /* Add margin for spacing between image and links */
}

/* Style for the links container */
.links-container {
  flex: 2; /* Allow the links to expand and fill available space */
}

/* Style to remove underlines and change link color */
.router-link {
  text-decoration: none; /* Remove underline */
  color: #333; /* Change link color */
}

.router-link:hover {
  color: #555; /* Change link color on hover if needed */
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
