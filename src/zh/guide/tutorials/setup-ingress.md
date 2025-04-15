---
title: 配置 Ingress 域名访问
icon: globe
order: 2
article: false
---

# <Icon icon="globe-americas" /> 教程：配置 Ingress 域名访问

本教程将展示如何在 [部署了 Web 应用 (Nginx)](./deploy-web-app.md) 的基础上，使用 CiliKube 创建一个 Ingress 资源，使得可以通过域名从 Kubernetes 集群外部访问你的 Nginx 服务。

**目标:**

1.  (前提) 确保你的集群已安装并运行 Ingress Controller (如 Nginx Ingress Controller, Traefik)。
2.  创建一个 Ingress 资源，将特定域名 (例如 `nginx.cilikube.local`) 的请求路由到之前创建的 `nginx-service`。
3.  配置本地 DNS (或实际 DNS) 将域名指向 Ingress Controller 的外部 IP 地址。
4.  验证通过域名访问 Nginx。

**前提:**

*   你已经完成了 [部署一个 Web 应用 (Nginx)](./deploy-web-app.md) 教程，`nginx-deployment` 和 `nginx-service` 正在运行。
*   你的 Kubernetes 集群中**必须**安装并正确配置了一个 **Ingress Controller**。CiliKube 本身不提供 Ingress Controller，它只负责创建 Ingress 资源对象。
    *   常用的 Ingress Controller 有: [Nginx Ingress Controller](https://kubernetes.github.io/ingress-nginx/), [Traefik Kubernetes Ingress](https://doc.traefik.io/traefik/providers/kubernetes-ingress/), 等。
    *   你需要知道你的 Ingress Controller 对外暴露的 IP 地址或主机名。可以通过以下命令查看 (以 Nginx Ingress Controller 为例，它通常部署在 `ingress-nginx` 命名空间)：
        ```bash
        kubectl get svc -n ingress-nginx
        # 找到类型为 LoadBalancer 的 Service，查看其 EXTERNAL-IP
        ```
*   你拥有在目标命名空间创建 Ingress 资源的权限。

## 步骤 1: 创建 Ingress 资源

1.  在 CiliKube 界面，导航到 "网络" -> "Ingresses"。
2.  点击 "创建 Ingress" 按钮。
3.  选择 **表单创建** 或 **YAML 创建**。这里以表单为例。
4.  **填写基本信息:**
    *   **名称:** `nginx-ingress`
    *   **命名空间:** 选择与 Service 相同的命名空间 (`default`)。
    *   **(重要) Ingress Class:** 根据你的集群配置选择正确的 Ingress Class Name (例如 `nginx`, `traefik`，或者集群默认值)。如果不确定，可以留空或咨询集群管理员。
5.  **配置规则 (Rules):**
    *   点击 "添加规则"。
    *   **主机名 (Host):** 输入你希望用来访问 Nginx 的域名。**为了本地测试方便，我们可以使用一个不会与公网冲突的域名，例如 `nginx.cilikube.local`。**
    *   **路径 (Paths):**
        *   点击 "添加路径"。
        *   **路径:** `/` (表示该域名的所有路径)
        *   **路径类型 (Path Type):** `Prefix` (或者 `ImplementationSpecific`)
        *   **后端 (Backend):**
            *   **服务名称 (Service Name):** 选择我们之前创建的 `nginx-service`。
            *   **服务端口 (Service Port):** 选择 `http (80/TCP)` (或者直接输入端口号 `80`)。
    <!-- ![创建 Ingress - 规则配置截图](placeholder.png) -->
6.  **(可选) 配置 TLS/SSL:** 如果你有该域名的 SSL 证书，可以在这里配置 TLS，实现 HTTPS 访问。需要先将证书和私钥创建为 Kubernetes Secret。本次教程我们先使用 HTTP。
7.  点击 "创建"。

## 步骤 2: 配置 DNS 解析

现在我们需要让你的电脑知道 `nginx.cilikube.local` 这个域名应该指向哪里。我们需要将它指向 Ingress Controller 的外部 IP 地址。

1.  **获取 Ingress Controller 的外部 IP:**
    ```bash
    kubectl get svc -n ingress-nginx # 替换为你的 Ingress Controller 命名空间
    # 找到类型为 LoadBalancer 的 Service，复制 EXTERNAL-IP 列的值。
    # 如果是 Minikube 或 Kind，可能需要执行特定命令获取 IP，例如:
    # minikube service -n ingress-nginx ingress-nginx-controller --url
    # 或者 Kind 需要配置 MetalLB 等来获取 LoadBalancer IP
    ```
    假设你获取到的 IP 是 `192.168.49.2` (请替换为你实际的 IP)。

2.  **修改本地 hosts 文件:**
    *   **Linux/macOS:** 编辑 `/etc/hosts` 文件 (需要 sudo 权限)。
    *   **Windows:** 编辑 `C:\Windows\System32\drivers\etc\hosts` 文件 (需要管理员权限)。
    *   在文件末尾添加一行：
        ```
        [Ingress Controller 的外部 IP] nginx.cilikube.local
        # 例如:
        192.168.49.2 nginx.cilikube.local
        ```
    *   保存文件。

**注意:** 修改 hosts 文件只在你本机生效。如果需要让网络中的其他人访问，你需要配置真实的 DNS 服务器。

## 步骤 3: 验证访问

打开你的浏览器，访问 `http://nginx.cilikube.local`。

你应该能看到 Nginx 的欢迎页面！

<!-- ![浏览器访问 Nginx 成功截图](placeholder.png) -->

**排错提示:**

*   如果访问超时或无法连接：
    *   检查 Ingress Controller 是否正常运行。
    *   检查 Ingress Controller 的外部 IP 是否获取正确。
    *   检查本地 hosts 文件是否配置正确且指向了正确的 IP。
    *   检查防火墙规则是否允许访问该 IP 和端口 (通常是 80)。
*   如果看到 Ingress Controller 的 404 或 503 错误页面：
    *   检查 CiliKube 中创建的 Ingress 资源的规则是否正确（主机名、路径、后端 Service 名称和端口）。
    *   检查 `nginx-service` 是否正常运行且有可用的 Endpoints (`kubectl get endpoints nginx-service -n default`)。
    *   检查 `nginx-deployment` 的 Pod 是否都处于 Running 状态。

**恭喜！你已经成功配置了 Ingress，实现了通过域名从集群外部访问你的 Web 应用。**