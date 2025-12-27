<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :fill="color"
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
</template>

<script>
export default {
  name: "IconExample",
  props: {
    size: {
      type: [Number, String],
      default: 24,
    },
    color: {
      type: String,
      default: "currentColor",
    },
  },
};
</script>
