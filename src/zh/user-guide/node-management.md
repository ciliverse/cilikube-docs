---
title: 节点管理
icon: server # 或者 'hdd'
order: 3
article: false
---

# 🖥️ 节点管理

节点 (Node) 是 Kubernetes 集群中的工作机器，可以是物理机或虚拟机。所有运行应用程序的 Pod 最终都会调度到节点上。CiliKube 提供了查看和管理节点信息的界面。

导航到 "集群" -> "节点" 或类似的菜单项，即可进入节点列表页面。

<!-- ![节点列表页面截图](placeholder.png) -->

## 查看节点列表

节点列表通常会展示以下关键信息：

*   **名称:** 节点的名称。
*   **状态:** 节点当前的健康状态 (例如 `Ready`, `NotReady`, `SchedulingDisabled`)。`Ready` 表示节点健康且可以接受新的 Pod 调度。
*   **角色:** 节点的角色 (例如 `control-plane`, `worker` 或 `<none>`)。
*   **K8s 版本:** 节点上运行的 Kubelet 版本。
*   **IP 地址:** 节点的内部 IP 和外部 IP (如果有)。
*   **资源使用情况 (可选):** 实时或近期的 CPU 和内存使用率。
*   **Pod 数量:** 当前运行在该节点上的 Pod 数量 / 该节点允许的最大 Pod 数量。
*   **创建时间:** 节点加入集群的时间。

你可以通过表头的排序功能对列表进行排序，或使用搜索框按名称过滤节点。

## 查看节点详情

点击列表中的节点名称，可以进入该节点的详细信息页面。

<!-- ![节点详情页面截图](placeholder.png) -->

详情页面通常包含更丰富的信息：

*   **概要信息:** 包括列表页的关键信息，以及操作系统、内核版本、容器运行时 (Docker/containerd) 等。
*   **资源分配与使用:**
    *   **容量 (Capacity):** 节点总的 CPU、内存、存储、Pod 数量等资源。
    *   **可分配 (Allocatable):** 节点上可供 Pod 使用的资源量（容量减去为系统保留的部分）。
    *   **已请求 (Requested):** 该节点上所有 Pod 请求的资源总量。
    *   **已限制 (Limits):** 该节点上所有 Pod 设置的资源限制总量。
    *   **实时使用率:** CPU 和内存的实时使用情况图表 (如果集成了监控)。
*   **标签 (Labels):** 节点上的标签键值对，用于节点选择器 (NodeSelector) 和节点亲和性 (NodeAffinity)。你可以在此添加或删除标签 (如果 CiliKube 支持)。
*   **注解 (Annotations):** 节点上的注解信息。
*   **污点 (Taints):** 节点上的污点信息。污点用于阻止某些 Pod 调度到该节点，除非 Pod 具有相应的容忍 (Toleration)。你可以在此添加或删除污点 (如果 CiliKube 支持)。
*   **条件 (Conditions):** 反映节点状态的详细条件列表 (如 `Ready`, `MemoryPressure`, `DiskPressure`) 及其状态和最后更新时间。
*   **运行中的 Pods:** 列出当前正在该节点上运行的所有 Pod，点击可跳转到 Pod 详情。
*   **事件 (Events):** 与该节点相关的 Kubernetes 事件。

## 节点操作 (根据 CiliKube 功能)

*   **封锁/取消封锁 (Cordon/Uncordon):**
    *   **封锁 (Cordon):** 将节点标记为 `SchedulingDisabled`，阻止新的 Pod 调度到该节点上，但现有 Pod 不受影响。常用于节点维护前。
    *   **取消封锁 (Uncordon):** 移除 `SchedulingDisabled` 标记，允许新的 Pod 调度到该节点。
*   **排空 (Drain):** (谨慎操作！) 安全地驱逐节点上的所有 Pod（遵循 PodDisruptionBudgets），并将节点标记为 `SchedulingDisabled`。通常在节点下线或进行重大维护时使用。
*   **编辑标签/污点:** 如上所述，直接在详情页修改。

通过节点管理功能，你可以全面了解集群的计算资源状况，并进行必要的维护操作。