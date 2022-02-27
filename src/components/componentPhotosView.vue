<template>
  <div>
    <div v-for="(photo, j) in photos" :key="j">
      <img
        style="
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
        "
        class="img-fluid"
        :src="photo"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photos: {
      type: Array,
      required: true,
    }
  }
}
</script>