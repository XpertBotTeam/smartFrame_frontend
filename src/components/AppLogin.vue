<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "AppLogin",

  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        let response = await axios.post("http://sfa.xpertbotacademy.online/api/login", {
          email: this.email,
          password: this.password,
        });
        if (response.data.success == true) {
          var uname = response.data.first_name;
          console.log(response);

          localStorage.setItem(
            "user-info",
            JSON.stringify(response.data.success)
          );
          console.log(response.data.user_role);
          if (response.data.user_role === "client") {
            this.$router.push({
              path: "/",
              query: { name: uname },
            });
          } else if (response.data.user_role === "admin") {
            this.$router.push({
              path: "/adminhome",
              query: { name: uname },
            });
          }
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "You have been logged in successfully!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "An error occurred during login. Please try again.",
          });
        }
        console.log(response.data.success);
        console.log(response.data.first_name);
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
        <h2 class="text-center text-dark mt-5">Login Page</h2>
        <div class="card my-5">
          <form
            class="card-body cardbody-color p-lg-5"
            method="post"
            @submit.prevent="login"
          >
            <div class="mb-3">
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="email"
                name="email"
                placeholder="email@mail.com"
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
            <div class="text-center">
              <button type="submit" class="btn btn-primary px-5 mb-5 w-100">
                Login
              </button>
            </div>
            <div class="form-text text-center mb-5 text-dark">
              Not Registered?
              <router-link to="/register" class="text-dark fw-bold">
                Create an Account</router-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
