# Git 提交规范配置

> 生成时间：2025-12-27
> 相关需求：简化 Git 提交流程，使用交互式提交工具

## 已完成的工作

### 1. 安装依赖 ✅

```bash
commitizen          # Git 提交工具
cz-git             # 中文交互式提交适配器
@commitlint/cz-commitlint  # Commitlint 集成
inquirer@8         # 交互式命令行工具
```

### 2. 配置 commitlint.config.cjs ✅

添加了完整的中文交互式配置：

- ✅ 中文提示信息
- ✅ Emoji 图标支持
- ✅ 11 种提交类型
- ✅ 自定义作用域
- ✅ 详细的变更描述
- ✅ 关联 issue 支持

### 3. 配置 package.json ✅

添加了 commitizen 配置：

```json
{
  "scripts": {
    "commit": "git add . && git-cz"
  },
  "config": {
    "commitizen": {
      "path": "cz-git"
    }
  }
}
```

### 4. 修复 .npmrc 警告 ✅

移除了 `shamefully-hoist=true`（npm 不支持此配置）

## 使用方法

### 方式 1：使用 pnpm commit（推荐）✨

```bash
# 一个命令完成所有操作
pnpm commit
```

这个命令会：

1. 自动 `git add .` 添加所有更改
2. 启动交互式提交工具
3. 引导你完成规范的提交

### 方式 2：手动 git add

```bash
# 先添加文件
git add .

# 然后使用交互式提交
pnpm git-cz
```

## 交互式提交流程

运行 `pnpm commit` 后，会看到以下交互界面：

### 1. 选择提交类型

```
? 选择你要提交的类型 :
❯ feat:     ✨  新增功能
  fix:      🐛  修复缺陷
  docs:     📝  文档更新
  style:    💄  代码格式
  refactor: ♻️  代码重构
  perf:     ⚡️  性能优化
  test:     ✅  添加测试
  build:    📦️  构建流程变更
  ci:       🎡  修改 CI 配置
  revert:   ⏪️  回滚 commit
  chore:    🔨  其他更改
```

### 2. 选择作用域（可选）

```
? 选择一个提交范围（可选）:
  empty     (跳过)
  custom    (自定义)
```

### 3. 填写简短描述

```
? 填写简短精炼的变更描述 :
添加 Input 组件
```

### 4. 填写详细描述（可选）

```
? 填写更加详细的变更描述（可选）。使用 "|" 换行 :
实现了基础的 Input 组件|支持 v-model 双向绑定|添加了完整的类型定义
```

### 5. 确认提交

```
? 是否提交或修改commit ?
  Yes
❯ No
```

## 提交类型说明

| 类型     | Emoji | 说明                                           |
| -------- | ----- | ---------------------------------------------- |
| feat     | ✨    | 新增功能                                       |
| fix      | 🐛    | 修复缺陷                                       |
| docs     | 📝    | 文档更新                                       |
| style    | 💄    | 代码格式（不影响功能）                         |
| refactor | ♻️    | 代码重构（不包括 bug 修复、功能新增）          |
| perf     | ⚡️    | 性能优化                                       |
| test     | ✅    | 添加测试或已有测试改动                         |
| build    | 📦️    | 构建流程、外部依赖变更                         |
| ci       | 🎡    | 修改 CI 配置、脚本                             |
| revert   | ⏪️    | 回滚 commit                                    |
| chore    | 🔨    | 对构建过程或辅助工具和库的更改（不影响源文件） |

## 提交示例

### 示例 1：新增功能

```bash
pnpm commit

# 选择: feat
# 作用域: 跳过
# 描述: 添加 Input 组件
# 详细: 实现了基础的 Input 组件|支持 v-model 双向绑定

# 结果: ✨ feat: 添加 Input 组件
```

### 示例 2：修复 bug

```bash
pnpm commit

# 选择: fix
# 作用域: button
# 描述: 修复按钮点击事件问题

# 结果: 🐛 fix(button): 修复按钮点击事件问题
```

### 示例 3：文档更新

```bash
pnpm commit

# 选择: docs
# 作用域: 跳过
# 描述: 更新 README 文档

# 结果: 📝 docs: 更新 README 文档
```

## 配置说明

### commitlint.config.cjs

```javascript
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 允许的提交类型
    "type-enum": [2, "always", [...]],
    // 放宽规则，允许中文
    "type-case": [0],
    "subject-case": [0],
  },
  prompt: {
    // 中文提示信息
    messages: { ... },
    // 提交类型配置
    types: [ ... ],
    // 启用 Emoji
    useEmoji: true,
  },
};
```

### Husky 钩子

- **pre-commit**: 提交前自动格式化代码
- **commit-msg**: 验证提交信息格式

## 常见问题

### Q: 提交信息格式不正确怎么办？

A: 使用 `pnpm commit` 命令，它会引导你填写正确的格式。

### Q: 可以跳过某些步骤吗？

A: 可以。作用域、详细描述、关联 issue 都是可选的，直接回车跳过即可。

### Q: 如何修改上一次提交？

A: 使用 `git commit --amend`，然后再次运行 `pnpm commit`。

### Q: 提交被拒绝了怎么办？

A: 检查提交信息格式是否符合规范。使用 `pnpm commit` 可以避免这个问题。

## 最佳实践

### 1. 始终使用 pnpm commit

```bash
# ✅ 推荐
pnpm commit

# ❌ 不推荐（容易格式错误）
git commit -m "feat:项目优化"
```

### 2. 提交描述要清晰

```bash
# ✅ 好的描述
添加 Input 组件
修复 Button 组件点击事件问题
更新 Card 组件文档

# ❌ 不好的描述
更新
修改
优化
```

### 3. 合理使用作用域

```bash
# ✅ 有作用域
feat(button): 添加 loading 状态
fix(card): 修复样式问题

# ✅ 无作用域（全局性更改）
feat: 添加 ESLint 配置
docs: 更新 README
```

### 4. 一次提交只做一件事

```bash
# ✅ 好的提交
feat: 添加 Input 组件
fix: 修复 Button 样式问题

# ❌ 不好的提交
feat: 添加 Input 组件并修复 Button 样式问题
```

## 相关文档

- [Conventional Commits](https://www.conventionalcommits.org/)
- [cz-git 文档](https://cz-git.qbb.sh/zh/)
- [Commitlint 文档](https://commitlint.js.org/)

---

🎉 现在你可以使用 `pnpm commit` 轻松完成规范的 Git 提交了！
