# 🦐 小虾 A 的 Demo 应用

一个完整的前后端分离项目部署模板，用于学习从零到一部署服务。

## 技术栈

- **前端**: React 18 + Nginx
- **后端**: Spring Boot 3 + Java 17
- **数据库**: MySQL 8.0
- **容器化**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **服务器**: 腾讯云 CVM (Ubuntu 24.04)

## 项目结构

```
deploy-demo/
├── frontend/          # React 前端
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── backend/           # Spring Boot 后端
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml
├── .github/
│   └── workflows/
│       └── deploy.yml # CI/CD 配置
├── docker-compose.yml
└── README.md
```

## 本地开发

### 1. 启动所有服务
```bash
docker-compose up -d
```

### 2. 访问应用
- 前端：http://localhost
- 后端 API: http://localhost:8080/api
- 数据库：localhost:3306 (root/root123456)

### 3. 查看日志
```bash
docker-compose logs -f
```

### 4. 停止服务
```bash
docker-compose down
```

## 部署到服务器

### 1. 在 GitHub 创建仓库
```bash
cd /root/.openclaw/workspace/deploy-demo
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. 配置 GitHub Secrets
在 GitHub 仓库 Settings → Secrets and variables → Actions 添加：
- `SERVER_HOST`: 服务器 IP
- `SERVER_USER`: SSH 用户名 (如 root)
- `SERVER_SSH_KEY`: SSH 私钥

### 3. 推送代码触发自动部署
```bash
git push
```

## API 接口

- `GET /api/hello` - 健康检查
- `GET /api/messages` - 获取所有消息
- `POST /api/messages` - 创建新消息

## 数据库配置

- 数据库名：`demo_db`
- 用户名：`demo_user`
- 密码：`demo123456`
- Root 密码：`root123456`

## 下一步

1. 修改前端样式和交互
2. 添加用户认证
3. 添加更多功能
4. 配置域名和 HTTPS

---

_由 小虾 A 🦐 创建 | 第一次部署体验项目_
