---
title: 用户指南
icon: server
index: false
article: false
---

# 📘 用户指南

欢迎来到 CiliKube 用户指南！本部分将详细介绍如何使用 CiliKube 的各项功能来管理你的 Kubernetes 集群。

**主要内容包括:**

*   **[Dashboard 概览](./dashboard-overview.md):** 了解主界面布局和核心信息展示。
*   **[集群管理](./cluster-management.md):** 如何添加、切换和查看不同的 Kubernetes 集群。
*   **[节点管理](./node-management.md):** 查看集群节点状态、资源使用情况和标签信息。
*   **工作负载管理:**
    *   **[Deployments](./workloads/deployments.md):** 创建、查看、伸缩和管理 Deployment。
    *   **[Pods](./workloads/pods.md):** 查看 Pod 列表、详情、日志和进入终端。
    *   *(根据需要添加 StatefulSets, DaemonSets, Jobs, CronJobs 等页面)*
*   **网络配置:**
    *   **[Services](./networking/services.md):** 管理 Service 资源。
    *   **[Ingresses](./networking/ingresses.md):** 管理 Ingress 资源。
*   **存储管理:**
    *   **[PV & PVC](./storage/pv-pvc.md):** 查看 PersistentVolume 和 PersistentVolumeClaim。
    *   **[StorageClasses](./storage/storageclasses.md):** 查看 StorageClass。
*   **配置管理:**
    *   **[ConfigMaps](./configuration/configmaps.md):** 管理 ConfigMap。
    *   **[Secrets](./configuration/secrets.md):** 管理 Secret。
*   **[实时日志与终端](./logs-terminal.md):** (如果前面特性中包含，这里可以单独成页) 如何查看日志和使用 Web Terminal。
*   **[YAML 编辑器](./yaml-editor.md):** (如果前面特性中包含) 如何使用内置的 YAML 编辑器。

请根据左侧的侧边栏导航，选择你感兴趣的功能进行查阅。