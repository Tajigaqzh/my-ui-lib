<template>
  <div class="home">
    <header class="hero-section">
      <h1>My UI Component Library</h1>
      <p class="hero-description">
        Welcome to the component playground. Explore our comprehensive collection of UI components designed for modern web applications.
      </p>
    </header>
    
    <section class="components-section">
      <h2>Available Components</h2>
      <div class="component-grid">
        <router-link 
          v-for="component in components" 
          :key="component.name"
          :to="component.path"
          class="component-card"
        >
          <div class="component-preview">
            <component :is="component.previewComponent" v-if="component.previewComponent" />
            <div v-else class="preview-placeholder">
              <span>{{ component.name }}</span>
            </div>
          </div>
          <div class="component-info">
            <h3>{{ component.title }}</h3>
            <p>{{ component.description }}</p>
            <div class="component-meta">
              <span class="component-count">{{ component.examples }} examples</span>
              <span class="component-status">{{ component.status }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <section class="getting-started">
      <h2>Getting Started</h2>
      <div class="getting-started-grid">
        <div class="guide-card">
          <h3>🚀 Quick Start</h3>
          <p>Click on any component above to see live examples and usage patterns.</p>
        </div>
        <div class="guide-card">
          <h3>📖 Documentation</h3>
          <p>Each component page includes detailed examples and interactive demos.</p>
        </div>
        <div class="guide-card">
          <h3>🎨 Customization</h3>
          <p>All components support theming and custom styling options.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';

// 简化的预览组件，避免在测试环境中出现导入问题
const ButtonPreview = () => h('div', { 
  class: 'preview-placeholder',
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#409eff',
    color: 'white',
    borderRadius: '4px',
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: '500'
  }
}, 'Button Preview');

const CardPreview = () => h('div', { 
  class: 'preview-placeholder',
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8f9fa',
    border: '1px solid #e4e7ed',
    borderRadius: '8px',
    padding: '16px',
    fontSize: '12px',
    color: '#606266',
    width: '200px',
    height: '80px'
  }
}, 'Card Preview');

const components = [
  {
    name: 'Button',
    path: '/button',
    title: 'Button Component',
    description: 'Interactive button component with various styles, sizes, and states for user interactions.',
    examples: 8,
    status: 'Stable',
    previewComponent: ButtonPreview
  },
  {
    name: 'Card',
    path: '/card', 
    title: 'Card Component',
    description: 'Flexible card component for displaying content with customizable headers, shadows, and styling options.',
    examples: 5,
    status: 'Stable',
    previewComponent: CardPreview
  }
];
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.hero-section {
  text-align: center;
  margin-bottom: 64px;
  padding: 48px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  margin-bottom: 48px;
}

.hero-section h1 {
  color: #2c3e50;
  margin-bottom: 16px;
  font-size: 3rem;
  font-weight: 700;
}

.hero-description {
  color: #606266;
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
}

.components-section {
  margin-bottom: 64px;
}

.components-section h2 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 32px;
  text-align: center;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
}

.component-card {
  display: block;
  background: #ffffff;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.component-card:hover {
  border-color: #409eff;
  box-shadow: 0 8px 24px rgba(64, 158, 255, 0.15);
  transform: translateY(-4px);
}

.component-preview {
  height: 120px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e4e7ed;
  position: relative;
}

.preview-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #909399;
  font-size: 1.1rem;
  font-weight: 500;
}

.component-info {
  padding: 24px;
}

.component-info h3 {
  margin: 0 0 12px 0;
  color: #409eff;
  font-size: 1.4rem;
  font-weight: 600;
}

.component-info p {
  margin: 0 0 16px 0;
  color: #606266;
  line-height: 1.6;
  font-size: 0.95rem;
}

.component-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.component-count {
  color: #909399;
}

.component-status {
  background: #67c23a;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.getting-started {
  background: #ffffff;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.getting-started h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 24px;
  text-align: center;
}

.getting-started-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.guide-card {
  text-align: center;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.guide-card h3 {
  color: #409eff;
  margin-bottom: 12px;
  font-size: 1.1rem;
}

.guide-card p {
  color: #606266;
  line-height: 1.5;
  margin: 0;
  font-size: 0.9rem;
}

/* Tablet responsive styles */
@media (max-width: 1024px) {
  .home {
    padding: 32px 16px;
  }
  
  .hero-section {
    padding: 40px 20px;
    margin-bottom: 40px;
  }
  
  .hero-section h1 {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
  
  .components-section {
    margin-bottom: 48px;
  }
  
  .component-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }
  
  .getting-started {
    padding: 32px;
  }
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .home {
    padding: 24px 12px;
  }
  
  .hero-section {
    padding: 32px 16px;
    margin-bottom: 32px;
  }
  
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .components-section h2 {
    font-size: 1.6rem;
    margin-bottom: 24px;
  }
  
  .component-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .component-info {
    padding: 20px;
  }
  
  .component-info h3 {
    font-size: 1.2rem;
  }
  
  .getting-started {
    padding: 24px;
  }
  
  .getting-started h2 {
    font-size: 1.5rem;
  }
  
  .getting-started-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .guide-card {
    padding: 20px;
  }
}

/* Small mobile responsive styles */
@media (max-width: 480px) {
  .home {
    padding: 16px 8px;
  }
  
  .hero-section {
    padding: 24px 12px;
    margin-bottom: 24px;
  }
  
  .hero-section h1 {
    font-size: 1.6rem;
  }
  
  .hero-description {
    font-size: 0.9rem;
  }
  
  .components-section h2 {
    font-size: 1.4rem;
  }
  
  .component-grid {
    gap: 16px;
  }
  
  .component-preview {
    height: 100px;
  }
  
  .component-info {
    padding: 16px;
  }
  
  .component-info h3 {
    font-size: 1.1rem;
  }
  
  .component-info p {
    font-size: 0.9rem;
  }
  
  .component-meta {
    font-size: 0.8rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .getting-started {
    padding: 20px;
  }
  
  .getting-started h2 {
    font-size: 1.3rem;
  }
  
  .guide-card {
    padding: 16px;
  }
  
  .guide-card h3 {
    font-size: 1rem;
  }
  
  .guide-card p {
    font-size: 0.85rem;
  }
}

/* Extra small mobile */
@media (max-width: 320px) {
  .home {
    padding: 12px 4px;
  }
  
  .hero-section {
    padding: 20px 8px;
  }
  
  .hero-section h1 {
    font-size: 1.4rem;
  }
  
  .component-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .component-info {
    padding: 12px;
  }
  
  .getting-started {
    padding: 16px;
  }
  
  .guide-card {
    padding: 12px;
  }
}
</style>