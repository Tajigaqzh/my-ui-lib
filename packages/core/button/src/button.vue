<template>



<div class="test-button">
  <button
    ref="_ref"
    :class="[
      'my-button',
      `my-button--${props.type}`,
      `my-button--${props.size}`,
    ]"
    :disabled="props.disabled"
    @click="handleClick"
  >

  
    <slot></slot>
  </button>
</div>

</template>

<script lang="ts" setup>
import { buttonProps } from "./button";
import { useButton } from "./use-button";

defineOptions({
  name: "MyButton",
});

const props = defineProps(buttonProps);

const { _ref, handleClick } = useButton(props);
</script>

<style lang="scss" scoped>
.my-button {
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  color: #606266;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &--default {
    background-color: #fff;
  }

  &--primary {
    background-color: #409eff;
    border-color: #409eff;
    color: #fff;

    &:hover {
      background-color: #66b1ff;
      border-color: #66b1ff;
    }
  }

  &--small {
    padding: 6px 12px;
    font-size: 12px;
  }

  &--medium {
    padding: 8px 16px;
    font-size: 14px;
  }

  &--large {
    padding: 10px 20px;
    font-size: 16px;
  }
}
</style>
