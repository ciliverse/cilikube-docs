---
title: Dashboard 概览
icon: tachometer-alt
order: 1
---

# 📊 Dashboard 概览

当你登录 CiliKube 并选择一个集群后，首先看到的就是 Dashboard 主界面。Dashboard 旨在提供当前集群状态的**核心信息概览**。

<!-- ![CiliKube Dashboard 截图](placeholder.png) -->

通常，Dashboard 会包含以下几个关键区域：

1.  **集群信息概要:**
    *   当前集群名称。
    *   Kubernetes 版本。
    *   集群状态（是否健康）。
    *   API Server 地址。

2.  **资源使用情况:**
    *   **CPU:** 集群总 CPU 请求/限制/容量，以及当前使用率的图表。
    *   **内存 (Memory):** 集群总内存请求/限制/容量，以及当前使用率的图表。
    *   **Pod 容量:** 集群允许的 Pod 数量及当前已分配数量。

3.  **核心资源统计:**
    *   **节点 (Nodes):** 正常运行的节点数量 / 总节点数量。点击可跳转到节点管理页面。
    *   **命名空间 (Namespaces):** 集群中的命名空间数量。
    *   **工作负载 (Workloads):** Deployments, StatefulSets, Pods 等工作负载的运行状态统计（例如：运行中、失败、等待中）。点击可跳转到对应资源的管理页面。
    *   **网络 (Networking):** Services, Ingresses 的数量统计。
    *   **存储 (Storage):** PVC, PV 的数量统计。

4.  **事件 (Events):** (可选)
    *   显示集群中最近发生的重要事件，特别是错误或警告事件，帮助快速发现问题。

5.  **导航栏/侧边栏:**
    *   提供到各个功能模块的入口，如节点、工作负载、网络、存储、配置等。

Dashboard 是你了解集群整体健康状况和资源使用情况的起点。通过点击各个统计项，你可以快速导航到更详细的管理页面。