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
git clone https://github.com/ciliverse/cilikube.git
cd cilikube
```
建议 Fork 项目到你自己的 GitHub 账号，然后克隆你 Fork 后的仓库。
前端开发 (Vue3 + TS + ElementPlus)

```bash
#进入前端目录:
cd frontend

#安装依赖:
pnpm install
# 或 npm install / yarn install

#运行开发服务器:
pnpm dev
# 或 npm run dev / yarn dev
```
这将启动 Vite 开发服务器，通常监听在 http://localhost:5173 (端口可能变化，请看终端输出)。它支持热模块替换 (HMR)，修改代码后浏览器会自动刷新。
配置后端 API 地址:

前端开发服务器需要知道后端 API 的地址才能发送请求。通常通过 Vite 的配置文件 (vite.config.ts) 中的 server.proxy 或环境变量来配置。

查找配置: 查看 frontend/vite.config.ts 文件，找到 server.proxy 部分。
默认代理: 可能默认将 /api 路径代理到 http://localhost:8080 (后端默认端口)。
```js
// /vite.config.ts (示例)
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
```
确保这里的 target 指向你本地运行的后端服务地址和端口。
代码检查与格式化:
```bash
pnpm lint # 运行 ESLint 检查代码
pnpm format # 使用 Prettier 格式化代码
```
建议在 IDE 中配置保存时自动运行格式化。
后端开发 (Go + Gin)
```bash
进入后端目录:
cd backend # 如果你在 frontend 目录，先 cd .. 回到根目录
# cd backend

下载 Go 依赖:
go mod tidy
# 或者 go mod download
```
配置 Kubeconfig:
后端服务需要访问你的 K8s 集群。确保你的 KUBECONFIG 环境变量设置正确，或者你的默认 Kubeconfig (~/.kube/config) 指向你的开发集群。
```bash
export KUBECONFIG=/path/to/your/kind-or-minikube.kubeconfig

运行后端服务:
go run main.go 或者 go run cmd/server/main.go (入口在 cmd 目录下)

```
后端服务通常会启动并监听一个端口（例如 8080）。查看终端输出确认服务已启动并监听在正确的端口。
(可选) 编译后运行:
``` bash
go build -o cilikube-server ./cmd/server # 编译到 backend 目录
./cilikube-server # 运行编译后的二进制文件
```
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

