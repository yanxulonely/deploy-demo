import React, { useState } from 'react';
import { 
  Title, Text, Container, Paper, Group, Badge, 
  Timeline, Box, ThemeIcon, Stack, Card, 
  SimpleGrid, Button, Divider, List, ThemeIcon as MantineThemeIcon
} from '@mantine/core';
import { 
  IconBook, IconBrain, IconCode, IconCloud, 
  IconRobot, IconDatabase, IconExternalLink,
  IconChevronRight, IconStar, IconCurrencyDollar
} from '@tabler/icons-react';

function KnowledgePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { key: 'all', label: '全部', icon: IconBook },
    { key: 'basic', label: '入门概念', icon: IconBrain },
    { key: 'models', label: '模型详解', icon: IconRobot },
    { key: 'pricing', label: '价格对比', icon: IconCurrencyDollar },
    { key: 'coding', label: 'AI 编程', icon: IconCode },
    { key: 'local', label: '本地部署', icon: IconCloud },
    { key: 'skills', label: 'OpenClaw 技能', icon: IconDatabase },
  ];

  const knowledgeBase = [
    {
      title: '什么是 LLM 大模型？',
      category: 'basic',
      description: '了解大型语言模型的基础概念、工作原理和应用场景',
      icon: IconBrain,
      color: 'blue',
      tags: ['入门', '基础概念'],
      path: '00-AI 入门与概念/什么是 LLM 大模型.md'
    },
    {
      title: 'Claude 系列模型详解',
      category: 'models',
      description: 'Anthropic 的 Claude Haiku/Sonnet/Opus 对比与使用建议',
      icon: IconRobot,
      color: 'orange',
      tags: ['Claude', '模型对比'],
      path: '01-主流 AI 模型详解/Claude 系列.md'
    },
    {
      title: 'GPT 系列模型详解',
      category: 'models',
      description: 'OpenAI 的 GPT-4o/GPT-4 Turbo/o1 模型全解析',
      icon: IconRobot,
      color: 'green',
      tags: ['GPT', 'OpenAI'],
      path: '01-主流 AI 模型详解/GPT 系列.md'
    },
    {
      title: 'AI 模型价格对比表',
      category: 'pricing',
      description: '2026 最新主流大模型价格对比，帮你选性价比最高的',
      icon: IconCurrencyDollar,
      color: 'grape',
      tags: ['价格', '性价比', '优惠'],
      path: '02-模型能力与价格对比/价格对比表.md'
    },
    {
      title: 'AI 编程实战指南',
      category: 'coding',
      description: '用 AI 提升编程效率 10 倍，包含 Claude Code、Copilot 等工具',
      icon: IconCode,
      color: 'cyan',
      tags: ['编程', '实战', '工具'],
      path: '03-AI 编程辅助/AI 编程实战指南.md'
    },
    {
      title: 'Ollama 本地部署完全指南',
      category: 'local',
      description: '在本地运行开源大模型，免费、隐私、无限制',
      icon: IconCloud,
      color: 'teal',
      tags: ['Ollama', '本地部署', '开源'],
      path: '04-本地模型部署/Ollama 完全指南.md'
    },
    {
      title: 'OpenClaw 技能目录',
      category: 'skills',
      description: '已安装技能清单与使用说明，包含 5 个核心技能',
      icon: IconDatabase,
      color: 'pink',
      tags: ['OpenClaw', '技能', '工具'],
      path: '05-OpenClaw 技能库/技能目录.md'
    },
    {
      title: '实战项目合集',
      category: 'skills',
      description: '学完就练，实战提升，包含天气监控、AI 知识库等项目',
      icon: IconCode,
      color: 'red',
      tags: ['项目', '实战', '案例'],
      path: '06-实战项目/README.md'
    },
    {
      title: 'AI 学习资源索引',
      category: 'basic',
      description: '精选学习资源，从小白到专家，包含文档、课程、社区',
      icon: IconBook,
      color: 'indigo',
      tags: ['资源', '学习', '教程'],
      path: '99-资源与工具/学习资源索引.md'
    },
  ];

  const installedSkills = [
    { name: 'ai-learning-journal', version: '1.0.1', desc: 'AI 学习记录', status: '✅' },
    { name: 'ollama-local', version: '1.1.0', desc: '本地模型管理', status: '✅' },
    { name: 'llm-models', version: '0.1.5', desc: '多模型访问', status: '✅' },
    { name: 'local-first-llm', version: '1.0.0', desc: '本地优先路由', status: '✅' },
    { name: 'coding-sessions', version: '1.0.0', desc: 'AI 编程会话', status: '✅' },
  ];

  const filteredKnowledge = selectedCategory === 'all' 
    ? knowledgeBase 
    : knowledgeBase.filter(item => item.category === selectedCategory);

  return (
    <div>
      {/* Header */}
      <Group mb="xl" justify="space-between" align="flex-start">
        <div>
          <Group gap="xs" mb="xs">
            <ThemeIcon size="lg" radius="md" color="grape" variant="gradient">
              <IconBook size={24} />
            </ThemeIcon>
            <Title order={2}>AI 知识宇宙 🌌</Title>
          </Group>
          <Text c="dimmed" size="lg">
            从入门到精通，你的 AI 学习指南
          </Text>
        </div>
        <Badge size="lg" color="grape" variant="light">
          v1.0
        </Badge>
      </Group>

      {/* Stats */}
      <SimpleGrid cols={4} mb="xl" breakpoints={[{ maxWidth: 'sm', cols: 2 }]}>
        <Paper p="md" radius="md" withBorder>
          <Group gap="sm">
            <ThemeIcon size="lg" color="blue" variant="light">
              <IconBook size={20} />
            </ThemeIcon>
            <div>
              <Text size="xs" c="dimmed">文档数量</Text>
              <Text size="xl" fw={700}>11 篇</Text>
            </div>
          </Group>
        </Paper>
        <Paper p="md" radius="md" withBorder>
          <Group gap="sm">
            <ThemeIcon size="lg" color="green" variant="light">
              <IconDatabase size={20} />
            </ThemeIcon>
            <div>
              <Text size="xs" c="dimmed">已安装技能</Text>
              <Text size="xl" fw={700}>5 个</Text>
            </div>
          </Group>
        </Paper>
        <Paper p="md" radius="md" withBorder>
          <Group gap="sm">
            <ThemeIcon size="lg" color="orange" variant="light">
              <IconBrain size={20} />
            </ThemeIcon>
            <div>
              <Text size="xs" c="dimmed">知识分类</Text>
              <Text size="xl" fw={700}>8 个</Text>
            </div>
          </Group>
        </Paper>
        <Paper p="md" radius="md" withBorder>
          <Group gap="sm">
            <ThemeIcon size="lg" color="red" variant="light">
              <IconCode size={20} />
            </ThemeIcon>
            <div>
              <Text size="xs" c="dimmed">实战项目</Text>
              <Text size="xl" fw={700}>5 个</Text>
            </div>
          </Group>
        </Paper>
      </SimpleGrid>

      {/* Category Filter */}
      <Group mb="lg" wrap="wrap">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Button
              key={cat.key}
              variant={selectedCategory === cat.key ? 'filled' : 'outline'}
              color={selectedCategory === cat.key ? 'grape' : 'gray'}
              leftSection={<Icon size={16} />}
              onClick={() => setSelectedCategory(cat.key)}
              size="sm"
            >
              {cat.label}
            </Button>
          );
        })}
      </Group>

      {/* Knowledge Cards */}
      <SimpleGrid cols={3} mb="xl" breakpoints={[{ maxWidth: 'lg', cols: 2 }, { maxWidth: 'sm', cols: 1 }]}>
        {filteredKnowledge.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card 
              key={index} 
              padding="lg" 
              radius="md" 
              withBorder
              style={{ cursor: 'pointer' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Group justify="space-between" mb="md">
                <ThemeIcon size="lg" radius="md" color={item.color} variant="light">
                  <Icon size={20} />
                </ThemeIcon>
                <Group gap="xs">
                  {item.tags.map((tag, i) => (
                    <Badge key={i} size="sm" variant="light" color={item.color}>
                      {tag}
                    </Badge>
                  ))}
                </Group>
              </Group>
              
              <Text fw={600} mb="xs" size="lg">{item.title}</Text>
              <Text c="dimmed" size="sm" mb="md">{item.description}</Text>
              
              <Button 
                variant="subtle" 
                color={item.color} 
                size="compact-sm"
                rightSection={<IconChevronRight size={14} />}
                fullWidth
              >
                查看详情
              </Button>
            </Card>
          );
        })}
      </SimpleGrid>

      {/* Installed Skills */}
      <Title order={3} mb="md">📦 已安装技能</Title>
      <Paper p="md" radius="md" withBorder mb="xl">
        <SimpleGrid cols={5} breakpoints={[{ maxWidth: 'lg', cols: 3 }, { maxWidth: 'sm', cols: 1 }]}>
          {installedSkills.map((skill, index) => (
            <Box key={index} p="sm">
              <Group gap="xs" mb="xs">
                <Text size="xl">{skill.status}</Text>
                <Text fw={600} size="sm">{skill.name}</Text>
              </Group>
              <Text size="xs" c="dimmed">v{skill.version}</Text>
              <Text size="xs" c="dimmed">{skill.desc}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Paper>

      {/* Learning Path */}
      <Title order={3} mb="md">🗺️ 学习路径建议</Title>
      <Paper p="md" radius="md" withBorder>
        <Timeline 
          active={2} 
          bulletSize={24} 
          lineWidth={2}
          color="grape"
        >
          <Timeline.Item 
            title="第 1 站：AI 入门" 
            bullet={<IconBrain size={16} />}
          >
            <Text size="sm" c="dimmed" mt={4}>
              了解 LLM 基础概念，体验主流 AI 助手
            </Text>
            <List size="sm" mt="xs">
              <List.Item>阅读《什么是 LLM 大模型》</List.Item>
              <List.Item>尝试和 AI 对话</List.Item>
              <List.Item>记录学习心得到日记</List.Item>
            </List>
          </Timeline.Item>
          
          <Timeline.Item 
            title="第 2 站：了解主流模型" 
            bullet={<IconRobot size={16} />}
          >
            <Text size="sm" c="dimmed" mt={4}>
              学习 Claude、GPT、Gemini 等模型特点
            </Text>
            <List size="sm" mt="xs">
              <List.Item>Claude 系列详解</List.Item>
              <List.Item>GPT 系列详解</List.Item>
              <List.Item>查看价格对比表</List.Item>
            </List>
          </Timeline.Item>
          
          <Timeline.Item 
            title="第 3 站：开始实战" 
            bullet={<IconCode size={16} />}
          >
            <Text size="sm" c="dimmed" mt={4}>
              学习 AI 编程和本地部署
            </Text>
            <List size="sm" mt="xs">
              <List.Item>AI 编程实战指南</List.Item>
              <List.Item>Ollama 本地部署</List.Item>
              <List.Item>尝试实战项目</List.Item>
            </List>
          </Timeline.Item>
          
          <Timeline.Item 
            title="第 4 站：持续学习" 
            bullet={<IconBook size={16} />}
            bulletColor="gray"
          >
            <Text size="sm" c="dimmed" mt={4}>
              深入学习高级主题
            </Text>
            <List size="sm" mt="xs">
              <List.Item>访问学习资源索引</List.Item>
              <List.Item>参与社区讨论</List.Item>
              <List.Item>贡献知识和项目</List.Item>
            </List>
          </Timeline.Item>
        </Timeline>
      </Paper>

      {/* Quick Actions */}
      <Group mt="xl" justify="center">
        <Button 
          variant="gradient" 
          gradient={{ from: 'grape', to: 'pink' }}
          leftSection={<IconExternalLink size={18} />}
        >
          访问完整知识库
        </Button>
        <Button 
          variant="outline" 
          color="grape"
          leftSection={<IconBook size={18} />}
        >
          记录学习笔记
        </Button>
      </Group>
    </div>
  );
}

export default KnowledgePage;
