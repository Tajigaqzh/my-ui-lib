<template>
  <div :class="['my-card', `my-card--${shadow}`]">
    <div v-if="$slots.header || title" class="my-card__header">
      <slot name="header">
        <span class="my-card__title">{{ title }}</span>
      </slot>
    </div>
    <div class="my-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { cardProps } from "./card";

defineOptions({
  name: "MyCard",
});

defineProps(cardProps);
</script>

<style lang="scss" scoped>
.my-card {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;

  &--always {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  &--hover:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  &__header {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
  }

  &__body {
    padding: 20px;
  }
}
</style>
