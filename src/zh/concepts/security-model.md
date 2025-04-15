---
title: 安全模型
icon: user-shield
order: 3
article: false
---

# 🛡️ 安全模型

理解 CiliKube 如何与 Kubernetes 集群交互以及自身的安全机制非常重要。

## 与 Kubernetes 的交互安全

CiliKube **本身通常不处理 Kubernetes 的认证和授权逻辑**，而是**代理**用户的身份或使用配置的身份与 K8s API Server 通信。

**核心机制：Kubeconfig**

*   CiliKube 后端依赖有效的 **Kubeconfig** 文件来连接到一个或多个 Kubernetes 集群。
*   Kubeconfig 文件中包含了访问目标集群 API Server 的地址以及 **认证凭证** (例如 Token, 客户端证书, 或外部认证插件配置)。
*   当 CiliKube 后端代表用户向 K8s API Server 发送请求时，它使用的是 Kubeconfig 文件中指定的那个用户身份。

**权限控制 (RBAC):**

*   **用户在 CiliKube 中能看到什么、能做什么，完全取决于其 Kubeconfig 文件对应的用户/ServiceAccount 在 Kubernetes 集群中拥有的 RBAC 权限。**
*   例如，如果你的 Kubeconfig 文件对应的用户在 K8s 中只有读取 Pod 的权限 (`get`, `list`, `watch` pods)，那么即使 CiliKube UI 上有 "删除 Pod" 的按钮，点击后也会因为 K8s API Server 拒绝该操作而失败。
*   CiliKube UI 可能会根据 K8s 的 `SelfSubjectAccessReview` API 来动态判断当前用户是否有权限执行某个操作，从而决定是否启用或显示某个按钮（这是更友好的做法）。

**部署方式与安全:**

*   **Docker 部署:** 你通过 `-v` 将本地 Kubeconfig 挂载给 CiliKube 容器。CiliKube 使用的就是你本地 `kubectl` 的身份。请确保挂载的 Kubeconfig 文件安全。
*   **Helm 部署 (InCluster):** 当 CiliKube 作为 Pod 部署在集群内部时，最佳实践是为其创建一个专用的 `ServiceAccount`，并通过 K8s RBAC (`Role`/`ClusterRole` 和 `RoleBinding`/`ClusterRoleBinding`) 精确授予该 ServiceAccount 所需的最小权限。CiliKube Pod 会自动使用该 ServiceAccount 的 Token 与 API Server 通信。这种方式更安全、更符合 K8s 的原生实践。
    ```yaml
    # 示例：授予 cilikube-sa 读取所有命名空间 Pod 的权限
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRole
    metadata:
      name: cilikube-pod-reader
    rules:
    - apiGroups: [""]
      resources: ["pods"]
      verbs: ["get", "list", "watch"]
    ---
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRoleBinding
    metadata:
      name: cilikube-read-pods
    subjects:
    - kind: ServiceAccount
      name: cilikube-sa # Helm Chart 创建的 ServiceAccount 名称
      namespace: cilikube # CiliKube 部署的命名空间
    roleRef:
      kind: ClusterRole
      name: cilikube-pod-reader
      apiGroup: rbac.authorization.k8s.io
    ```

## CiliKube 应用自身的安全 (如果实现)

如果 CiliKube 本身需要支持多用户登录、用户管理和内部权限控制（例如，不同 CiliKube 用户只能看到授权给他们的 K8s 集群），则需要额外的安全机制：

*   **用户认证:**
    *   本地用户名/密码存储（需要安全地哈希密码）。
    *   集成 OAuth2/OIDC 提供商 (如 Google, GitHub, GitLab, Keycloak)。
*   **会话管理:** 使用安全的 Cookie 或 Token (如 JWT) 来管理用户登录状态。
*   **内部访问控制:** 在 CiliKube 后端实现逻辑，将 CiliKube 用户映射到他们有权访问的 K8s 集群 (Kubeconfig)。

**默认情况下，简单的 CiliKube 实现可能不包含应用自身的多用户系统，而是直接依赖于提供的 Kubeconfig 的权限。** 请根据你项目的实际情况说明。

**安全建议:**

*   **最小权限原则:** 无论是为 Docker 挂载的 Kubeconfig 对应的用户，还是为 Helm 部署的 ServiceAccount，都只授予完成其工作所必需的最小 K8s RBAC 权限。
*   **保护 Kubeconfig:** Kubeconfig 文件包含敏感凭证，务必妥善保管。
*   **使用 HTTPS:** 确保 CiliKube 前后端以及与 K8s API Server 之间的通信都使用 HTTPS 加密。
*   **及时更新:** 保持 CiliKube、Kubernetes 和相关依赖项的更新，以修复已知的安全漏洞。