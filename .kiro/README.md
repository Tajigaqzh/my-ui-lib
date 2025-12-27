# .kiro 文件夹说明

这个文件夹用于管理与 AI 协作相关的所有文档。

## 📁 文件夹结构

```
.kiro/
├── README.md              # 本说明文档
├── requirements.md        # 需求管理文档（主要文档）
└── summaries/            # AI 生成的总结文档
    ├── build-optimization.md
    └── setup-complete.md
```

## 📖 文档说明

### requirements.md（需求管理文档）

**这是最重要的文档！**

- **用途**：记录项目需求、已完成工作和待办事项
- **如何使用**：
  1. 在"新需求"部分添加你的需求
  2. AI 会读取这个文件并执行你的需求
  3. 完成后会更新"需求历史"部分
- **建议**：每次与 AI 协作前先查看这个文档

### summaries/（总结文档文件夹）

- **用途**：存放 AI 生成的详细总结文档
- **内容**：每次重要任务完成后，AI 会在这里生成总结
- **命名规范**：使用 kebab-case，如 `build-optimization.md`

## 🎯 最佳实践

### 1. 提出需求

在 `requirements.md` 的"新需求"部分添加：

```markdown
### 添加 Input 组件

**描述**：
创建一个基础的 Input 输入框组件

**期望结果**：

- [ ] 支持 v-model 双向绑定
- [ ] 支持 placeholder、disabled 等属性
- [ ] 添加单元测试

**优先级**：高
```

### 2. AI 执行流程

1. AI 读取 `requirements.md`
2. 执行需求中的任务
3. 更新"需求历史"部分
4. 在 `summaries/` 生成详细总结

### 3. 查看历史

- 查看 `requirements.md` 了解所有需求历史
- 查看 `summaries/` 中的文档了解详细实现

## 🔄 与旧文档的关系

之前的文档已整合到这里：

- `REQUESTS.md` → `.kiro/requirements.md`
- `BUILD_OPTIMIZATION.md` → `.kiro/summaries/build-optimization.md`
- `SETUP_COMPLETE.md` → `.kiro/summaries/setup-complete.md`

旧文档可以删除，所有内容都在 `.kiro/` 中。

## 💡 约束和规范

### AI 行为约束

1. **总结文档位置**：所有总结必须输出到 `.kiro/summaries/`
2. **需求管理**：所有需求记录在 `.kiro/requirements.md`
3. **文档更新**：每次任务完成后更新相关文档
4. **命名规范**：使用清晰的 kebab-case 命名

### 文档编写规范

1. **使用 Markdown 格式**
2. **添加生成时间**：在文档顶部标注
3. **清晰的结构**：使用标题、列表、代码块
4. **实用性优先**：提供可执行的命令和示例

## 🚀 快速开始

1. **查看当前需求**：

   ```bash
   cat .kiro/requirements.md
   ```

2. **添加新需求**：
   编辑 `.kiro/requirements.md`，在"新需求"部分添加

3. **查看总结**：
   ```bash
   ls .kiro/summaries/
   ```

---

有任何问题或建议，请在 `requirements.md` 中提出！
