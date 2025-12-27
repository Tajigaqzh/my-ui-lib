<template>
  <div class="component-page">
    <header class="component-header">
      <h1>Button Component</h1>
      <p class="component-description">
        Interactive button component with various styles, sizes, and states for user interactions.
      </p>
    </header>
    
    <div class="demo-container">
      <section class="demo-section">
        <h2>Default Buttons</h2>
        <p class="section-description">Basic button variations with different types and states.</p>
        <div class="demo-showcase">
          <div class="button-group">
            <my-button>Default</my-button>
            <my-button type="primary">Primary</my-button>
            <my-button disabled>Disabled</my-button>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Button Sizes</h2>
        <p class="section-description">Buttons available in different sizes to fit various UI contexts.</p>
        <div class="demo-showcase">
          <div class="button-group">
            <my-button size="small">Small</my-button>
            <my-button size="medium">Medium</my-button>
            <my-button size="large">Large</my-button>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Interactive Examples</h2>
        <p class="section-description">Buttons with click handlers and different behaviors.</p>
        <div class="demo-showcase">
          <div class="button-group">
            <my-button @click="handleClick">Click Me</my-button>
            <my-button type="primary" @click="handlePrimaryClick">Primary Action</my-button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// Components are globally registered via MyUI plugin

const handleClick = () => {
  alert('Button clicked!');
};

const handlePrimaryClick = () => {
  alert('Primary button clicked!');
};
</script>

<style scoped>
.component-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.component-header {
  margin-bottom: 48px;
  text-align: center;
}

.component-header h1 {
  color: #2c3e50;
  margin-bottom: 16px;
  font-size: 2.5rem;
}

.component-description {
  color: #606266;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.demo-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.demo-section {
  background: #ffffff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.demo-section h2 {
  color: #409eff;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #409eff;
  font-size: 1.5rem;
}

.section-description {
  color: #606266;
  margin-bottom: 24px;
  line-height: 1.5;
}

.demo-showcase {
  background: #f8f9fa;
  padding: 24px;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
</style>