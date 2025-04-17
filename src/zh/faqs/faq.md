---
title: 常见问题解答 (FAQ)
icon: question-circle
# aticle: false
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

