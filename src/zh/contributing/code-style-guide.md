---
title: 代码风格指南
icon: code
order: 3
article: false
---

# <Icon icon="code" /> 代码风格指南

保持一致的代码风格对于项目的可读性和可维护性至关重要。请在贡献代码时遵循以下风格指南。

## 前端 (TypeScript / Vue / SCSS)

1.  **代码格式化:**
    *   使用 **Prettier** 进行代码格式化。项目已配置 `.prettierrc` 文件。
    *   **强烈建议** 在你的 IDE (如 VS Code) 中安装 Prettier 插件，并配置为 "Format on Save" (保存时自动格式化)。
    *   提交前可以手动运行 `pnpm format` (或 `npm run format` / `yarn format`) 格式化所有前端代码。

2.  **代码检查 (Linting):**
    *   使用 **ESLint** 进行代码质量和风格检查。项目已配置 `.eslintrc.js` (或 `.eslintrc.json`) 文件，并集成了 TypeScript 和 Vue 的规则。
    *   **强烈建议** 在你的 IDE 中安装 ESLint 插件，以便实时看到错误和警告。
    *   提交前运行 `pnpm lint` (或 `npm run lint` / `yarn lint`) 检查代码。请修复所有 ESLint 报告的错误 (Error)。警告 (Warning) 也应尽量解决。

3.  **TypeScript:**
    *   **类型优先:** 尽可能为变量、函数参数和返回值添加明确的类型注解。利用 TypeScript 的类型推断，但关键地方需显式注解。
    *   **接口 (Interface) vs 类型别名 (Type Alias):** 优先使用 `interface` 定义对象结构，使用 `type` 定义联合类型、元组或其他复杂类型。
    *   **避免 `any`:** 尽量避免使用 `any` 类型。如果类型不确定，优先考虑 `unknown` 并进行类型守卫，或者使用泛型。

4.  **Vue 3:**
    *   **组合式 API (Composition API):** 推荐使用组合式 API (`<script setup>`) 来组织组件逻辑，提高代码的可复用性和可维护性。
    *   **组件命名:** 使用 PascalCase (大驼峰命名法) 命名组件文件和在 `<script setup>` 中导入的组件，例如 `UserProfile.vue`。在模板中使用 Kebab-case (短横线分隔命名法)，例如 `<user-profile />`。
    *   **Props:** 为 Props 添加明确的类型和必要的验证 (`required`, `default`)。
    *   **Emits:** 使用 `defineEmits` 显式声明组件触发的事件。
    *   **响应式变量:** 使用 `ref` 定义基本类型的响应式变量，使用 `reactive` 定义对象的响应式变量。

5.  **SCSS / CSS:**
    *   遵循 BEM (Block, Element, Modifier) 命名规范或其他一致的 CSS 命名约定。
    *   利用 SCSS 的嵌套、变量、Mixin 等特性提高样式的可维护性。
    *   避免过深的嵌套层级。

## 后端 (Go)

1.  **代码格式化:**
    *   使用 **`gofmt`** 或 **`goimports`** 进行代码格式化。`goimports` 会自动格式化并管理 import 语句。
    *   **强烈建议** 配置 IDE 在保存时自动运行 `goimports`。
    *   提交前确保代码已被格式化。

2.  **代码检查 (Linting):**
    *   使用 **`golangci-lint`** 进行静态代码分析。项目根目录应包含 `.golangci.yml` 配置文件。
    *   [安装 golangci-lint](https://golangci-lint.run/usage/install/)。
    *   提交前运行 `golangci-lint run ./...` (在 `backend` 目录下) 并修复报告的问题。

3.  **命名规范:**
    *   遵循 Go 官方推荐的命名规范 ([Effective Go](https://go.dev/doc/effective_go#names))。
    *   使用 `camelCase` (小驼峰) 命名局部变量和函数名。
    *   使用 `PascalCase` (大驼峰) 命名导出的变量、常量、类型和函数。
    *   包名应简洁、小写且具有描述性。
    *   接口名通常以 `er` 结尾 (例如 `Reader`, `Writer`, `Logger`)。

4.  **错误处理:**
    *   显式地检查并处理错误。避免使用 `_` 忽略错误，除非你明确知道不会发生错误或错误无关紧要。
    *   使用 `errors.Is` 和 `errors.As` (Go 1.13+) 进行错误判断和解包。
    *   为重要的错误添加上下文信息，使用 `fmt.Errorf("... %w", err)`。

5.  **注释:**
    *   为所有导出的类型、函数、常量和变量编写清晰的注释 (Doc comments)。
    *   注释应解释 "为什么" 和 "做什么"，而不仅仅是 "怎么做"。
    *   使用 `//` 进行单行或行尾注释，使用 `/* ... */` 进行多行注释（较少使用）。

6.  **代码组织:**
    *   遵循 Go 项目的标准布局 ([Standard Go Project Layout](https://github.com/golang-standards/project-layout))，例如将命令入口放在 `cmd/`，内部代码放在 `internal/`，可复用库放在 `pkg/`。 (根据项目实际情况调整)
    *   保持包的内聚性，避免循环依赖。

## Git 提交信息

*   **遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。** 这有助于自动化生成 Changelog 和版本管理。
*   **格式:** `<type>(<scope>): <subject>`
    *   **`type`:** `feat` (新功能), `fix` (Bug 修复), `docs` (文档), `style` (代码风格), `refactor` (重构), `perf` (性能优化), `test` (测试), `chore` (构建、工具等)
    *   **`scope`:** (可选) 修改的范围 (例如 `frontend`, `backend`, `api`, `deployment`)
    *   **`subject`:** 简洁描述修改内容，使用现在时态，首字母小写。
*   **示例:**
    *   `feat(frontend): add pod list filtering by status`
    *   `fix(backend): correct error handling for cluster connection`
    *   `docs: update contribution guide for code style`
    *   `chore: upgrade golangci-lint to v1.55`

通过遵循这些指南，我们可以共同维护一个高质量、易于理解和协作的代码库。