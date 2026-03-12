#!/bin/bash

# 🦐 小虾工具箱 - 快速部署脚本
# 用于本地测试和手动部署

set -e

echo "🚀 小虾工具箱 - 部署脚本"
echo "========================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查 Docker
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker 未安装，请先安装 Docker${NC}"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}❌ Docker Compose 未安装，请先安装${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Docker 环境检查通过${NC}"
}

# 停止服务
stop_services() {
    echo -e "${YELLOW}🛑 停止旧容器...${NC}"
    docker-compose down
}

# 构建服务
build_services() {
    echo -e "${YELLOW}🏗️ 构建容器镜像...${NC}"
    docker-compose build
}

# 启动服务
start_services() {
    echo -e "${YELLOW}🚀 启动服务...${NC}"
    docker-compose up -d
}

# 查看状态
check_status() {
    echo ""
    echo -e "${GREEN}✅ 服务状态:${NC}"
    docker-compose ps
}

# 查看日志
view_logs() {
    echo ""
    echo -e "${YELLOW}📊 最近日志:${NC}"
    docker-compose logs --tail=20
}

# 主函数
main() {
    case "${1:-deploy}" in
        deploy)
            echo "执行完整部署流程..."
            check_docker
            stop_services
            build_services
            start_services
            check_status
            view_logs
            echo ""
            echo -e "${GREEN}🎉 部署完成！${NC}"
            echo "访问地址：http://localhost"
            ;;
        start)
            check_docker
            start_services
            check_status
            ;;
        stop)
            check_docker
            stop_services
            ;;
        restart)
            check_docker
            stop_services
            start_services
            check_status
            ;;
        build)
            check_docker
            build_services
            ;;
        logs)
            docker-compose logs -f
            ;;
        status)
            check_docker
            check_status
            ;;
        clean)
            echo -e "${YELLOW}🧹 清理未使用的镜像...${NC}"
            docker image prune -f
            echo -e "${GREEN}✅ 清理完成${NC}"
            ;;
        *)
            echo "用法：$0 {deploy|start|stop|restart|build|logs|status|clean}"
            echo ""
            echo "命令说明:"
            echo "  deploy   - 完整部署（停止 + 构建 + 启动）"
            echo "  start    - 启动服务"
            echo "  stop     - 停止服务"
            echo "  restart  - 重启服务"
            echo "  build    - 构建镜像"
            echo "  logs     - 查看日志"
            echo "  status   - 查看状态"
            echo "  clean    - 清理镜像"
            exit 1
            ;;
    esac
}

main "$@"
