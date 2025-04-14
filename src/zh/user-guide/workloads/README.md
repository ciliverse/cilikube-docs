---
# 示例：user-guide/workloads/README.md
title: 工作负载管理
icon: cubes # 或者 'layer-group'
index: false
---

# <Icon icon="cubes" /> 工作负载管理

工作负载 (Workload) 是指在 Kubernetes 上运行的应用程序。Kubernetes 提供了多种内置的工作负载资源对象，用于管理不同类型的应用。

本部分将介绍如何使用 CiliKube 管理常见的工作负载资源：

*   **[Deployments](./deployments.md):** 用于部署无状态应用的控制器，支持滚动更新和回滚。
*   **[Pods](./pods.md):** Kubernetes 中最小的可部署单元，通常由控制器管理。
*   *(链接到其他工作负载页面，如 StatefulSets, DaemonSets 等)*

通过 CiliKube，你可以轻松创建、查看、更新和删除这些工作负载资源。