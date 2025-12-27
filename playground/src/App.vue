<template>
  <div class="playground">
    <h1>My UI Component Library Playground</h1>

    <section class="demo-section">
      <h2>Button Component</h2>

      <div class="demo-grid">
        <div class="demo-item">
          <h3>Default Buttons</h3>
          <div class="button-group">
            <my-button>Default</my-button>
            <my-button type="primary">Primary</my-button>
            <my-button disabled>Disabled</my-button>
          </div>
        </div>

        <div class="demo-item">
          <h3>Button Sizes</h3>
          <div class="button-group">
            <my-button size="small">Small</my-button>
            <my-button size="medium">Medium</my-button>
            <my-button size="large">Large</my-button>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Card Component</h2>

      <div class="demo-grid">
        <div class="demo-item">
          <h3>Basic Card</h3>
          <my-card title="Card Title">
            <p>This is the card content. You can put any content here.</p>
          </my-card>
        </div>

        <div class="demo-item">
          <h3>Card with Shadow on Hover</h3>
          <my-card title="Hover Me" shadow="hover">
            <p>This card shows shadow only on hover.</p>
          </my-card>
        </div>

        <div class="demo-item">
          <h3>Card without Shadow</h3>
          <my-card title="No Shadow" shadow="never">
            <p>This card has no shadow effect.</p>
          </my-card>
        </div>

        <div class="demo-item">
          <h3>Card with Custom Header</h3>
          <my-card>
            <template #header>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span>Custom Header</span>
                <my-button size="small" type="primary">Action</my-button>
              </div>
            </template>
            <p>Card with custom header slot.</p>
          </my-card>
        </div>

        <div class="demo-item">
          <h3>Card with Custom Body Style</h3>
          <my-card
            title="Custom Padding"
            :body-style="{ padding: '40px', backgroundColor: '#f5f7fa' }"
          >
            <p>This card has custom body styling.</p>
          </my-card>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Components are globally registered via MyUI plugin
</script>

<style scoped>
.playground {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, sans-serif;
}

h1 {
  color: #2c3e50;
  margin-bottom: 40px;
}

.demo-section {
  margin-bottom: 60px;
}

h2 {
  color: #409eff;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #409eff;
}

h3 {
  font-size: 14px;
  color: #606266;
  margin-bottom: 12px;
  font-weight: 500;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.demo-item {
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
