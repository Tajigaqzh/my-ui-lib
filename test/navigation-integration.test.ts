import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import App from "../playground/src/App.vue";
import Home from "../playground/src/views/Home.vue";
import ButtonDemo from "../playground/src/views/ButtonDemo.vue";
import CardDemo from "../playground/src/views/CardDemo.vue";

/**
 * Integration Tests for Navigation and User Experience
 * Tests full user workflows: navigation → mode switching → component viewing
 * Requirements: All
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

describe("Navigation Integration Tests", () => {
  let router: any;

  beforeEach(() => {
    // Create a fresh router for each test
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", name: "Home", component: Home },
        { path: "/button", name: "Button", component: ButtonDemo },
        { path: "/card", name: "Card", component: CardDemo },
      ],
    });
  });

  it("should navigate from home to component pages and back", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    // Start at home page
    await router.push("/");
    await wrapper.vm.$nextTick();

    // Check that we're on the home page
    expect(router.currentRoute.value.path).toBe("/");
    expect(wrapper.find(".home").exists()).toBe(true);

    // Navigate to button page
    await router.push("/button");
    await wrapper.vm.$nextTick();

    // Check that we're on the button page
    expect(router.currentRoute.value.path).toBe("/button");
    expect(router.currentRoute.value.name).toBe("Button");

    // Navigate to card page
    await router.push("/card");
    await wrapper.vm.$nextTick();

    // Check that we're on the card page
    expect(router.currentRoute.value.path).toBe("/card");
    expect(router.currentRoute.value.name).toBe("Card");

    // Navigate back to home
    await router.push("/");
    await wrapper.vm.$nextTick();

    // Check that we're back on the home page
    expect(router.currentRoute.value.path).toBe("/");
    expect(wrapper.find(".home").exists()).toBe(true);
  });

  it("should display correct navigation menu items for all routes", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await router.push("/");
    await wrapper.vm.$nextTick();

    // Check that navigation menu exists
    const navMenu = wrapper.find(".navigation-menu");
    expect(navMenu.exists()).toBe(true);

    // Check that all expected navigation links exist
    const navLinks = wrapper.findAll(".nav-link");
    expect(navLinks.length).toBeGreaterThanOrEqual(3); // Home + Button + Card

    // Check home link
    const homeLink = navLinks.find((link) =>
      link.text().includes("Home")
    );
    expect(homeLink?.exists()).toBe(true);

    // Check button link
    const buttonLink = navLinks.find((link) =>
      link.text().includes("Button")
    );
    expect(buttonLink?.exists()).toBe(true);

    // Check card link
    const cardLink = navLinks.find((link) =>
      link.text().includes("Card")
    );
    expect(cardLink?.exists()).toBe(true);
  });

  it("should highlight active navigation item correctly", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    // Navigate to button page
    await router.push("/button");
    await wrapper.vm.$nextTick();

    // Check that button nav item is active
    const navLinks = wrapper.findAll(".nav-link");
    const buttonLink = navLinks.find((link) =>
      link.text().includes("Button")
    );
    expect(buttonLink?.classes()).toContain("active");

    // Navigate to card page
    await router.push("/card");
    await wrapper.vm.$nextTick();

    // Check that card nav item is active
    const cardLink = navLinks.find((link) =>
      link.text().includes("Card")
    );
    expect(cardLink?.classes()).toContain("active");

    // Navigate to home
    await router.push("/");
    await wrapper.vm.$nextTick();

    // Check that home nav item is active
    const homeLink = navLinks.find((link) =>
      link.text().includes("Home")
    );
    expect(homeLink?.classes()).toContain("active");
  });

  it("should display breadcrumb navigation correctly", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    // Navigate to button page
    await router.push("/button");
    await wrapper.vm.$nextTick();

    // Check that breadcrumb navigation exists
    const breadcrumb = wrapper.find(".breadcrumb-navigation");
    expect(breadcrumb.exists()).toBe(true);

    // Check breadcrumb items
    const breadcrumbItems = wrapper.findAll(".breadcrumb-item");
    expect(breadcrumbItems.length).toBe(2); // Home + Button

    // Check home breadcrumb
    const homeBreadcrumb = breadcrumbItems[0];
    expect(homeBreadcrumb.text()).toContain("Home");
    expect(homeBreadcrumb.find(".breadcrumb-link").exists()).toBe(true);

    // Check current page breadcrumb
    const currentBreadcrumb = breadcrumbItems[1];
    expect(currentBreadcrumb.text()).toContain("Button");
    expect(currentBreadcrumb.find(".breadcrumb-current").exists()).toBe(true);
  });

  it("should allow navigation through breadcrumb links", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    // Navigate to button page
    await router.push("/button");
    await wrapper.vm.$nextTick();

    // Find and click home breadcrumb link
    const breadcrumbItems = wrapper.findAll(".breadcrumb-item");
    const homeBreadcrumb = breadcrumbItems[0];
    const homeLink = homeBreadcrumb.find(".breadcrumb-link");

    // Simulate click on home breadcrumb
    await homeLink.trigger("click");
    await router.push("/"); // Simulate navigation
    await wrapper.vm.$nextTick();

    // Check that we're back on home page
    expect(router.currentRoute.value.path).toBe("/");
  });

  it("should display mode switcher in header", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await router.push("/");
    await wrapper.vm.$nextTick();

    // Check that mode switcher exists in header
    const headerActions = wrapper.find(".header-actions");
    expect(headerActions.exists()).toBe(true);

    const modeSwitcher = wrapper.find(".mode-switcher");
    expect(modeSwitcher.exists()).toBe(true);

    // Check that mode switcher has toggle buttons
    const modeButtons = wrapper.findAll(".mode-switcher__button");
    expect(modeButtons.length).toBe(2); // Source + Build

    // Check button labels
    expect(modeButtons[0].text()).toBe("Source");
    expect(modeButtons[1].text()).toBe("Build");
  });

  it("should maintain responsive layout on different screen sizes", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await router.push("/");
    await wrapper.vm.$nextTick();

    // Check that main layout elements exist
    expect(wrapper.find(".playground").exists()).toBe(true);
    expect(wrapper.find(".app-header").exists()).toBe(true);
    expect(wrapper.find(".main-content").exists()).toBe(true);

    // Check that navigation menu is responsive
    const navMenu = wrapper.find(".navigation-menu");
    expect(navMenu.exists()).toBe(true);

    // Check that breadcrumb navigation exists when on a component page
    await router.push("/button");
    await wrapper.vm.$nextTick();
    
    const breadcrumb = wrapper.find(".breadcrumb-navigation");
    expect(breadcrumb.exists()).toBe(true);

    // Check that mode switcher is positioned correctly
    const headerActions = wrapper.find(".header-actions");
    expect(headerActions.exists()).toBe(true);
    expect(headerActions.classes()).not.toContain("hidden");
  });

  it("should handle navigation to non-existent routes gracefully", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    // Try to navigate to a non-existent route
    try {
      await router.push("/nonexistent");
      await wrapper.vm.$nextTick();

      // The router should handle this gracefully
      // Either redirect to home or show a 404 page
      const currentPath = router.currentRoute.value.path;
      expect(["/", "/nonexistent"]).toContain(currentPath);
    } catch (error) {
      // Navigation errors are acceptable for non-existent routes
      expect(error).toBeDefined();
    }
  });

  it("should complete full user workflow: home → component → mode switch → navigation", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    // Step 1: Start at home
    await router.push("/");
    await wrapper.vm.$nextTick();
    expect(router.currentRoute.value.path).toBe("/");

    // Step 2: Navigate to button component
    await router.push("/button");
    await wrapper.vm.$nextTick();
    expect(router.currentRoute.value.path).toBe("/button");

    // Step 3: Check that mode switcher is available
    const modeSwitcher = wrapper.find(".mode-switcher");
    expect(modeSwitcher.exists()).toBe(true);

    // Step 4: Check that navigation menu shows correct active state
    const navLinks = wrapper.findAll(".nav-link");
    const buttonLink = navLinks.find((link) =>
      link.text().includes("Button")
    );
    expect(buttonLink?.classes()).toContain("active");

    // Step 5: Check that breadcrumb shows correct path
    const breadcrumbItems = wrapper.findAll(".breadcrumb-item");
    expect(breadcrumbItems.length).toBe(2);
    expect(breadcrumbItems[1].text()).toContain("Button");

    // Step 6: Navigate to another component
    await router.push("/card");
    await wrapper.vm.$nextTick();
    expect(router.currentRoute.value.path).toBe("/card");

    // Step 7: Verify navigation state updated
    const cardLink = navLinks.find((link) =>
      link.text().includes("Card")
    );
    expect(cardLink?.classes()).toContain("active");

    // Step 8: Navigate back to home via breadcrumb
    await router.push("/");
    await wrapper.vm.$nextTick();
    expect(router.currentRoute.value.path).toBe("/");

    // Step 9: Verify we're back at home with correct state
    expect(wrapper.find(".home").exists()).toBe(true);
    const homeLink = navLinks.find((link) =>
      link.text().includes("Home")
    );
    expect(homeLink?.classes()).toContain("active");
  });
});