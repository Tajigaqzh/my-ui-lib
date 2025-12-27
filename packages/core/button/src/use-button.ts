import { ref } from "vue";
import type { ButtonProps } from "./button";

export const useButton = (props: ButtonProps) => {
  const _ref = ref<HTMLButtonElement>();

  const handleClick = (evt: MouseEvent) => {

    console.log(evt);
    
    if (props.disabled) {
      evt.stopPropagation();
      return;
    }
  };

  return {
    _ref,
    handleClick,
  };
};
