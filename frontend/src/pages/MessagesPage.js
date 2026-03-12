import React, { useState, useEffect } from 'react';
import {
  Card,
  Title,
  Text,
  TextInput,
  Button,
  Stack,
  Group,
  Avatar,
  Divider,
  Container,
  rem,
} from '@mantine/core';
import { IconSend, IconMessageCircle2 } from '@tabler/icons-react';
import axios from 'axios';

function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    axios.get('/api/messages')
      .then(res => setMessages(res.data))
      .catch(err => console.error('获取消息失败:', err));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!content.trim() || !author.trim()) return;

    axios.post('/api/messages', { content, author })
      .then(() => {
        setContent('');
        fetchMessages();
      })
      .catch(err => console.error('发送失败:', err));
  };

  const getAvatarColor = (name) => {
    const colors = ['indigo', 'teal', 'orange', 'pink', 'blue', 'green'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <Container size="md">
      <Stack gap="xl">
        <Card radius="md" padding="lg" withBorder>
          <Title order={3} mb="md">
            <Group gap="sm">
              <IconMessageCircle2 style={{ width: rem(28), height: rem(28) }} />
              留言板
            </Group>
          </Title>
          <form onSubmit={sendMessage}>
            <Stack gap="sm">
              <TextInput
                label="你的名字"
                placeholder="留个名字吧"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                withAsterisk
              />
              <TextInput
                label="说点什么"
                placeholder="写下你想说的话..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                withAsterisk
              />
              <Group justify="flex-end">
                <Button
                  type="submit"
                  color="indigo"
                  leftSection={<IconSend style={{ width: rem(18), height: rem(18) }} />}
                >
                  发送
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>

        <Card radius="md" padding="lg" withBorder>
          <Title order={4} mb="md">
            消息列表 ({messages.length})
          </Title>
          
          {messages.length === 0 ? (
            <Text c="dimmed" ta="center" py="xl">
              还没有消息，快来发第一条吧！
            </Text>
          ) : (
            <Stack gap="md">
              {messages.map((msg, index) => (
                <div key={msg.id}>
                  {index > 0 && <Divider />}
                  <Group wrap="nowrap" gap="sm" py="xs">
                    <Avatar color={getAvatarColor(msg.author)} radius="xl">
                      {msg.author?.[0]?.toUpperCase() || '?'}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <Group gap="xs" mb={4}>
                        <Text fw={600} size="sm">{msg.author}</Text>
                      </Group>
                      <Text size="md">{msg.content}</Text>
                    </div>
                  </Group>
                </div>
              ))}
            </Stack>
          )}
        </Card>
      </Stack>
    </Container>
  );
}

export default MessagesPage;
