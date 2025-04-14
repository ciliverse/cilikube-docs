---
title: 安装部署
icon: download
order: 3
---

# 🔧 安装部署 CiliKube

本页提供部署 CiliKube 的详细方法。

## 先决条件

*   **Kubernetes 集群:** 一个运行中的 K8s 集群 (v1.19+ 推荐)。
*   **Kubeconfig 文件:** 用于连接 K8s 集群的有效 Kubeconfig 文件。
*   **网络访问:** 确保部署 CiliKube 的地方可以访问 K8s 集群的 API Server。
*   **相关工具 (根据部署方式选择):**
    *   Docker
    *   Helm v3
    *   Go (如果从源码编译)
    *   Node.js & pnpm/npm/yarn (如果从源码编译)

## 方式一：使用 Docker 部署 (推荐用于本地/测试)

这是最简单快捷的方式，已在 [快速入门](./quick-start.md) 中介绍。

```bash
docker run -d --name cilikube \
  -p [宿主机端口]:[容器端口, 通常是 8080] \
  -v [你的 Kubeconfig 路径]:[容器内 Kubeconfig 路径, e.g., /app/kubeconfig]:ro \
  [你的 Docker Hub 仓库]/cilikube:[版本标签]

  配置项 (通过环境变量或挂载配置文件，根据你的后端实现决定):
Kubeconfig 路径: 如上通过 -v 挂载指定。
监听端口: 容器内部监听的端口 (例如 8080)，可以通过环境变量配置 (如果后端支持)。
多集群配置: 如果支持管理多个 Kubeconfig，可能需要挂载一个包含多个配置的目录或特定的配置文件。请参考 CiliKube 的具体配置说明。
方式二：使用 Helm Chart 部署 (推荐用于集群内部署)
如果 CiliKube 提供了 Helm Chart，这是将其部署到 Kubernetes 集群内部的最佳方式。
添加 Helm 仓库 (如果提供了仓库地址):
helm repo add cilikube [你的 Helm Chart 仓库 URL]
helm repo update
Use code with caution.
Bash
搜索 Chart:
helm search repo cilikube
Use code with caution.
Bash
准备 values.yaml (推荐):
创建一个 my-values.yaml 文件来覆盖默认配置。至少需要配置如何访问 K8s API。可能有几种方式：
InCluster 配置 (推荐): 如果 CiliKube Pod 部署在 K8s 集群内，它可以自动使用 Service Account Token 连接 API Server。需要在 values.yaml 中启用此选项。
# my-values.yaml (示例)
serviceAccount:
  create: true # 让 Helm 创建 ServiceAccount
  # name: cilikube-sa # 可以指定名称
# 可能需要配置 RBAC 权限，确保 ServiceAccount 有权限访问所需资源
rbac:
  create: true
# ... 其他配置
Use code with caution.
Yaml
挂载 Kubeconfig: 将包含 Kubeconfig 的 Secret 挂载到 CiliKube Pod 中。
# my-values.yaml (示例)
# 1. 先创建一个 Secret 包含你的 kubeconfig 文件
# kubectl create secret generic cilikube-kubeconfig --from-file=config=/path/to/your/kubeconfig
# 2. 在 values.yaml 中引用这个 Secret
kubeconfigSecret:
  enabled: true
  secretName: cilikube-kubeconfig
  mountPath: /app/kubeconfig # 挂载到容器内的路径
  filename: config # Secret 中的 key
# ... 其他配置
Use code with caution.
Yaml
安装 Chart:
# 部署到名为 'cilikube' 的 namespace (如果不存在则创建)
helm install cilikube cilikube/cilikube \
  --namespace cilikube \
  --create-namespace \
  -f my-values.yaml # 使用你的配置文件
Use code with caution.
Bash
访问 CiliKube:
安装完成后，Helm 输出通常会提示如何访问 CiliKube 服务。可能需要配置 Ingress 或使用 kubectl port-forward：
# 示例：如果 Service 类型是 ClusterIP
kubectl port-forward svc/cilikube [本地端口]:[Service 端口] -n cilikube
# 然后访问 http://localhost:[本地端口]
Use code with caution.
Bash
或者配置 Ingress 来通过域名访问。
Helm Chart 配置项:
请查阅 CiliKube Helm Chart 的 values.yaml 文件或文档，了解所有可配置项，例如：
副本数 (replicaCount)
镜像版本 (image.tag)
Service 类型和端口 (service.type, service.port)
Ingress 配置 (ingress.enabled, ingress.hosts)
资源限制 (resources.limits, resources.requests)
持久化存储 (如果需要)
方式三：从源码编译部署 (面向开发者/贡献者)
如果你想参与开发或需要定制构建，可以从源码编译。
克隆源码:
git clone https://github.com/[你的用户名]/cilikube.git
cd cilikube
Use code with caution.
Bash
编译前端:
cd frontend # 进入前端目录
pnpm install # 或 npm install / yarn install
pnpm build # 或 npm run build / yarn build
Use code with caution.
Bash
构建后的静态文件通常在 dist/ 目录下。
编译后端:
cd ../backend # 进入后端目录
# 可能需要设置 Go 环境变量，如 CGO_ENABLED=0 GOOS=linux GOARCH=amd64
go build -o cilikube-server . # 编译生成可执行文件
Use code with caution.
Bash
运行:
后端:
# 确保 Kubeconfig 文件路径正确，或设置 KUBECONFIG 环境变量
export KUBECONFIG=/path/to/your/kubeconfig
./cilikube-server # 运行后端服务
# 可能需要传递参数指定静态文件路径、监听端口等
# ./cilikube-server --web-dir=../frontend/dist --port=8080
Use code with caution.
Bash
前端 (开发模式): 通常后端会配置反向代理或 CORS 来允许前端开发服务器访问。
cd ../frontend
pnpm dev # 或 npm run dev / yarn dev
Use code with caution.
Bash
构建 Docker 镜像 (可选):
项目根目录下通常会有一个 Dockerfile 用于构建包含前后端的完整镜像。
docker build -t [你的 Docker Hub 仓库]/cilikube:[自定义标签] .
Use code with caution.
Bash
选择哪种方式？
本地快速体验: 使用 Docker。
部署到 K8s 集群: 使用 Helm Chart。
开发或自定义: 从源码编译。