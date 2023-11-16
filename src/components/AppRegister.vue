<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "AppRegister",

  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    };
  },

  methods: {
    async register() {
      try {
        let response = await axios.post("http://sfa.xpertbotacademy.online/api/register", {
          first_name: this.firstname,
          last_name: this.lastname,
          email: this.email,
          password: this.password,
          confirm_password: this.confirmpassword,
        });
        if (response.data.status === true) {
          console.log("Request Succeeded");
          Swal.fire({
            icon: "success",
            title: "Registered Successfully",
            text: "You have been registered successfully!",
          });
          this.$router.push("/login");
        } else if (response.data.status === false) {
          console.log("Request Failed:", response.data.message);
          Swal.fire({
            icon: "error", // Set the icon to 'error' for an error message
            title: "Error!",
            text: response.data.message,
            confirmButtonText: "OK",
          });
        } else {
          console.log("Unexpected Response:", response.data.status);
        }
        console.log(response.data.status);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">SIGN UP</h2>
        <div class="card my-5">
          <form
            class="card-body cardbody-color p-lg-5"
            @submit.prevent="register"
          >
            <div class="mb-3">
              <input
                type="text"
                v-model="firstname"
                class="form-control"
                id="firstname"
                name="firstname"
                placeholder="First Name"
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="text"
                v-model="lastname"
                class="form-control"
                id="lastname"
                name="lastname"
                placeholder="Last Name"
                required
              />
            </div>
            <!-- <div class="mb-3">
              <input
                v-model="phoneNumber"
                type="tel"
                class="form-control"
                name="phoneNumber"
                id="phonenumber"
                placeholder="Enter your phone number"
              />
            </div> -->
            <div class="mb-3">
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="email"
                name="email"
                placeholder="email@xpertbotacademy.online"
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="password"
                name="password"
                placeholder="**********"
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                v-model="confirmpassword"
                class="form-control"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="**********"
                required
              />
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary px-5 mb-5 w-100">
                Create account
              </button>
            </div>
            <div class="form-text text-center mb-5 text-dark">
              Registered?
              <router-link to="/login" class="text-dark fw-bold">
                Login to your Account</router-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
