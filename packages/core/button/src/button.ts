import { buildProps } from "@my-ui/utils";
import type { ExtractPropTypes } from "vue";

export const buttonProps = buildProps({
  type: {
    type: String,
    default: "default",
  },
  size: {
    type: String,
    default: "medium",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const);

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
