<script>
export default {
  name: "AppHeaderAdmin",
  first_name: "TargetPage",
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <!-- <li class="nav-item">
          <Router-link class="nav-link active" aria-current="page" to="/"
            >SELL</Router-link
          >
        </li> -->
        <li class="nav-item">
          <Router-link class="nav-link" aria-current="page" to="/gallery"
            >GALLERY</Router-link
          >
        </li>
        <li class="nav-item">
          <Router-link class="nav-link" aria-current="page" to="/frames"
            >FRAMES</Router-link
          >
        </li>
        <!-- <li class="nav-item">
          <Router-link class="nav-link" aria-current="page" to="/customize"
            >CUSTOMIZE</Router-link
          >
        </li> -->
      </ul>
      <Router-link
        class="navbar-brand d-flex justify-content-center align-items-center vw-100"
        to="/adminhome"
        ><img width="160" align="center" src="@/assets/logo.jpg"
      /></Router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav d-flex">
          <!-- <li class="nav-item">
            <Router-link class="nav-link" aria-current="page" to="/contact"
              >CONTACT</Router-link
            >
          </li> -->
          <!-- <li class="nav-item">
            <Router-link class="nav-link" aria-current="page" to="/cart"
              >CART</Router-link
            >
          </li> -->

          <div v-if="$route.query.name">
            <li class="nav-item">
              <Router-link class="nav-link" aria-current="page" to="/"
                >LOG OUT</Router-link
              >
            </li>
            <li class="nav-item">Welcome, {{ $route.query.name }}</li>
          </div>
          <Router-link v-else class="nav-link" aria-current="page" to="/login"
            >LOGIN</Router-link
          >

          <!-- <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
