<template>
  <div>
    <div v-for="(photo, i) in photos" :key="i">
      <img
        style="
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
          max-width: 150px;
          max-height: 150px;
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
    },
  },
};
</script>