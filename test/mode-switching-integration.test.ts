import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import App from "../playground/src/App.vue";
import ModeSwitcher from "../playground/src/components/ModeSwitcher.vue";

/**
 * Integration Tests for Mode Switching Workflows
 * Tests mode switching functionality and hot reload behavior
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
 */

// Mock the mode switcher service
vi.mock("../playground/src/services/mode-switcher", () => ({
  modeSwitcher: {
    getCurrentMode: vi.fn(() => "source"),
    setMode: vi.fn(),
    loadStyles: vi.fn(() => Promise.resolve()),
    onModeChange: vi.fn(() => () => {}),
  },
}));

describe("Mode Switching Integration Tests", () => {
  let router: any;
  let mockModeSwitcher: any;

  beforeEach(async () => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Get the mocked module
    const { modeSwitcher } = await import("../playground/src/services/mode-switcher");
    mockModeSwitcher = modeSwitcher;
    
    // Create a fresh router for each test
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", name: "Home", component: { template: "<div class='home'>Home</div>" } },
        { path: "/button", name: "Button", component: { template: "<div class='button-demo'>Button Demo</div>" } },
        { path: "/card", name: "Card", component: { template: "<div class='card-demo'>Card Demo</div>" } },
      ],
    });
  });

  it("should display mode switcher with correct initial state", async () => {
    mockModeSwitcher.getCurrentMode.mockReturnValue("source");
    
    const wrapper = mount(ModeSwitcher);
    await wrapper.vm.$nextTick();

    // Check that mode switcher renders
    expect(wrapper.find(".mode-switcher").exists()).toBe(true);

    // Check that both mode buttons exist
    const buttons = wrapper.findAll(".mode-switcher__button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].text()).toBe("Source");
    expect(buttons[1].text()).toBe("Build");

    // Check that source mode is active initially
    expect(buttons[0].classes()).toContain("active");
    expect(buttons[1].classes()).not.toContain("active");
  });

  it("should switch modes when buttons are clicked", async () => {
    mockModeSwitcher.getCurrentMode.mockReturnValue("source");
    
    const wrapper = mount(ModeSwitcher);
    await wrapper.vm.$nextTick();

    const buttons = wrapper.findAll(".mode-switcher__button");
    const buildButton = buttons[1];

    // Click build mode button
    await buildButton.trigger("click");

    // Verify that setMode was called with correct parameter
    expect(mockModeSwitcher.setMode).toHaveBeenCalledWith("build");
    expect(mockModeSwitcher.loadStyles).toHaveBeenCalled();
  });

  it("should emit mode change events when switching modes", async () => {
    mockModeSwitcher.getCurrentMode.mockReturnValue("source");
    
    const wrapper = mount(ModeSwitcher);
    await wrapper.vm.$nextTick();

    // Mock window event dispatch
    const dispatchEventSpy = vi.spyOn(window, "dispatchEvent");

    const buttons = wrapper.findAll(".mode-switcher__button");
    const buildButton = buttons[1];

    // Click build mode button
    await buildButton.trigger("click");

    // Verify that mode change event was dispatched
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "mode-changed",
        detail: { mode: "build" },
      })
    );

    dispatchEventSpy.mockRestore();
  });

  it("should maintain mode state across navigation", async () => {
    mockModeSwitcher.getCurrentMode.mockReturnValue("build");
    
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    // Navigate to different pages
    await router.push("/");
    await wrapper.vm.$nextTick();

    // Check that mode switcher maintains state
    let modeSwitcher = wrapper.find(".mode-switcher");
    expect(modeSwitcher.exists()).toBe(true);

    await router.push("/button");
    await wrapper.vm.$nextTick();

    // Mode switcher should still be present and maintain state
    modeSwitcher = wrapper.find(".mode-switcher");
    expect(modeSwitcher.exists()).toBe(true);

    await router.push("/card");
    await wrapper.vm.$nextTick();

    // Mode switcher should still be present
    modeSwitcher = wrapper.find(".mode-switcher");
    expect(modeSwitcher.exists()).toBe(true);
  });

  it("should handle mode switching during navigation", async () => {
    mockModeSwitcher.getCurrentMode.mockReturnValue("source");
    
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    // Start at home page
    await router.push("/");
    await wrapper.vm.$nextTick();

    // Switch to build mode
    const modeSwitcher = wrapper.find(".mode-switcher");
    const buttons = modeSwitcher.findAll(".mode-switcher__button");
    const buildButton = buttons[1];

    await buildButton.trigger("click");

    // Verify mode switch was called
    expect(mockModeSwitcher.setMode).toHaveBeenCalledWith("build");
    expect(mockModeSwitcher.loadStyles).toHaveBeenCalled();

    // Navigate to component page
    await router.push("/button");
    await wrapper.vm.$nextTick();

    // Mode switcher should still be available
    const newModeSwitcher = wrapper.find(".mode-switcher");
    expect(newModeSwitcher.exists()).toBe(true);
  });

  it("should load styles when mode changes", async () => {
    mockModeSwitcher.getCurrentMode.mockReturnValue("source");
    
    const wrapper = mount(ModeSwitcher);
    await wrapper.vm.$nextTick();

    const buttons = wrapper.findAll(".mode-switcher__button");

    // Switch to build mode
    await buttons[1].trigger("click");
    expect(mockModeSwitcher.loadStyles).toHaveBeenCalled();

    // Reset mock
    mockModeSwitcher.loadStyles.mockClear();

    // Switch back to source mode
    await buttons[0].trigger("click");
    expect(mockModeSwitcher.loadStyles).toHaveBeenCalled();
  });

  it("should handle mode change subscription lifecycle", async () => {
    const unsubscribeMock = vi.fn();
    mockModeSwitcher.onModeChange.mockReturnValue(unsubscribeMock);
    
    const wrapper = mount(ModeSwitcher);
    await wrapper.vm.$nextTick();

    // Verify subscription was set up
    expect(mockModeSwitcher.onModeChange).toHaveBeenCalled();

    // Unmount component
    wrapper.unmount();

    // Verify unsubscribe was called
    expect(unsubscribeMock).toHaveBeenCalled();
  });

  it("should complete full mode switching workflow", async () => {
    mockModeSwitcher.getCurrentMode.mockReturnValue("source");
    
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    // Step 1: Start at home in source mode
    await router.push("/");
    await wrapper.vm.$nextTick();

    const modeSwitcher = wrapper.find(".mode-switcher");
    expect(modeSwitcher.exists()).toBe(true);

    // Step 2: Navigate to component page
    await router.push("/button");
    await wrapper.vm.$nextTick();

    // Step 3: Switch to build mode
    const buttons = modeSwitcher.findAll(".mode-switcher__button");
    const buildButton = buttons[1];
    await buildButton.trigger("click");

    // Verify mode switch
    expect(mockModeSwitcher.setMode).toHaveBeenCalledWith("build");
    expect(mockModeSwitcher.loadStyles).toHaveBeenCalled();

    // Step 4: Navigate to another component
    await router.push("/card");
    await wrapper.vm.$nextTick();

    // Mode switcher should still be present
    const newModeSwitcher = wrapper.find(".mode-switcher");
    expect(newModeSwitcher.exists()).toBe(true);

    // Step 5: Switch back to source mode
    const newButtons = newModeSwitcher.findAll(".mode-switcher__button");
    const sourceButton = newButtons[0];
    await sourceButton.trigger("click");

    // Verify mode switch back
    expect(mockModeSwitcher.setMode).toHaveBeenCalledWith("source");

    // Step 6: Navigate back to home
    await router.push("/");
    await wrapper.vm.$nextTick();

    // Everything should still work
    const finalModeSwitcher = wrapper.find(".mode-switcher");
    expect(finalModeSwitcher.exists()).toBe(true);
  });

  it("should handle rapid mode switching", async () => {
    mockModeSwitcher.getCurrentMode.mockReturnValue("source");
    
    const wrapper = mount(ModeSwitcher);
    await wrapper.vm.$nextTick();

    const buttons = wrapper.findAll(".mode-switcher__button");
    const sourceButton = buttons[0];
    const buildButton = buttons[1];

    // Rapidly switch modes multiple times
    await buildButton.trigger("click");
    await sourceButton.trigger("click");
    await buildButton.trigger("click");
    await sourceButton.trigger("click");

    // Verify all calls were made
    expect(mockModeSwitcher.setMode).toHaveBeenCalledTimes(4);
    expect(mockModeSwitcher.loadStyles).toHaveBeenCalledTimes(4);

    // Verify final calls
    expect(mockModeSwitcher.setMode).toHaveBeenLastCalledWith("source");
  });

  it("should maintain visual state consistency during mode switches", async () => {
    mockModeSwitcher.getCurrentMode.mockReturnValue("source");
    
    const wrapper = mount(ModeSwitcher);
    await wrapper.vm.$nextTick();

    const buttons = wrapper.findAll(".mode-switcher__button");
    const sourceButton = buttons[0];
    const buildButton = buttons[1];

    // Initially source should be active
    expect(sourceButton.classes()).toContain("active");
    expect(buildButton.classes()).not.toContain("active");

    // Switch to build mode (simulate state change)
    mockModeSwitcher.getCurrentMode.mockReturnValue("build");
    await buildButton.trigger("click");
    await wrapper.vm.$nextTick();

    // Switch back to source mode (simulate state change)
    mockModeSwitcher.getCurrentMode.mockReturnValue("source");
    await sourceButton.trigger("click");
    await wrapper.vm.$nextTick();

    // Verify final state
    expect(mockModeSwitcher.setMode).toHaveBeenCalledWith("source");
  });
});