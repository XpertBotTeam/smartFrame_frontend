<template>
  <div>
    <div class="container">
      <h2>Recommendations</h2>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="(recommendation, index) in recommendations"
          :key="index"
        >
          {{ recommendation.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["recommendations"],
};
</script>
