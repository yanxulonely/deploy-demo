import React, { useState, useEffect } from 'react';
import {
  Card,
  Title,
  Text,
  Button,
  Select,
  TextInput,
  Group,
  Stack,
  Modal,
  Badge,
  ActionIcon,
  SimpleGrid,
  Container,
  rem,
  Divider,
  Switch,
} from '@mantine/core';
import { useDisclosure, useInputState } from '@mantine/hooks';
import {
  IconDice,
  IconPlus,
  IconEdit,
  IconTrash,
  IconCheck,
  IconRefresh,
} from '@tabler/icons-react';
import axios from 'axios';

function FoodPage() {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [category, setCategory] = useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const [editingFood, setEditingFood] = useState(null);
  
  const [name, setName] = useInputState('');
  const [foodCategory, setFoodCategory] = useState('lunch');
  const [tags, setTags] = useInputState('');
  const [enabled, setEnabled] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = () => {
    axios.get('/api/foods/enabled')
      .then(res => setFoods(res.data))
      .catch(err => console.error('获取菜品失败:', err));
  };

  const getRandomFood = () => {
    if (foods.length === 0) {
      alert('还没有添加菜品哦，先去加几个吧！');
      return;
    }

    setIsSpinning(true);
    setSelectedFood(null);

    setTimeout(() => {
      const url = category 
        ? `/api/foods/random?category=${category}`
        : '/api/foods/random';
      
      axios.get(url)
        .then(res => {
          setSelectedFood(res.data);
          setIsSpinning(false);
        })
        .catch(err => {
          console.error('随机失败:', err);
          setIsSpinning(false);
        });
    }, 800);
  };

  const markAsEaten = (food) => {
    axios.post(`/api/foods/${food.id}/eat`)
      .then(() => {
        alert(`好嘞！就决定是「${food.name}」了！`);
        setSelectedFood(null);
        fetchFoods();
      })
      .catch(err => console.error('标记失败:', err));
  };

  const openAddModal = () => {
    setEditingFood(null);
    setName('');
    setFoodCategory('lunch');
    setTags('');
    setEnabled(true);
    open();
  };

  const openEditModal = (food) => {
    setEditingFood(food);
    setName(food.name);
    setFoodCategory(food.category);
    setTags(food.tags || '');
    setEnabled(food.enabled);
    open();
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('菜名不能为空哦！');
      return;
    }

    const foodData = {
      name,
      category: foodCategory,
      tags,
      enabled,
    };

    if (editingFood) {
      axios.put(`/api/foods/${editingFood.id}`, foodData)
        .then(() => {
          close();
          fetchFoods();
        })
        .catch(err => console.error('更新失败:', err));
    } else {
      axios.post('/api/foods', foodData)
        .then(() => {
          close();
          fetchFoods();
        })
        .catch(err => console.error('添加失败:', err));
    }
  };

  const deleteFood = (id) => {
    if (confirm('确定要删除这个菜品吗？')) {
      axios.delete(`/api/foods/${id}`)
        .then(() => fetchFoods())
        .catch(err => console.error('删除失败:', err));
    }
  };

  const getCategoryIcon = (cat) => {
    // 用简单的 emoji 代替图标
    return null;
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'breakfast': return '早餐';
      case 'lunch': return '午餐';
      case 'dinner': return '晚餐';
      case 'snack': return '小吃';
      default: return cat;
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'breakfast': return 'yellow';
      case 'lunch': return 'green';
      case 'dinner': return 'indigo';
      case 'snack': return 'pink';
      default: return 'gray';
    }
  };

  return (
    <Container size="xl">
      <Stack gap="xl">
        {/* 随机推荐区域 */}
        <Card
          radius="lg"
          padding="xl"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <Stack align="center" gap="lg">
            {selectedFood ? (
              <>
                <Text size="xl" c="white" fw={700}>今天吃</Text>
                <Title order={1} c="white" style={{ fontSize: '3rem' }}>
                  {selectedFood.name}
                </Title>
                <Group gap="sm">
                  <Badge
                    color={getCategoryColor(selectedFood.category)}
                    size="lg"
                  >
                    {getCategoryLabel(selectedFood.category)}
                  </Badge>
                  {selectedFood.tags && (
                    <Badge color="white" variant="outline" size="lg">
                      {selectedFood.tags}
                    </Badge>
                  )}
                </Group>
                <Group gap="md" mt="md">
                  <Button
                    size="lg"
                    color="teal"
                    leftSection={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
                    onClick={() => markAsEaten(selectedFood)}
                  >
                    就它了！
                  </Button>
                  <Button
                    size="lg"
                    variant="white"
                    color="gray"
                    leftSection={<IconRefresh style={{ width: rem(20), height: rem(20) }} />}
                    onClick={getRandomFood}
                  >
                    再换一个
                  </Button>
                </Group>
              </>
            ) : (
              <>
                <div
                  style={{
                    fontSize: '4rem',
                    animation: isSpinning ? 'spin 0.5s linear infinite' : 'none',
                  }}
                >
                  🎲
                </div>
                <Title order={2} c="white">今天吃什么？</Title>
                <Text c="rgba(255,255,255,0.8)" size="lg">
                  让我帮你决定吧！
                </Text>
                <Group gap="md" mt="sm">
                  <Select
                    placeholder="选择分类（可选）"
                    data={[
                      { value: '', label: '不限制' },
                      { value: 'breakfast', label: '🌅 早餐' },
                      { value: 'lunch', label: '☀️ 午餐' },
                      { value: 'dinner', label: '🌙 晚餐' },
                      { value: 'snack', label: '🍟 小吃' },
                    ]}
                    value={category}
                    onChange={setCategory}
                    w={200}
                    variant="filled"
                    styles={{
                      input: {
                        background: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        border: 'none',
                        '&::placeholder': { color: 'rgba(255,255,255,0.7)' },
                      },
                    }}
                  />
                  <Button
                    size="xl"
                    variant="white"
                    color="indigo"
                    leftSection={<IconDice style={{ width: rem(24), height: rem(24) }} />}
                    onClick={getRandomFood}
                    loading={isSpinning}
                    disabled={foods.length === 0}
                  >
                    帮我选！
                  </Button>
                </Group>
              </>
            )}
          </Stack>
        </Card>

        <Group justify="space-between" mt="md">
          <Title order={3}>我的菜单库 ({foods.length})</Title>
          <Button
            leftSection={<IconPlus style={{ width: rem(18), height: rem(18) }} />}
            onClick={openAddModal}
            color="indigo"
          >
            添加菜品
          </Button>
        </Group>

        {foods.length === 0 ? (
          <Card radius="md" padding="xl" style={{ textAlign: 'center' }}>
            <Text size="xl" c="dimmed">还没有菜品，快去添加第一个吧！</Text>
          </Card>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
            {foods.map((food) => (
              <Card
                key={food.id}
                radius="md"
                padding="lg"
                withBorder
                style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Group justify="space-between" align="flex-start">
                  <Stack gap="xs">
                    <Text fw={700} size="lg">{food.name}</Text>
                    <Group gap="xs">
                      <Badge
                        color={getCategoryColor(food.category)}
                        size="sm"
                      >
                        {getCategoryLabel(food.category)}
                      </Badge>
                      {food.tags && <Badge size="sm" variant="outline">{food.tags}</Badge>}
                    </Group>
                    {food.eatenCount > 0 && (
                      <Text size="sm" c="dimmed">🍽️ 已吃 {food.eatenCount} 次</Text>
                    )}
                  </Stack>
                  <Group gap="xs">
                    <ActionIcon
                      color="indigo"
                      variant="light"
                      onClick={() => openEditModal(food)}
                    >
                      <IconEdit style={{ width: rem(18), height: rem(18) }} />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => deleteFood(food.id)}
                    >
                      <IconTrash style={{ width: rem(18), height: rem(18) }} />
                    </ActionIcon>
                  </Group>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Stack>

      <Modal
        opened={opened}
        onClose={close}
        title={editingFood ? '编辑菜品' : '添加新菜品'}
        size="md"
      >
        <Stack gap="md">
          <TextInput
            label="菜名"
            placeholder="输入菜名"
            value={name}
            onChange={setName}
            withAsterisk
          />
          <Select
            label="分类"
            value={foodCategory}
            onChange={setFoodCategory}
            data={[
              { value: 'breakfast', label: '🌅 早餐' },
              { value: 'lunch', label: '☀️ 午餐' },
              { value: 'dinner', label: '🌙 晚餐' },
              { value: 'snack', label: '🍟 小吃' },
            ]}
          />
          <TextInput
            label="标签"
            placeholder="用逗号分隔，如：辣, 快, 素食"
            value={tags}
            onChange={setTags}
          />
          <Switch
            label="启用"
            checked={enabled}
            onChange={(e) => setEnabled(e.currentTarget.checked)}
          />
          <Divider />
          <Group justify="flex-end" gap="md">
            <Button variant="default" onClick={close}>取消</Button>
            <Button color="indigo" onClick={handleSubmit}>
              {editingFood ? '保存' : '添加'}
            </Button>
          </Group>
        </Stack>
      </Modal>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  );
}

export default FoodPage;
