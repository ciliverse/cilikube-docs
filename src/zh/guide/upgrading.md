---
title: 升级指南
icon: arrow-up
order: 4
---

# ⬆️ 升级指南

本页介绍如何将 CiliKube 升级到新版本。请在升级前 **务必备份** 任何重要配置或数据（如果 CiliKube 使用了持久化存储）。同时，请仔细阅读目标版本的 **Release Notes (更新日志)**，了解是否有重大变更或不兼容的改动。

## 从 Docker 部署升级

如果你使用 Docker `run` 命令直接部署：

1.  **停止并移除旧容器:**
    ```bash
    docker stop cilikube
    docker rm cilikube
    ```

2.  **拉取新版本镜像:**
    ```bash
    docker pull [你的 Docker Hub 仓库]/cilikube:[新版本标签]
    ```

3.  **使用之前的 `docker run` 命令启动新容器:**
    确保使用与之前相同的参数（特别是端口映射 `-p` 和 Kubeconfig 挂载 `-v`）。
    ```bash
    docker run -d --name cilikube \
      -p [宿主机端口]:[容器端口] \
      -v [你的 Kubeconfig 路径]:[容器内 Kubeconfig 路径]:ro \
      [你的 Docker Hub 仓库]/cilikube:[新版本标签] # 注意这里使用新版本标签
    ```

## 从 Helm Chart 部署升级

如果你使用 Helm Chart 部署：

1.  **更新 Helm 仓库:**
    ```bash
    helm repo update cilikube # 你的仓库名可能不同
    ```

2.  **查看可用版本:**
    ```bash
    helm search repo cilikube/cilikube --versions # 查看所有可用版本
    ```

3.  **获取当前部署的 values (可选但推荐):**
    ```bash
    helm get values cilikube -n cilikube > cilikube-current-values.yaml
    ```
    比较 `cilikube-current-values.yaml` 和新版本 Chart 的默认 `values.yaml`，了解配置变更。

4.  **执行升级:**
    ```bash
    helm upgrade cilikube cilikube/cilikube \
      --version [新版本 Chart 版本号] \
      -n cilikube \
      -f cilikube-current-values.yaml # 可以沿用之前的配置，但可能需要根据新版本调整
      # --set key=value # 也可以通过 --set 覆盖个别参数
    ```

5.  **检查升级状态:**
    ```bash
    helm status cilikube -n cilikube
    kubectl get pods -n cilikube -w # 观察 Pod 是否正常滚动更新
    ```

## 从源码编译部署升级

1.  **停止当前运行的服务 (前端和后端)。**

2.  **更新源码:**
    ```bash
    cd /path/to/cilikube # 进入项目根目录
    git checkout main # 或你的主开发分支
    git pull origin main
    git checkout [新版本标签或 commit ID] # 切换到目标版本
    ```

3.  **重新编译前端和后端:**
    按照 [安装部署](./installation.md#方式三从源码编译部署面向开发者贡献者) 中的编译步骤重新编译。

4.  **使用新编译的文件重新启动服务。**

## 注意事项

*   **数据库迁移:** 如果 CiliKube 使用了数据库来存储配置或其他信息，升级时可能需要执行数据库迁移脚本。请务必查看 Release Notes 中关于数据库迁移的说明。
*   **API 变更:** 后端 API 可能在新版本中发生变化。如果你的前端是独立部署或有其他服务依赖 CiliKube API，需要注意兼容性。
*   **配置变更:** Helm Chart 的 `values.yaml` 或 Docker 部署的环境变量/配置文件可能有变动，升级时需要相应调整。

如有疑问，请查阅对应版本的 Release Notes 或向社区寻求帮助。