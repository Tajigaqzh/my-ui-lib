import type { ExtractPropTypes } from "vue";

export const cardProps = {
  title: {
    type: String,
    default: "",
  },
  shadow: {
    type: String,
    default: "always",
    validator: (value: string) => ["always", "hover", "never"].includes(value),
  },
  bodyStyle: {
    type: Object,
    default: () => ({}),
  },
} as const;

export type CardProps = ExtractPropTypes<typeof cardProps>;
