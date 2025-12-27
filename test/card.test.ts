import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Card from "../packages/core/card/src/card.vue";

describe("Card Component", () => {
  it("renders card with title", () => {
    const wrapper = mount(Card, {
      props: {
        title: "Test Card",
      },
    });

    expect(wrapper.find(".my-card__title").text()).toBe("Test Card");
    expect(wrapper.find(".my-card__header").exists()).toBe(true);
  });

  it("renders card with default content", () => {
    const wrapper = mount(Card, {
      slots: {
        default: "<p>Card Content</p>",
      },
    });

    expect(wrapper.find(".my-card__body").html()).toContain("Card Content");
  });

  it("renders card with custom header slot", () => {
    const wrapper = mount(Card, {
      slots: {
        header: "<div class='custom-header'>Custom Header</div>",
      },
    });

    expect(wrapper.find(".custom-header").exists()).toBe(true);
    expect(wrapper.find(".custom-header").text()).toBe("Custom Header");
  });

  it("applies shadow class correctly", () => {
    const wrapperAlways = mount(Card, {
      props: {
        shadow: "always",
      },
    });
    expect(wrapperAlways.find(".my-card--always").exists()).toBe(true);

    const wrapperHover = mount(Card, {
      props: {
        shadow: "hover",
      },
    });
    expect(wrapperHover.find(".my-card--hover").exists()).toBe(true);

    const wrapperNever = mount(Card, {
      props: {
        shadow: "never",
      },
    });
    expect(wrapperNever.find(".my-card--never").exists()).toBe(true);
  });

  it("applies custom body style", () => {
    const customStyle = { padding: "40px", backgroundColor: "#f5f7fa" };
    const wrapper = mount(Card, {
      props: {
        bodyStyle: customStyle,
      },
    });

    const bodyElement = wrapper.find(".my-card__body").element as HTMLElement;
    expect(bodyElement.style.padding).toBe("40px");
    expect(bodyElement.style.backgroundColor).toBe("rgb(245, 247, 250)");
  });

  it("does not render header when no title or header slot provided", () => {
    const wrapper = mount(Card, {
      slots: {
        default: "<p>Content only</p>",
      },
    });

    expect(wrapper.find(".my-card__header").exists()).toBe(false);
  });

  it("has correct default props", () => {
    const wrapper = mount(Card);

    expect(wrapper.props("title")).toBe("");
    expect(wrapper.props("shadow")).toBe("always");
    expect(wrapper.props("bodyStyle")).toEqual({});
  });
});
