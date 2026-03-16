import React, { useState, useEffect } from 'react';
import { AppShell, Burger, Group, Title, Text, Container, ActionIcon, Badge, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHome2, IconBowl, IconMessageCircle2, IconSettings, IconBook, IconCurrencyDollar } from '@tabler/icons-react';
import axios from 'axios';
import FoodPage from './pages/FoodPage';
import MessagesPage from './pages/MessagesPage';
import KnowledgePage from './pages/KnowledgePage';
import PriceComparePage from './pages/PriceComparePage';

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [activeTab, setActiveTab] = useState('food');
  const [backendStatus, setBackendStatus] = useState('检查中...');

  useEffect(() => {
    axios.get('/api/hello')
      .then(res => setBackendStatus('✅ ' + res.data))
      .catch(() => setBackendStatus('❌ 未连接'));
  }, []);

  const menuItems = [
    { key: 'food', label: '今天吃啥', icon: IconBowl, color: 'orange' },
    { key: 'price-compare', label: '比价助手', icon: IconCurrencyDollar, color: 'green' },
    { key: 'messages', label: '留言板', icon: IconMessageCircle2, color: 'blue' },
    { key: 'knowledge', label: 'AI 知识库', icon: IconBook, color: 'grape' },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 240,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      styles={(theme) => ({
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group gap="xs">
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                🦐
              </div>
              <div>
                <Title order={4} size="h5" style={{ marginBottom: -2 }}>小虾工具箱</Title>
                <Text size="xs" c="dimmed">{backendStatus}</Text>
              </div>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb="xs">功能菜单</Text>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 8,
                cursor: 'pointer',
                marginBottom: 4,
                backgroundColor: activeTab === item.key 
                  ? 'var(--mantine-color-primary-light)' 
                  : 'transparent',
                color: activeTab === item.key 
                  ? 'var(--mantine-color-primary-text)' 
                  : 'var(--mantine-color-text)',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.key) {
                  e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.key) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon style={{ width: rem(20), height: rem(20) }} />
              <Text fw={500}>{item.label}</Text>
            </div>
          );
        })}
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="xl">
          {activeTab === 'food' && <FoodPage />}
          {activeTab === 'price-compare' && <PriceComparePage />}
          {activeTab === 'messages' && <MessagesPage />}
          {activeTab === 'knowledge' && <KnowledgePage />}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
