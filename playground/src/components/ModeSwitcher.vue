<template>
  <div class="mode-switcher">
    <label class="mode-switcher__label">Mode:</label>
    <div class="mode-switcher__toggle">
      <button
        :class="['mode-switcher__button', { active: currentMode === 'source' }]"
        @click="switchMode('source')"
      >
        Source
      </button>
      <button
        :class="['mode-switcher__button', { active: currentMode === 'build' }]"
        @click="switchMode('build')"
      >
        Build
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { modeSwitcher, type PlaygroundMode } from '../services/mode-switcher';

const currentMode = ref<PlaygroundMode>(modeSwitcher.getCurrentMode());

const switchMode = async (mode: PlaygroundMode) => {
  modeSwitcher.setMode(mode);
  await modeSwitcher.loadStyles();
  // Emit event to trigger app reinitialization
  window.dispatchEvent(new CustomEvent('mode-changed', { detail: { mode } }));
};

let unsubscribe: (() => void) | null = null;

onMounted(() => {
  unsubscribe = modeSwitcher.onModeChange((mode) => {
    currentMode.value = mode;
  });
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

<style scoped>
.mode-switcher {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mode-switcher__label {
  font-weight: 500;
  color: #606266;
  font-size: 0.9rem;
}

.mode-switcher__toggle {
  display: flex;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.mode-switcher__button {
  padding: 8px 14px;
  border: none;
  background: #fff;
  color: #606266;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;
  font-weight: 500;
  min-width: 60px;
}

.mode-switcher__button:hover {
  background: #f5f7fa;
}

.mode-switcher__button.active {
  background: #409eff;
  color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
}

.mode-switcher__button:not(:last-child) {
  border-right: 1px solid #dcdfe6;
}

/* Tablet responsive styles */
@media (max-width: 1024px) {
  .mode-switcher {
    gap: 10px;
  }
  
  .mode-switcher__label {
    font-size: 0.85rem;
  }
  
  .mode-switcher__button {
    padding: 7px 12px;
    font-size: 0.8rem;
    min-width: 55px;
  }
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .mode-switcher {
    gap: 8px;
  }
  
  .mode-switcher__label {
    display: none; /* Hide label on mobile to save space */
  }
  
  .mode-switcher__button {
    padding: 6px 10px;
    font-size: 0.75rem;
    min-width: 50px;
  }
}

/* Small mobile responsive styles */
@media (max-width: 480px) {
  .mode-switcher {
    gap: 6px;
  }
  
  .mode-switcher__toggle {
    border-radius: 4px;
  }
  
  .mode-switcher__button {
    padding: 5px 8px;
    font-size: 0.7rem;
    min-width: 45px;
  }
}

/* Extra small mobile */
@media (max-width: 320px) {
  .mode-switcher__button {
    padding: 4px 6px;
    font-size: 0.65rem;
    min-width: 40px;
  }
}
</style>