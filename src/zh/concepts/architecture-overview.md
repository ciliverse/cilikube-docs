---
title: CILIKUBE 架构概览
icon: project-diagram # 或者 'network-wired'
order: 1
article: true
date: 2025-04-01
category:
  - 架构
cover: /flow.png
# tag:
#   - 架构
# star: true
sticky: true
---

# 🏗️ 架构概览

CiliKube 采用现代化的前后端分离架构，旨在提供清晰、可扩展且高效的管理平台。
![alt text](../../.vuepress/public/flow.png)

## 主要组件
![alt text](../../.vuepress/public/architech.png)

1.  **前端 (Frontend):**
    *   **技术栈:** Vue 3, TypeScript, Vite, Element Plus。
    *   **职责:** 提供用户交互界面 (Web UI)，展示从后端获取的数据，并将用户的操作请求发送给后端 API。
    *   **特点:** 响应式设计，组件化开发，利用 Element Plus 提供丰富的 UI 组件，TypeScript 保证代码类型安全。

2.  **后端 (Backend):**
    *   **技术栈:** Go, Gin Web Framework, Kubernetes Client-Go。
    *   **职责:**
        *   提供 RESTful API 供前端调用。
        *   接收前端请求，与 Kubernetes API Server 进行交互（使用官方的 `client-go` 库）。
        *   执行 K8s 资源的管理操作（创建、读取、更新、删除 - CRUD）。
        *   处理用户认证和授权（如果平台本身有用户系统）。
        *   聚合或处理来自 K8s API 的数据，使其更适合前端展示。
        *   (可选) 包含与监控系统 (Prometheus) 或日志系统 (Elasticsearch) 的集成。
    *   **特点:** Go 语言带来的高性能和高并发能力，Gin 框架的简洁高效，`client-go` 的官方支持和稳定性。

3.  **Kubernetes API Server:**
    *   **职责:** Kubernetes 集群的控制平面核心组件，提供统一的 RESTful API 入口，用于管理集群中的所有资源。所有对集群状态的查询和修改都必须通过 API Server。
    *   **交互:** CiliKube 后端通过 `client-go` 库与 API Server 通信，发送请求并接收响应。

4.  **Kubeconfig:**
    *   **职责:** 存储访问 Kubernetes 集群所需的配置信息（API Server 地址、用户凭证、上下文等）。
    *   **使用:** CiliKube 后端读取 Kubeconfig 文件来确定如何连接以及以哪个用户的身份连接到目标 K8s 集群。

## 数据流 (查看 Pod 列表)
1.  用户在浏览器中打开 CiliKube，导航到 Pod 列表页面。
2.  前端 (Vue) 发送一个 HTTP GET 请求到后端 API (例如 `/api/v1/pods?namespace=default`)。
3.  后端 (Go/Gin) 接收到请求，解析出需要查询的命名空间。
4.  后端使用 `client-go` 库，根据配置的 Kubeconfig，向 Kubernetes API Server 发送获取 `default` 命名空间下所有 Pod 的请求。
5.  Kubernetes API Server 处理请求，从 Etcd (K8s 的存储后端) 读取 Pod 数据，并将结果返回给 CiliKube 后端。
6.  后端接收到 API Server 的响应，可能对数据进行适当处理（筛选、格式化），然后将 Pod 列表数据以 JSON 格式返回给前端。
7.  前端接收到 JSON 数据，使用 Vue 将数据渲染到页面上，用户看到 Pod 列表。

这种前后端分离的架构使得开发和维护更加清晰，允许前后端独立迭代和部署。