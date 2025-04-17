---
title: 贡献流程
icon: project-diagram # 或者 'sitemap'
order: 4
---

# <Icon icon="project-diagram" /> 贡献流程

我们使用 GitHub Flow 作为主要的协作模式。以下是向 CiliKube 贡献代码的标准流程：

## 1. Fork 仓库

*   访问 CiliKube 的主仓库：`https://github.com/ciliverse/cilikube`
*   点击页面右上角的 "Fork" 按钮，将主仓库 Fork 到你自己的 GitHub 账号下。

## 2. Clone 你的 Fork

*   将你 Fork 的仓库克隆到本地：
    ```bash
    git clone https://github.com/ciliverse/cilikube.git
    cd cilikube
    ```

## 3. 添加 Upstream 远程仓库

*   将原始的 CiliKube 仓库添加为一个名为 `upstream` 的远程仓库，以便后续同步更新：
    ```bash
    git remote add upstream https://github.com/ciliverse/cilikube.git
    ```
*   验证远程仓库设置：
    ```bash
    git remote -v
    # 输出应包含 origin (你的 fork) 和 upstream (原始仓库)
    ```

## 4. 同步更新 (开始新工作前)

*   在开始任何新的修改之前，先从 `upstream` 拉取最新的代码，确保你的本地 `main` (或主分支) 是最新的：
    ```bash
    git checkout main # 切换到 main 分支
    git fetch upstream # 从 upstream 拉取最新信息
    git merge upstream/main # 将 upstream/main 合并到你的本地 main
    # 或者使用 rebase (如果你偏好线性历史)
    # git rebase upstream/main
    git push origin main # (可选) 更新你 Fork 仓库的 main 分支
    ```

## 5. 创建特性分支

*   基于最新的 `main` 分支，为你的修改创建一个新的、具有描述性的分支：
    ```bash
    git checkout -b feature/describe-your-feature # 例如: feature/add-node-taint-editing
    # 或者修复 Bug:
    # git checkout -b fix/fix-pod-log-streaming-issue
    ```
    *   分支命名建议：`feature/` 用于新功能，`fix/` 用于 Bug 修复，`docs/` 用于文档修改等。

## 6. 进行修改和开发

*   在你的特性分支上进行代码修改、添加新功能或修复 Bug。
*   确保你的修改符合 [代码风格指南](./code-style-guide.md)。
*   编写必要的测试用例（单元测试、集成测试）。
*   确保所有测试通过 (`go test ./...`, `pnpm test` 等)。
*   确保代码检查通过 (`golangci-lint run ./...`, `pnpm lint`)。

## 7. 提交你的修改

*   将你的修改添加到暂存区：
    ```bash
    git add <修改的文件>
    # 或者 git add .
    ```
*   使用遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范的提交信息进行提交：
    ```bash
    git commit -m "feat(frontend): add taint editing modal to node details"
    ```
    *   如果有多条修改，进行原子性的提交（一个提交解决一个独立的问题）。

## 8. 推送你的分支到 GitHub

*   将你的本地特性分支推送到你的 GitHub Fork 仓库：
    ```bash
    git push origin feature/describe-your-feature
    ```

## 9. 创建 Pull Request (PR)

*   打开你的 GitHub Fork 仓库页面 (`https://github.com/[你的用户名]/cilikube`)。
*   GitHub 通常会自动检测到你推送的新分支，并显示一个 "Compare & pull request" 的按钮，点击它。
*   或者，切换到你的特性分支，点击 "Pull request" 按钮。
*   **选择基准分支:** 确保 Base repository 是 `[项目组织或所有者]/cilikube`，Base branch 是 `main` (或项目的主分支)。Head repository 是你的 Fork，Compare branch 是你刚才推送的特性分支。
*   **填写 PR 信息:**
    *   **标题:** 使用清晰、简洁的标题，最好也遵循 Conventional Commits 的 subject 部分。
    *   **描述:**
        *   清晰地描述你做了什么修改。
        *   解释为什么需要这个修改（解决了什么问题？实现了什么功能？）。
        *   如果关联了某个 GitHub Issue，使用 `Closes #[Issue编号]` 或 `Fixes #[Issue编号]` 链接到它。
        *   (可选) 提供截图或 GIF 展示 UI 变更。
*   点击 "Create pull request"。

## 10. 代码审查和讨论

*   项目维护者或其他贡献者会对你的 PR 进行审查。
*   他们可能会提出问题、建议修改或请求更多信息。请及时回应审查意见。
*   如果需要修改代码，直接在你本地的特性分支上修改、提交，并再次推送到你的 Fork (`git push origin feature/describe-your-feature`)。PR 会自动更新。

## 11. 合并 PR

*   一旦你的 PR 通过审查并且所有检查（CI 测试等）都通过，项目维护者会将你的 PR 合并到主仓库的 `main` 分支。
*   恭喜！你的贡献已经成为 CiliKube 的一部分！🎉

## 12. 清理 (可选)

*   PR 合并后，你可以删除你的本地特性分支和 GitHub Fork 上的特性分支：
    ```bash
    git checkout main # 切换回 main 分支
    git pull upstream main # 确保本地 main 是最新的 (包含你的合并)
    git branch -d feature/describe-your-feature # 删除本地分支
    # 在 GitHub 你的 Fork 页面删除远程分支
    ```

感谢你的贡献！

