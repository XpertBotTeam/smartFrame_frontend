<script>
export default {
  name: "AppLogin",
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Login Page</h2>
        <div class="card my-5">
          <form class="card-body cardbody-color p-lg-5">
            <div class="mb-3">
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="email@xpertbotacademy.online"
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="**********"
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
