<template>
  <div class="component-page">
    <header class="component-header">
      <h1>Card Component</h1>
      <p class="component-description">
        Flexible card component for displaying content with customizable headers, shadows, and styling options.
      </p>
    </header>

    <div class="demo-container">
      <section class="demo-section">
        <h2>Basic Cards</h2>
        <p class="section-description">Simple card variations with different shadow behaviors.</p>
        <div class="demo-showcase">
          <div class="demo-grid">
            <div class="demo-item">
              <h4>Basic Card</h4>
              <my-card title="Card Title">
                <p>This is the card content. You can put any content here.</p>
              </my-card>
            </div>

            <div class="demo-item">
              <h4>Card with Shadow on Hover</h4>
              <my-card title="Hover Me" shadow="hover">
                <p>This card shows shadow only on hover.</p>
              </my-card>
            </div>

            <div class="demo-item">
              <h4>Card without Shadow</h4>
              <my-card title="No Shadow" shadow="never">
                <p>This card has no shadow effect.</p>
              </my-card>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Advanced Cards</h2>
        <p class="section-description">Cards with custom headers and styling options.</p>
        <div class="demo-showcase">
          <div class="demo-grid">
            <div class="demo-item">
              <h4>Card with Custom Header</h4>
              <my-card>
                <template #header>
                  <div class="custom-header">
                    <span>Custom Header</span>
                    <my-button size="small" type="primary">Action</my-button>
                  </div>
                </template>
                <p>Card with custom header slot.</p>
              </my-card>
            </div>

            <div class="demo-item">
              <h4>Card with Custom Body Style</h4>
              <my-card
                title="Custom Padding"
                :body-style="{ padding: '40px', backgroundColor: '#f5f7fa' }"
              >
                <p>This card has custom body styling.</p>
              </my-card>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Interactive Examples</h2>
        <p class="section-description">Cards with interactive content and actions.</p>
        <div class="demo-showcase">
          <div class="demo-grid">
            <div class="demo-item">
              <h4>Interactive Card</h4>
              <my-card title="User Profile">
                <div class="profile-content">
                  <p><strong>Name:</strong> John Doe</p>
                  <p><strong>Role:</strong> Developer</p>
                  <div class="card-actions">
                    <my-button size="small" @click="handleEdit">Edit</my-button>
                    <my-button size="small" type="primary" @click="handleView">View</my-button>
                  </div>
                </div>
              </my-card>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// Components are globally registered via MyUI plugin

const handleEdit = () => {
  alert('Edit profile clicked!');
};

const handleView = () => {
  alert('View profile clicked!');
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

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.demo-item {
  margin-bottom: 20px;
}

.demo-item h4 {
  font-size: 14px;
  color: #606266;
  margin-bottom: 12px;
  font-weight: 500;
}

.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-content {
  line-height: 1.6;
}

.profile-content p {
  margin-bottom: 8px;
}

.card-actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}
</style>