import React, { useState, useEffect } from 'react';
import { 
  Title, Text, Container, Paper, Group, Badge, 
  Timeline, Box, ThemeIcon, Stack, Card, 
  SimpleGrid, Button, Divider, List, Modal, ScrollArea, Code,
  Anchor, Drawer, Table, Blockquote, Mark
} from '@mantine/core';
import { 
  IconBook, IconBrain, IconCode, IconCloud, 
  IconRobot, IconDatabase, IconExternalLink,
  IconChevronRight, IconCurrencyDollar, IconQuote
} from '@tabler/icons-react';

function KnowledgePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openedModal, setOpenedModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [documents, setDocuments] = useState([]);

  // 加载文档数据
  useEffect(() => {
    fetch('/data/documents.json')
      .then(res => res.json())
      .then(data => setDocuments(data.documents))
      .catch(err => console.error('加载文档失败:', err));
  }, []);

  const categories = [
    { key: 'all', label: '全部', icon: IconBook },
    { key: 'basic', label: '入门概念', icon: IconBrain },
    { key: 'models', label: '模型详解', icon: IconRobot },
    { key: 'pricing', label: '价格对比', icon: IconCurrencyDollar },
    { key: 'coding', label: 'AI 编程', icon: IconCode },
    { key: 'local', label: '本地部署', icon: IconCloud },
    { key: 'skills', label: 'OpenClaw 技能', icon: IconDatabase },
  ];

  const iconMap = {
    brain: IconBrain,
    robot: IconRobot,
    'currency-dollar': IconCurrencyDollar,
    code: IconCode,
    cloud: IconCloud,
    database: IconDatabase,
    book: IconBook,
  };

  const filteredKnowledge = selectedCategory === 'all' 
    ? documents
    : documents.filter(item => item.category === selectedCategory);

  const handleViewDetail = (doc) => {
    setSelectedDoc(doc);
    setOpenedModal(true);
  };

  // 增强的 Markdown 渲染
  const renderMarkdown = (content) => {
    const lines = content.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBlockContent = [];
    let listItems = [];
    let tableRows = [];
    let inTable = false;
    
    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <List key={`list-${elements.length}`} mb="md">
            {listItems.map((item, i) => (
              <List.Item key={i} mb="xs">{item}</List.Item>
            ))}
          </List>
        );
        listItems = [];
      }
    };
    
    const flushTable = () => {
      if (tableRows.length > 1) {
        const headers = tableRows[0];
        const data = tableRows.slice(2); // 跳过分隔行
        elements.push(
          <Table key={`table-${elements.length}`} striped highlightOnHover withTableBorder mb="md">
            <Table.Thead>
              <Table.Tr>
                {headers.map((h, i) => (
                  <Table.Th key={i}>{h}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((row, i) => (
                <Table.Tr key={i}>
                  {row.map((cell, j) => (
                    <Table.Td key={j}>{cell}</Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        );
        tableRows = [];
        inTable = false;
      }
    };
    
    // 处理行内样式
    const processInline = (text) => {
      // 加粗 **text**
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // 斜体 *text*
      text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
      // 行内代码 `code`
      text = text.replace(/`(.*?)`/g, '<code style="background: #f1f3f5; padding: 2px 6px; border-radius: 3px;">$1</code>');
      // 链接 [text](url)
      text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      return text;
    };
    
    lines.forEach((line, index) => {
      // 代码块
      if (line.startsWith('```')) {
        flushList();
        flushTable();
        if (inCodeBlock) {
          elements.push(
            <Code key={index} block mb="md">
              {codeBlockContent.join('\n')}
            </Code>
          );
          codeBlockContent = [];
        }
        inCodeBlock = !inCodeBlock;
        return;
      }
      
      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }
      
      // 表格检测
      if (line.includes('|') && line.trim().startsWith('|')) {
        flushList();
        inTable = true;
        const cells = line.split('|').map(c => c.trim()).filter(c => c);
        // 跳过分隔行 (|---|---|)
        if (!cells.every(c => c.match(/^[-:|]+$/))) {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        flushTable();
      }
      
      // 标题
      if (line.startsWith('# ')) {
        flushList();
        elements.push(<Title key={index} order={1} mt="xl" mb="md" dangerouslySetInnerHTML={{__html: processInline(line.replace('# ', ''))}} />);
        return;
      }
      if (line.startsWith('## ')) {
        flushList();
        elements.push(<Title key={index} order={2} mt="xl" mb="md" dangerouslySetInnerHTML={{__html: processInline(line.replace('## ', ''))}} />);
        return;
      }
      if (line.startsWith('### ')) {
        flushList();
        elements.push(<Title key={index} order={3} mt="lg" mb="md" dangerouslySetInnerHTML={{__html: processInline(line.replace('### ', ''))}} />);
        return;
      }
      // 引用
      if (line.startsWith('> ')) {
        flushList();
        elements.push(
          <Blockquote key={index} icon={<IconQuote />} mb="md">
            <Text dangerouslySetInnerHTML={{__html: processInline(line.replace('> ', ''))}} />
          </Blockquote>
        );
        return;
      }
      // 列表
      if (line.startsWith('- ') || line.startsWith('* ')) {
        listItems.push(processInline(line.replace(/^[*-] /, '')));
        return;
      }
      // 分割线
      if (line.startsWith('---')) {
        flushList();
        elements.push(<Divider key={index} my="md" />);
        return;
      }
      // 空行
      if (line.trim() === '') {
        flushList();
        elements.push(<br key={index} />);
        return;
      }
      // 普通文本
      flushList();
      elements.push(<Text key={index} mb="xs" dangerouslySetInnerHTML={{__html: processInline(line)}} />);
    });
    
    flushList();
    flushTable();
    if (inCodeBlock && codeBlockContent.length > 0) {
      elements.push(
        <Code block mb="md">
          {codeBlockContent.join('\n')}
        </Code>
      );
    }
    return elements;
  };

  const installedSkills = [
    { name: 'ai-learning-journal', version: '1.0.1', desc: 'AI 学习记录', status: '✅' },
    { name: 'ollama-local', version: '1.1.0', desc: '本地模型管理', status: '✅' },
    { name: 'llm-models', version: '0.1.5', desc: '多模型访问', status: '✅' },
    { name: 'local-first-llm', version: '1.0.0', desc: '本地优先路由', status: '✅' },
    { name: 'coding-sessions', version: '1.0.0', desc: 'AI 编程会话', status: '✅' },
  ];

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
              <Text size="xl" fw={700}>{documents.length}篇</Text>
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
              <Text size="xl" fw={700}>7 个</Text>
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
          const Icon = iconMap[item.icon] || IconBook;
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
                onClick={() => handleViewDetail(item)}
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
          onClick={() => window.open('https://docs.openclaw.ai', '_blank')}
        >
          访问官方文档
        </Button>
        <Button 
          variant="outline" 
          color="grape"
          leftSection={<IconBook size={18} />}
        >
          记录学习笔记
        </Button>
      </Group>

      {/* 文档详情弹窗 - 全屏 Drawer */}
      <Drawer
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        title={
          <Group gap="xs">
            {selectedDoc && (
              <ThemeIcon size="md" radius="md" color={selectedDoc.color} variant="light">
                {(() => {
                  const Icon = iconMap[selectedDoc.icon] || IconBook;
                  return <Icon size={18} />;
                })()}
              </ThemeIcon>
            )}
            <Title order={3}>{selectedDoc?.title}</Title>
          </Group>
        }
        size="100%"
        position="right"
        styles={{
          body: {
            padding: 0,
          },
          header: {
            padding: 'var(--mantine-spacing-md)',
            borderBottom: '1px solid var(--mantine-color-gray-3)',
          },
        }}
      >
        {selectedDoc && (
          <ScrollArea.Autosize mah="100vh" type="auto">
            <Container size="md" py="xl" px="lg">
              <Stack gap="md">
                {/* 标签 */}
                <Group gap="xs">
                  {selectedDoc.tags.map((tag, i) => (
                    <Badge key={i} variant="light" color={selectedDoc.color} size="lg">
                      {tag}
                    </Badge>
                  ))}
                </Group>
                
                <Divider my="md" />
                
                {/* 文档内容 */}
                <Box style={{ 
                  fontSize: '16px',
                  lineHeight: '1.8',
                }}>
                  {renderMarkdown(selectedDoc.content)}
                </Box>
                
                <Divider my="xl" />
                
                {/* 底部提示 */}
                <Paper p="lg" radius="md" withBorder bg="gray.0">
                  <Group gap="sm" mb="xs">
                    <ThemeIcon size="sm" variant="light" color="blue">
                      <IconBook size={16} />
                    </ThemeIcon>
                    <Text fw={600}>💡 提示</Text>
                  </Group>
                  <Text size="sm" c="dimmed">
                    文档内容已集成到前端项目中，支持 Markdown 格式渲染。
                  </Text>
                </Paper>

                {/* 操作按钮 */}
                <Group justify="space-between" mt="xl">
                  <Button 
                    variant="outline" 
                    color="gray"
                    size="lg"
                    onClick={() => setOpenedModal(false)}
                  >
                    关闭
                  </Button>
                  <Group gap="xs">
                    <Button 
                      variant="outline" 
                      color={selectedDoc.color}
                      size="lg"
                      leftSection={<IconExternalLink size={16} />}
                      component="a"
                      href={`https://github.com/openclaw/openclaw`}
                      target="_blank"
                    >
                      更多资源
                    </Button>
                  </Group>
                </Group>
              </Stack>
            </Container>
          </ScrollArea.Autosize>
        )}
      </Drawer>
    </div>
  );
}

export default KnowledgePage;
