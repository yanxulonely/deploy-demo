# 🦐 小虾工具箱

> 一个功能丰富的 Web 应用，包含今天吃啥、留言板、AI 知识库等功能

[![Deploy](https://github.com/yanxu/deploy-demo/actions/workflows/deploy.yml/badge.svg)](https://github.com/yanxu/deploy-demo/actions/workflows/deploy.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🌟 功能特性

### 已上线功能
- 🍜 **今天吃啥** - 帮你解决每天的选择困难症
- 💬 **留言板** - 记录想法，留言互动
- 📚 **AI 知识库** - 从入门到精通的 AI 学习指南（NEW! ✨）

### 技术栈

| 层级 | 技术 |
|------|------|
| **前端** | React 18 + Mantine UI + Nginx |
| **后端** | Spring Boot 3 + Java 17 |
| **数据库** | MySQL 8.0 |
| **容器化** | Docker + Docker Compose |
| **CI/CD** | GitHub Actions |
| **服务器** | 腾讯云 CVM (Ubuntu 24.04) |

---

## 🚀 快速开始

### 方式一：一键部署（推荐）

```bash
# 克隆项目
cd /root/.openclaw/workspace/deploy-demo

# 执行部署脚本
./deploy.sh deploy
```

### 方式二：Docker Compose

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 方式三：本地开发

#### 前端
```bash
cd frontend
npm install
npm start
```

#### 后端
```bash
cd backend
mvn spring-boot:run
```

---

## 📦 部署说明

### 本地访问
- 前端：http://localhost
- 后端 API: http://localhost:8080/api
- 数据库：localhost:3306 (root/root123456)

### 服务器部署
- 访问地址：http://你的服务器 IP
- API 地址：http://你的服务器 IP:8080/api

---

## 🔄 CI/CD 自动部署

### 配置步骤

#### 1️⃣ 在 GitHub 创建仓库
```bash
cd /root/.openclaw/workspace/deploy-demo
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

#### 2️⃣ 配置 GitHub Secrets
在 GitHub 仓库 **Settings → Secrets and variables → Actions** 添加：

| Secret 名称 | 说明 | 示例 |
|------------|------|------|
| `SERVER_HOST` | 服务器 IP | `123.123.123.123` |
| `SERVER_USER` | SSH 用户名 | `root` |
| `SERVER_SSH_KEY` | SSH 私钥 | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `SERVER_PORT` | SSH 端口（可选） | `22` |
| `DOCKER_USERNAME` | Docker Hub 用户名（可选） | `yourname` |
| `DOCKER_PASSWORD` | Docker Hub 密码（可选） | `yourpassword` |

#### 3️⃣ 推送代码触发自动部署
```bash
git add .
git commit -m "feat: 添加新功能"
git push
```

### 部署流程

```mermaid
graph LR
    A[推送代码] --> B[GitHub Actions]
    B --> C[代码检查]
    C --> D[构建镜像]
    D --> E[SSH 部署]
    E --> F[服务重启]
    F --> G[完成]
```

### 工作流程

1. **代码推送** → 触发 GitHub Actions
2. **代码检查** → 前端构建验证
3. **构建镜像** → Docker 镜像缓存优化
4. **SSH 部署** → 自动拉取代码、重建容器
5. **服务重启** → 零停机更新
6. **日志查看** → 实时监控状态

---

## 🛠️ 常用命令

### 部署脚本
```bash
./deploy.sh deploy      # 完整部署
./deploy.sh start       # 启动服务
./deploy.sh stop        # 停止服务
./deploy.sh restart     # 重启服务
./deploy.sh build       # 构建镜像
./deploy.sh logs        # 查看日志
./deploy.sh status      # 查看状态
./deploy.sh clean       # 清理镜像
```

### Docker 命令
```bash
docker-compose up -d              # 启动服务
docker-compose down               # 停止服务
docker-compose ps                 # 查看状态
docker-compose logs -f            # 查看日志
docker-compose build              # 构建镜像
docker-compose restart            # 重启服务
docker image prune -f             # 清理镜像
```

### Git 命令
```bash
git status                        # 查看状态
git add .                         # 添加文件
git commit -m "message"           # 提交代码
git push                          # 推送代码
git pull origin main              # 拉取代码
```

---

## 📊 项目结构

```
deploy-demo/
├── frontend/               # React 前端
│   ├── src/
│   │   ├── App.js         # 主应用组件
│   │   ├── index.js       # 入口文件
│   │   └── pages/         # 页面组件
│   │       ├── FoodPage.js
│   │       ├── MessagesPage.js
│   │       └── KnowledgePage.js  # AI 知识库（NEW!）
│   ├── public/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── backend/               # Spring Boot 后端
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml
├── .github/
│   └── workflows/
│       └── deploy.yml     # CI/CD 配置
├── docker-compose.yml     # Docker 编排
├── deploy.sh              # 部署脚本
└── README.md
```

---

## 🗄️ 数据库配置

| 配置项 | 值 |
|--------|-----|
| 数据库名 | `demo_db` |
| 用户名 | `demo_user` |
| 密码 | `demo123456` |
| Root 密码 | `root123456` |
| 端口 | `3306` |

---

## 🔌 API 接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/hello` | GET | 健康检查 |
| `/api/messages` | GET | 获取所有消息 |
| `/api/messages` | POST | 创建新消息 |

---

## 🎯 下一步计划

- [ ] 添加用户认证系统
- [ ] 增加更多实用工具
- [ ] 优化移动端体验
- [ ] 添加数据统计分析
- [ ] 支持自定义主题
- [ ] 集成更多 AI 功能

---

## 📝 更新日志

### v1.1.0 (2026-03-12)
- ✨ 新增 AI 知识库页面
- 🚀 增强 CI/CD 自动部署
- 📦 添加一键部署脚本
- 🎨 优化 UI 交互体验

### v1.0.0 (2026-03-10)
- 🎉 初始版本发布
- 🍜 今天吃啥功能
- 💬 留言板功能

---

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 开源协议

MIT License

---

## 🙏 致谢

- [React](https://react.dev/)
- [Mantine UI](https://mantine.dev/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Tabler Icons](https://tabler.io/icons)

---

_由 小虾 A 🦐 创建 | 让部署变得更简单_
