import React, { useState, useEffect } from 'react';
import { 
  Title, Text, Container, Paper, Group, Badge, 
  Box, Stack, Card, SimpleGrid, Button, 
  TextInput, Grid, Divider, LoadingOverlay,
  Image, Anchor, Chip, ThemeIcon, Rating,
  Modal, ScrollArea, Table, Tabs,
  ActionIcon, Tooltip, CopyButton,
} from '@mantine/core';
import { 
  IconSearch, IconShoppingCart, IconCurrencyDollar, 
  IconTrendingUp, IconExternalLink, IconCopy,
  IconCheck, IconX, IconHistory, IconStar,
} from '@tabler/icons-react';
import axios from 'axios';

function PriceComparePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [platform, setPlatform] = useState('all');

  // 搜索商品
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.get('/api/price-compare/search', {
        params: {
          keyword: searchQuery,
          platform: platform !== 'all' ? platform : undefined,
        }
      });
      setSearchResults(response.data.products || []);
    } catch (error) {
      console.error('搜索失败:', error);
      // 模拟数据（演示用）
      setSearchResults([
        {
          id: '1',
          name: 'Apple iPhone 15 Pro (256GB)',
          image: 'https://via.placeholder.com/200x200?text=iPhone+15',
          prices: [
            { platform: '淘宝', price: 7999, originalPrice: 8999, url: '#', commission: 239.97 },
            { platform: '京东', price: 8199, originalPrice: 8999, url: '#', commission: 245.97 },
            { platform: '拼多多', price: 7699, originalPrice: 8999, url: '#', commission: 230.97 },
          ],
          lowestPrice: 7699,
          highestPrice: 8199,
          rating: 4.8,
          reviews: 12000,
        },
        {
          id: '2',
          name: 'Sony WH-1000XM5 降噪耳机',
          image: 'https://via.placeholder.com/200x200?text=Sony+XM5',
          prices: [
            { platform: '淘宝', price: 2399, originalPrice: 2999, url: '#', commission: 71.97 },
            { platform: '京东', price: 2499, originalPrice: 2999, url: '#', commission: 74.97 },
            { platform: '拼多多', price: 2199, originalPrice: 2999, url: '#', commission: 65.97 },
          ],
          lowestPrice: 2199,
          highestPrice: 2499,
          rating: 4.9,
          reviews: 8500,
        },
      ]);
    }
    setLoading(false);
  };

  // 查看价格历史
  const viewPriceHistory = async (productId) => {
    try {
      const response = await axios.get(`/api/price-compare/history/${productId}`);
      setPriceHistory(response.data.history || []);
    } catch (error) {
      // 模拟数据
      setPriceHistory([
        { date: '2026-03-01', price: 8299 },
        { date: '2026-03-05', price: 8099 },
        { date: '2026-03-10', price: 7999 },
        { date: '2026-03-15', price: 7699 },
      ]);
    }
    setSelectedProduct(productId);
  };

  // 获取佣金链接
  const getCommissionLink = async (product, platformPrice) => {
    try {
      const response = await axios.post('/api/price-compare/affiliate', {
        productId: product.id,
        platform: platformPrice.platform,
        url: platformPrice.url,
      });
      return response.data.affiliateUrl || platformPrice.url;
    } catch (error) {
      return platformPrice.url;
    }
  };

  // 计算节省金额
  const calculateSavings = (product) => {
    if (!product.prices || product.prices.length === 0) return 0;
    const maxOriginal = Math.max(...product.prices.map(p => p.originalPrice));
    return maxOriginal - product.lowestPrice;
  };

  // 平台图标
  const getPlatformIcon = (platform) => {
    const colors = {
      '淘宝': 'orange',
      '京东': 'red',
      '拼多多': 'yellow',
      '天猫': 'red',
      '苏宁': 'blue',
    };
    return colors[platform] || 'gray';
  };

  return (
    <div>
      {/* Header */}
      <Group mb="xl" justify="space-between" align="flex-start">
        <div>
          <Group gap="xs" mb="xs">
            <ThemeIcon size="lg" radius="md" color="green" variant="gradient">
              <IconCurrencyDollar size={24} />
            </ThemeIcon>
            <Title order={2}>比价助手 💰</Title>
          </Group>
          <Text c="dimmed" size="lg">
            全网比价，帮你找到最便宜的价格，还能赚佣金！
          </Text>
        </div>
        <Badge size="lg" color="green" variant="light">
          已省 ¥1,234
        </Badge>
      </Group>

      {/* 搜索框 */}
      <Paper p="md" radius="md" withBorder mb="xl">
        <Grid>
          <Grid.Col span={8}>
            <TextInput
              placeholder="搜索商品名称、品牌、型号..."
              size="lg"
              leftSection={<IconSearch />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Group gap="xs" wrap="nowrap">
              <Chip.Group value={platform} onChange={setPlatform}>
                <Chip value="all" size="sm">全部</Chip>
                <Chip value="taobao" size="sm">淘宝</Chip>
                <Chip value="jd" size="sm">京东</Chip>
                <Chip value="pdd" size="sm">拼多多</Chip>
              </Chip.Group>
            </Group>
          </Grid.Col>
        </Grid>
        
        <Button 
          fullWidth 
          mt="md" 
          size="lg"
          color="green"
          onClick={handleSearch}
          loading={loading}
        >
          🔍 开始比价
        </Button>

        <Group mt="sm" gap="xs">
          <Text size="xs" c="dimmed">热门搜索:</Text>
          {['iPhone 15', 'MacBook Pro', 'AirPods', 'Switch', 'PS5'].map((hot) => (
            <Badge 
              key={hot} 
              variant="light" 
              color="gray" 
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setSearchQuery(hot);
                handleSearch();
              }}
            >
              {hot}
            </Badge>
          ))}
        </Group>
      </Paper>

      {/* 统计信息 */}
      {searchResults.length > 0 && (
        <SimpleGrid cols={4} mb="xl" breakpoints={[{ maxWidth: 'sm', cols: 2 }]}>
          <Paper p="md" radius="md" withBorder>
            <Text size="xs" c="dimmed">找到商品</Text>
            <Text size="xl" fw={700}>{searchResults.length} 个</Text>
          </Paper>
          <Paper p="md" radius="md" withBorder>
            <Text size="xs" c="dimmed">最低价格</Text>
            <Text size="xl" fw={700} c="green">
              ¥{Math.min(...searchResults.map(r => r.lowestPrice)).toLocaleString()}
            </Text>
          </Paper>
          <Paper p="md" radius="md" withBorder>
            <Text size="xs" c="dimmed">可省金额</Text>
            <Text size="xl" fw={700} c="orange">
              ¥{searchResults.reduce((sum, r) => sum + calculateSavings(r), 0).toLocaleString()}
            </Text>
          </Paper>
          <Paper p="md" radius="md" withBorder>
            <Text size="xs" c="dimmed">预计佣金</Text>
            <Text size="xl" fw={700} c="blue">
              ¥{searchResults.reduce((sum, r) => {
                return sum + (r.prices?.[0]?.commission || 0);
              }, 0).toFixed(2)}
            </Text>
          </Paper>
        </SimpleGrid>
      )}

      {/* 商品列表 */}
      {loading ? (
        <Paper p="xl" radius="md" withBorder style={{ position: 'relative', minHeight: 300 }}>
          <LoadingOverlay visible={true} />
        </Paper>
      ) : searchResults.length === 0 ? (
        <Paper p="xl" radius="md" withBorder ta="center">
          <IconSearch size={64} stroke={1.5} color="var(--mantine-color-gray-5)" />
          <Text mt="md" c="dimmed">搜索商品名称，开始比价</Text>
          <Text size="sm" c="dimmed">支持淘宝、京东、拼多多等主流电商平台</Text>
        </Paper>
      ) : (
        <Stack gap="md">
          {searchResults.map((product) => (
            <Card key={product.id} padding="lg" radius="md" withBorder>
              <Grid>
                {/* 商品图片 */}
                <Grid.Col span={2}>
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    radius="md"
                    fit="cover"
                    h={150}
                    w={150}
                  />
                </Grid.Col>

                {/* 商品信息 */}
                <Grid.Col span={6}>
                  <Title order={4} mb="xs">{product.name}</Title>
                  <Group gap="xs" mb="sm">
                    <Rating value={product.rating} readOnly size="sm" />
                    <Text size="sm" c="dimmed">{product.reviews?.toLocaleString()} 条评价</Text>
                  </Group>
                  
                  <Group gap="xs" mb="sm">
                    <Badge color="green" variant="light">
                      最低价 ¥{product.lowestPrice?.toLocaleString()}
                    </Badge>
                    <Badge color="orange" variant="light">
                      可省 ¥{calculateSavings(product).toLocaleString()}
                    </Badge>
                  </Group>

                  <Button 
                    variant="subtle" 
                    size="compact-sm"
                    color="gray"
                    leftSection={<IconHistory size={14} />}
                    onClick={() => viewPriceHistory(product.id)}
                  >
                    查看价格历史
                  </Button>
                </Grid.Col>

                {/* 价格对比 */}
                <Grid.Col span={4}>
                  <Text size="sm" fw={600} mb="xs">各平台价格</Text>
                  <Stack gap="xs">
                    {product.prices?.map((price, index) => (
                      <Paper 
                        key={index} 
                        p="xs" 
                        radius="sm" 
                        withBorder
                        bg={index === 0 ? 'green.0' : undefined}
                      >
                        <Group justify="space-between">
                          <Group gap="xs">
                            <Badge 
                              size="sm" 
                              color={getPlatformIcon(price.platform)}
                              variant="filled"
                            >
                              {price.platform}
                            </Badge>
                            {index === 0 && (
                              <Badge size="sm" color="green" variant="light">
                                最便宜
                              </Badge>
                            )}
                          </Group>
                          <Group gap="xs">
                            <Box>
                              <Text size="sm" fw={700} c={index === 0 ? 'green' : undefined}>
                                ¥{price.price.toLocaleString()}
                              </Text>
                              {price.originalPrice > price.price && (
                                <Text size="xs" c="dimmed" style={{ textDecoration: 'line-through' }}>
                                  ¥{price.originalPrice.toLocaleString()}
                                </Text>
                              )}
                            </Box>
                            <Tooltip label="通过此链接购买可获佣金">
                              <ActionIcon
                                component="a"
                                href={price.url}
                                target="_blank"
                                color="green"
                                variant="filled"
                                onClick={async (e) => {
                                  e.preventDefault();
                                  const affiliateUrl = await getCommissionLink(product, price);
                                  window.open(affiliateUrl, '_blank');
                                }}
                              >
                                <IconShoppingCart size={16} />
                              </ActionIcon>
                            </Tooltip>
                          </Group>
                        </Group>
                        {price.commission && (
                          <Text size="xs" c="dimmed" mt="xs">
                            预计佣金：¥{price.commission.toFixed(2)}
                          </Text>
                        )}
                      </Paper>
                    ))}
                  </Stack>
                </Grid.Col>
              </Grid>
            </Card>
          ))}
        </Stack>
      )}

      {/* 价格历史弹窗 */}
      <Modal
        opened={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title="价格历史趋势"
        size="lg"
      >
        {priceHistory.length > 0 ? (
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>日期</Table.Th>
                <Table.Th>价格</Table.Th>
                <Table.Th>变化</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {priceHistory.map((item, index) => {
                const prevPrice = priceHistory[index - 1]?.price;
                const change = prevPrice ? item.price - prevPrice : 0;
                return (
                  <Table.Tr key={index}>
                    <Table.Td>{item.date}</Table.Td>
                    <Table.Td fw={700}>¥{item.price.toLocaleString()}</Table.Td>
                    <Table.Td c={change > 0 ? 'red' : change < 0 ? 'green' : 'gray'}>
                      {change > 0 ? '↑' : change < 0 ? '↓' : '→'} {Math.abs(change).toLocaleString()}
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        ) : (
          <Text c="dimmed" ta="center">暂无价格历史数据</Text>
        )}
      </Modal>

      {/* 提示信息 */}
      <Paper p="md" radius="md" withBorder mt="xl" bg="blue.0">
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color="blue">
            <IconStar size={16} />
          </ThemeIcon>
          <div>
            <Text fw={600} size="sm">💡 省钱小贴士</Text>
            <Text size="xs" c="dimmed">
              通过本站链接购买可获得返利，累积后可提现！历史价格帮你判断是否是真优惠。
            </Text>
          </div>
        </Group>
      </Paper>
    </div>
  );
}

export default PriceComparePage;
