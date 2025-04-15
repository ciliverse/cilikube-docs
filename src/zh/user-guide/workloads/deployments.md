---
# 示例：user-guide/workloads/deployments.md
title: Deployments
icon: object-group
order: 1
article: false
---

# <Icon icon="object-group" /> Deployments

Deployment 是 Kubernetes 中用于管理**无状态应用副本**的核心控制器。它负责确保指定数量的 Pod 副本正在运行，并提供了声明式的更新策略（如滚动更新）和回滚能力。

在 CiliKube 中，导航到 "工作负载" -> "Deployments" 查看 Deployment 列表。

## 查看 Deployment 列表

<!-- ![Deployment 列表页面截图](placeholder.png) -->

列表通常显示：

*   **名称:** Deployment 名称。
*   **命名空间 (Namespace):**所属的命名空间。
*   **副本状态:** Ready 副本数 /期望副本数 (e.g., `3/3`)。
*   **镜像:** 使用的主要容器镜像。
*   **标签 (Labels):** 关键标签。
*   **创建时间:** 创建时间。

## 查看 Deployment 详情

点击 Deployment 名称进入详情页。

<!-- ![Deployment 详情页面截图](placeholder.png) -->

详情页包含：

*   **基本信息:** 名称、命名空间、标签、注解、创建时间等。
*   **副本状态:** 期望副本数、当前副本数、可用副本数、更新中的副本数。
*   **Pod 模板:** 定义如何创建 Pod 的模板信息（容器、镜像、端口、环境变量、卷挂载等）。
*   **更新策略:** 例如滚动更新 (RollingUpdate) 的参数（`maxUnavailable`, `maxSurge`）。
*   **条件 (Conditions):** Deployment 的状态条件 (如 `Available`, `Progressing`)。
*   **管理的 Pods:** 列出由此 Deployment 创建和管理的 Pod 列表，点击可跳转。
*   **历史版本 (ReplicaSets):** 列出 Deployment 的历史版本（ReplicaSet），用于回滚。
*   **事件 (Events):** 与此 Deployment 相关的事件。

## 创建 Deployment

1.  点击列表页的 "创建 Deployment" 或 "+" 按钮。
2.  选择创建方式：
    *   **表单创建:** 通过填写表单字段来定义 Deployment。
        *   输入名称、选择命名空间。
        *   配置 Pod 模板：添加容器、指定镜像、设置端口、环境变量、资源请求/限制等。
        *   设置副本数量。
        *   (可选) 配置标签、选择器、更新策略等高级选项。
        <!-- ![创建 Deployment 表单截图](placeholder.png) -->
    *   **YAML 创建:** 直接在内置的 YAML 编辑器中粘贴或编写 Deployment 的 YAML 配置。
        <!-- ![创建 Deployment YAML 编辑器截图](placeholder.png) -->
3.  点击 "创建" 或 "确认"。

## 更新 Deployment

*   **伸缩副本:** 在列表页或详情页找到副本数，直接修改期望值或点击 +/- 按钮。
    <!-- ![伸缩 Deployment 截图](placeholder.png) -->
*   **编辑:** 点击 "编辑" 按钮，可以通过表单或 YAML 修改 Deployment 的配置（例如，更新镜像版本、修改环境变量）。**注意:** 修改 Pod 模板会触发滚动更新。
*   **重启 (触发滚动更新):** 通常可以通过点击 "重启" 或 "重新部署" 按钮来触发一次滚动更新（原理是修改 Pod 模板中的一个无关紧要的注解或标签，让 Deployment 控制器重新创建所有 Pod）。
    <!-- ![重启 Deployment 按钮截图](placeholder.png) -->

## 回滚 Deployment

(如果 CiliKube 支持) 在 Deployment 详情页的历史版本 (ReplicaSets) 区域，选择一个旧版本，点击 "回滚到此版本"。

## 删除 Deployment

在列表页勾选或在详情页点击 "删除" 按钮。删除 Deployment 会同时删除其管理的所有 Pod 和 ReplicaSet。请谨慎操作。

---

**请对 Pods, Services, ConfigMaps, Secrets 等其他资源页面，仿照此结构进行填充和调整。**

---

### 核心概念 (`docs/guide/concepts/`)

#### `concepts/README.md`

```markdown
---
title: 核心概念
icon: lightbulb
index: false
---

# 💡 核心概念

理解 CiliKube 背后的设计思想和架构有助于你更好地使用它，甚至参与贡献。

本部分包含：

*   **[架构概览](./architecture-overview.md):** 了解 CiliKube 的主要组件及其交互方式。
*   **[安全模型](./security-model.md):** CiliKube 如何与 Kubernetes API 进行认证和授权。