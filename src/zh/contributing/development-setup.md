---
title: 开发环境设置
icon: tools
order: 2
article: false
---

# 🛠️ 开发环境设置

本指南将帮助你设置 CiliKube 的本地开发环境，以便你可以开始贡献代码。

## 先决条件

*   **Git:** [安装 Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
*   **Node.js:** v18.x 或更高版本。 [下载 Node.js](https://nodejs.org/) (推荐使用 nvm 或 fnm 进行版本管理)
*   **pnpm:** (推荐) CiliKube 前端使用 pnpm 进行包管理。 [安装 pnpm](https://pnpm.io/installation) (或使用 `npm install -g pnpm`)。如果你习惯 npm 或 yarn，也可以使用，但 pnpm 具有更好的性能和磁盘空间效率。
*   **Go:** v1.20 或更高版本。 [安装 Go](https://go.dev/doc/install)
*   **Docker:** (可选，但推荐) 用于构建镜像或运行依赖服务。 [安装 Docker](https://docs.docker.com/engine/install/)
*   **GoLand / VS Code:** 推荐的 IDE，并安装相应的 Go 和 Vue/TypeScript 插件。
*   **一个 Kubernetes 集群:** 用于测试。Kind 或 Minikube 是不错的本地选择。

## 获取源码

```bash
git clone https://github.com/[你的用户名]/cilikube.git
cd cilikube
```
建议 Fork 项目到你自己的 GitHub 账号，然后克隆你 Fork 后的仓库。
前端开发 (Vue3 + TS + ElementPlus)
进入前端目录:
cd frontend
Use code with caution.
Bash
安装依赖:
pnpm install
# 或 npm install / yarn install
Use code with caution.
Bash
运行开发服务器:
pnpm dev
# 或 npm run dev / yarn dev
Use code with caution.
Bash
这将启动 Vite 开发服务器，通常监听在 http://localhost:5173 (端口可能变化，请看终端输出)。它支持热模块替换 (HMR)，修改代码后浏览器会自动刷新。
配置后端 API 地址:
前端开发服务器需要知道后端 API 的地址才能发送请求。通常通过 Vite 的配置文件 (vite.config.ts) 中的 server.proxy 或环境变量来配置。
查找配置: 查看 frontend/vite.config.ts 文件，找到 server.proxy 部分。
默认代理: 可能默认将 /api 路径代理到 http://localhost:8080 (后端默认端口)。
// frontend/vite.config.ts (示例)
export default defineConfig({
  server: {
    proxy: {
      // 将 /api 请求代理到后端服务器
      '/api': {
        target: 'http://localhost:8080', // 后端 API 地址
        changeOrigin: true,
        // 可选：如果后端 API 路径没有 /api 前缀，可以在这里重写
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // ... 其他配置
});
Use code with caution.
TypeScript
确保这里的 target 指向你本地运行的后端服务地址和端口。
代码检查与格式化:
pnpm lint # 运行 ESLint 检查代码
pnpm format # 使用 Prettier 格式化代码
Use code with caution.
Bash
建议在 IDE 中配置保存时自动运行格式化。
后端开发 (Go + Gin)
进入后端目录:
cd backend # 如果你在 frontend 目录，先 cd .. 回到根目录
# cd backend
Use code with caution.
Bash
下载 Go 依赖:
go mod tidy
# 或者 go mod download
Use code with caution.
Bash
配置 Kubeconfig:
后端服务需要访问你的 K8s 集群。确保你的 KUBECONFIG 环境变量设置正确，或者你的默认 Kubeconfig (~/.kube/config) 指向你的开发集群。
export KUBECONFIG=/path/to/your/kind-or-minikube.kubeconfig
Use code with caution.
Bash
运行后端服务:
go run main.go # 假设入口文件是 main.go
# 或者 go run cmd/server/main.go (如果你的入口在 cmd 目录下)
Use code with caution.
Bash
后端服务通常会启动并监听一个端口（例如 8080）。查看终端输出确认服务已启动并监听在正确的端口。
(可选) 编译后运行:
go build -o cilikube-server ./cmd/server # 编译到 backend 目录
./cilikube-server # 运行编译后的二进制文件
Use code with caution.
Bash
环境变量/配置文件 (如果需要):
后端服务可能依赖一些环境变量或配置文件来设置监听端口、Kubeconfig 路径、数据库连接等。请查看项目文档或代码了解需要哪些配置。
同时运行前后端
打开一个终端，进入 backend 目录，运行 go run main.go。
打开另一个终端，进入 frontend 目录，运行 pnpm dev。
在浏览器中访问前端开发服务器的地址 (e.g., http://localhost:5173)。
前端会将 /api 请求代理到正在运行的后端服务 (e.g., http://localhost:8080)。
现在你可以在本地修改前端或后端代码，进行开发和调试了！
提示:
使用 IDE 的 Debug 功能可以方便地调试 Go 后端代码。
浏览器开发者工具 (F12) 是调试前端代码和网络请求的利器。
#### `contributing/code-style-guide.md`

```markdown
---
title: 代码风格指南
icon: code
order: 3
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
Use code with caution.
contributing/contribution-workflow.md
---
title: 贡献流程
icon: project-diagram # 或者 'sitemap'
order: 4
---

# <Icon icon="project-diagram" /> 贡献流程

我们使用 GitHub Flow 作为主要的协作模式。以下是向 CiliKube 贡献代码的标准流程：

## 1. Fork 仓库

*   访问 CiliKube 的主仓库：`https://github.com/[项目组织或所有者]/cilikube`
*   点击页面右上角的 "Fork" 按钮，将主仓库 Fork 到你自己的 GitHub 账号下。

## 2. Clone 你的 Fork

*   将你 Fork 的仓库克隆到本地：
    ```bash
    git clone https://github.com/[你的用户名]/cilikube.git
    cd cilikube
    ```

## 3. 添加 Upstream 远程仓库

*   将原始的 CiliKube 仓库添加为一个名为 `upstream` 的远程仓库，以便后续同步更新：
    ```bash
    git remote add upstream https://github.com/[项目组织或所有者]/cilikube.git
    ```
*   验证远程仓库设置：
    ```bash
    git remote -v
    # 输出应包含 origin (你的 fork) 和 upstream (原始仓库)
    ```

## 4. 同步更新 (开始新工作前)

*   在开始任何新的修改之前，先从 `upstream` 拉取最新的代码，确保你的本地 `main` (或主分支) 是最新的：
    ```bash
    git checkout main # 切换到 main 分支
    git fetch upstream # 从 upstream 拉取最新信息
    git merge upstream/main # 将 upstream/main 合并到你的本地 main
    # 或者使用 rebase (如果你偏好线性历史)
    # git rebase upstream/main
    git push origin main # (可选) 更新你 Fork 仓库的 main 分支
    ```

## 5. 创建特性分支

*   基于最新的 `main` 分支，为你的修改创建一个新的、具有描述性的分支：
    ```bash
    git checkout -b feature/describe-your-feature # 例如: feature/add-node-taint-editing
    # 或者修复 Bug:
    # git checkout -b fix/fix-pod-log-streaming-issue
    ```
    *   分支命名建议：`feature/` 用于新功能，`fix/` 用于 Bug 修复，`docs/` 用于文档修改等。

## 6. 进行修改和开发

*   在你的特性分支上进行代码修改、添加新功能或修复 Bug。
*   确保你的修改符合 [代码风格指南](./code-style-guide.md)。
*   编写必要的测试用例（单元测试、集成测试）。
*   确保所有测试通过 (`go test ./...`, `pnpm test` 等)。
*   确保代码检查通过 (`golangci-lint run ./...`, `pnpm lint`)。

## 7. 提交你的修改

*   将你的修改添加到暂存区：
    ```bash
    git add <修改的文件>
    # 或者 git add .
    ```
*   使用遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范的提交信息进行提交：
    ```bash
    git commit -m "feat(frontend): add taint editing modal to node details"
    ```
    *   如果有多条修改，进行原子性的提交（一个提交解决一个独立的问题）。

## 8. 推送你的分支到 GitHub

*   将你的本地特性分支推送到你的 GitHub Fork 仓库：
    ```bash
    git push origin feature/describe-your-feature
    ```

## 9. 创建 Pull Request (PR)

*   打开你的 GitHub Fork 仓库页面 (`https://github.com/[你的用户名]/cilikube`)。
*   GitHub 通常会自动检测到你推送的新分支，并显示一个 "Compare & pull request" 的按钮，点击它。
*   或者，切换到你的特性分支，点击 "Pull request" 按钮。
*   **选择基准分支:** 确保 Base repository 是 `[项目组织或所有者]/cilikube`，Base branch 是 `main` (或项目的主分支)。Head repository 是你的 Fork，Compare branch 是你刚才推送的特性分支。
*   **填写 PR 信息:**
    *   **标题:** 使用清晰、简洁的标题，最好也遵循 Conventional Commits 的 subject 部分。
    *   **描述:**
        *   清晰地描述你做了什么修改。
        *   解释为什么需要这个修改（解决了什么问题？实现了什么功能？）。
        *   如果关联了某个 GitHub Issue，使用 `Closes #[Issue编号]` 或 `Fixes #[Issue编号]` 链接到它。
        *   (可选) 提供截图或 GIF 展示 UI 变更。
*   点击 "Create pull request"。

## 10. 代码审查和讨论

*   项目维护者或其他贡献者会对你的 PR 进行审查。
*   他们可能会提出问题、建议修改或请求更多信息。请及时回应审查意见。
*   如果需要修改代码，直接在你本地的特性分支上修改、提交，并再次推送到你的 Fork (`git push origin feature/describe-your-feature`)。PR 会自动更新。

## 11. 合并 PR

*   一旦你的 PR 通过审查并且所有检查（CI 测试等）都通过，项目维护者会将你的 PR 合并到主仓库的 `main` 分支。
*   恭喜！你的贡献已经成为 CiliKube 的一部分！🎉

## 12. 清理 (可选)

*   PR 合并后，你可以删除你的本地特性分支和 GitHub Fork 上的特性分支：
    ```bash
    git checkout main # 切换回 main 分支
    git pull upstream main # 确保本地 main 是最新的 (包含你的合并)
    git branch -d feature/describe-your-feature # 删除本地分支
    # 在 GitHub 你的 Fork 页面删除远程分支
    ```

感谢你的贡献！
Use code with caution.
Markdown
其他页面
docs/faq.md (示例)
---
title: 常见问题解答 (FAQ)
icon: question-circle
---

# ❓ 常见问题解答 (FAQ)

**Q1: CiliKube 支持哪些 Kubernetes 版本？**

A1: CiliKube 设计上旨在兼容主流的 Kubernetes 版本。我们推荐使用 Kubernetes v1.19 或更高版本。具体兼容性可能取决于所使用的 `client-go` 版本。我们会在 Release Notes 中说明经过测试的版本范围。

**Q2: CiliKube 如何连接到我的 Kubernetes 集群？安全吗？**

A2: CiliKube 通过标准的 Kubeconfig 文件连接到你的集群。它使用 Kubeconfig 中定义的凭证与 K8s API Server 通信。你能看到和操作的内容取决于该 Kubeconfig 对应用户的 RBAC 权限。当使用 Helm 在集群内部署时，推荐为其配置专用的 ServiceAccount 并授予最小权限。详情请参考 [安全模型](./guide/concepts/security-model.md)。

**Q3: 我可以在 CiliKube 中管理多个集群吗？**

A3: 是的，CiliKube 支持管理多个 Kubernetes 集群。你可以在 UI 中添加不同的 Kubeconfig 文件或配置，并在它们之间轻松切换。请参考 [集群管理](./guide/user-guide/cluster-management.md)。

**Q4: CiliKube 是否支持 <某个特定的 K8s 资源或功能>？**

A4: CiliKube 旨在覆盖核心的 K8s 资源管理。你可以查阅 [用户指南](./guide/user-guide/) 查看当前支持的资源类型。如果缺少你需要的功能，欢迎在 [GitHub Issues]([你的 GitHub Issues 链接]) 中提出功能建议！

**Q5: CiliKube 和 Lens / K9s / Rancher UI 有什么区别？**

A5:
*   **Lens** 和 **K9s** 是桌面应用程序或终端 UI，功能非常强大，面向经验丰富的 K8s 用户。
*   **Rancher UI** 是 Rancher 管理平台的一部分，功能全面，但可能相对重量级。
*   **CiliKube** 是一个轻量级的 **Web UI**，特别注重**对 K8s 初学者的友好性**和**易用性**，并且作为一个**开源的学习实践平台**，鼓励社区参与和二次开发。它的目标不是取代上述工具，而是提供一个更易上手、更侧重核心管理任务的选择。

**Q6: 如何报告 Bug 或寻求帮助？**

A6:
*   报告 Bug 或提出功能建议，请使用 [GitHub Issues]([你的 GitHub Issues 链接])。
*   寻求帮助或参与讨论，请加入我们的 [社区渠道链接]。

**Q7: CiliKube 是免费的吗？**

A7: 是的，CiliKube 是根据 Apache 2.0 许可证发布的开源软件，完全免费使用。

*(根据你的项目情况添加更多 FAQ)*