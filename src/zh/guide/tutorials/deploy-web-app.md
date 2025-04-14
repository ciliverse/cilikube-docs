---
title: 部署一个 Web 应用 (Nginx)
icon: map
order: 1
---

# <Icon icon="cloud-upload-alt" /> 教程：部署一个 Web 应用 (Nginx)

本教程将引导你使用 CiliKube 部署一个简单的 Nginx Web 服务器，并创建一个 Service 使其可以在集群内部被访问。

**目标:**

1.  创建一个 Deployment 来运行 2 个 Nginx Pod 副本。
2.  创建一个 Service (ClusterIP 类型) 来暴露 Nginx Deployment。
3.  验证部署是否成功。

**前提:**

*   CiliKube 已运行并连接到你的 K8s 集群。
*   你拥有在目标命名空间创建 Deployment 和 Service 的权限。

## 步骤 1: 创建 Deployment

1.  在 CiliKube 界面，导航到 "工作负载" -> "Deployments"。
2.  点击 "创建 Deployment" 按钮。
3.  选择 **表单创建** 方式。
4.  **填写基本信息:**
    *   **名称:** `nginx-deployment`
    *   **命名空间:** 选择 `default` 或你想要部署的命名空间。
    *   **副本数:** 设置为 `2`。
5.  **配置 Pod 模板 (容器):**
    *   点击 "添加容器"。
    *   **容器名称:** `nginx`
    *   **镜像:** `nginx:latest` (或者一个更具体的版本如 `nginx:1.25`)
    *   **端口:**
        *   **名称:** `http`
        *   **容器端口:** `80` (Nginx 默认监听 80 端口)
        *   **协议:** `TCP`
    *   *(其他字段如环境变量、资源限制等，本次教程可暂时不填)*
    <!-- ![创建 Deployment - Nginx 容器配置截图](placeholder.png) -->
6.  **(可选) 配置标签:** Deployment 会自动生成 Pod 选择器标签，通常无需手动修改。默认可能是 `app=nginx-deployment`。
7.  点击 "创建"。

CiliKube 会向 K8s API Server 发送创建请求。稍等片刻，你应该能在 Deployment 列表看到 `nginx-deployment`，并且副本状态变为 `2/2`。你也可以点击进入详情页，在 "管理的 Pods" 区域看到两个正在运行的 Nginx Pod。

<!-- ![Nginx Deployment 列表/详情截图](placeholder.png) -->

## 步骤 2: 创建 Service

现在我们需要创建一个 Service 来为这两个 Nginx Pod 提供一个稳定的访问入口。

1.  导航到 "网络" -> "Services"。
2.  点击 "创建 Service" 按钮。
3.  选择 **表单创建** 方式。
4.  **填写基本信息:**
    *   **名称:** `nginx-service`
    *   **命名空间:** 选择与 Deployment 相同的命名空间 (`default`)。
    *   **类型:** 选择 `ClusterIP` (这是默认类型，表示只在集群内部可访问)。
5.  **配置端口:**
    *   **名称:** `http`
    *   **协议:** `TCP`
    *   **端口:** `80` (Service 监听的端口)
    *   **目标端口 (TargetPort):** `80` (转发到 Pod 容器的端口，即 Nginx 监听的 80 端口)
    <!-- ![创建 Service - 端口配置截图](placeholder.png) -->
6.  **配置选择器 (Selector):** **(关键)** Service 需要知道将流量转发给哪些 Pod。我们需要配置与 Deployment Pod 模板匹配的标签。
    *   添加一个选择器标签：
        *   **Key:** `app`
        *   **Value:** `nginx-deployment` (或者你在创建 Deployment 时看到的实际标签值)
    <!-- ![创建 Service - 选择器配置截图](placeholder.png) -->
7.  点击 "创建"。

现在你应该能在 Service 列表看到 `nginx-service`。

## 步骤 3: 验证部署

由于我们创建的是 `ClusterIP` 类型的 Service，它只能在集群内部访问。我们可以通过在一个临时 Pod 中执行命令来验证：

1.  **(可选) 使用 CiliKube 启动一个临时调试 Pod:** 如果 CiliKube 支持快速启动一个带 `curl` 或 `wget` 的 Pod 并进入其终端是最好的。
2.  **或者使用 `kubectl` (如果 CiliKube 没有直接支持):**
    ```bash
    # 启动一个临时的 ubuntu pod，并在结束后删除
    kubectl run tmp-debug --rm -it --image=ubuntu -- bash

    # 在 Pod 的 shell 中执行以下命令
    apt-get update && apt-get install -y curl dnsutils
    ```
3.  **在 Pod 的 Shell 中访问 Service:**
    ```bash
    # 使用 Service 名称访问 (Kubernetes DNS 会解析)
    curl http://nginx-service.default.svc.cluster.local

    # 或者直接访问 Service 的 ClusterIP (可以在 CiliKube Service 详情页看到)
    # curl http://[nginx-service 的 ClusterIP]
    ```

如果一切正常，你应该能看到 Nginx 的欢迎页面 HTML 输出：

```html
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
...
</html>
```
恭喜！你已经成功使用 CiliKube 部署了一个 Web 应用并创建了内部访问的 Service。
下一步，你可以尝试 配置 Ingress 域名访问 让你的 Nginx 可以从集群外部通过域名访问。