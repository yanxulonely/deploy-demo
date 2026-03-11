import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FoodPage() {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [category, setCategory] = useState('');

  // 表单数据
  const [formData, setFormData] = useState({
    name: '',
    category: 'lunch',
    tags: '',
    enabled: true
  });

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = () => {
    axios.get('/api/foods/enabled')
      .then(res => setFoods(res.data))
      .catch(err => console.error('获取菜品失败:', err));
  };

  const getRandomFood = () => {
    const url = category 
      ? `/api/foods/random?category=${category}`
      : '/api/foods/random';
    
    axios.get(url)
      .then(res => {
        setSelectedFood(res.data);
      })
      .catch(err => console.error('随机失败:', err));
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

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingFood) {
      axios.put(`/api/foods/${editingFood.id}`, formData)
        .then(() => {
          resetForm();
          fetchFoods();
        })
        .catch(err => console.error('更新失败:', err));
    } else {
      axios.post('/api/foods', formData)
        .then(() => {
          resetForm();
          fetchFoods();
        })
        .catch(err => console.error('添加失败:', err));
    }
  };

  const editFood = (food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      category: food.category,
      tags: food.tags || '',
      enabled: food.enabled
    });
    setShowForm(true);
  };

  const deleteFood = (id) => {
    if (window.confirm('确定要删除这个菜品吗？')) {
      axios.delete(`/api/foods/${id}`)
        .then(() => fetchFoods())
        .catch(err => console.error('删除失败:', err));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'lunch',
      tags: '',
      enabled: true
    });
    setEditingFood(null);
    setShowForm(false);
  };

  const getCategoryLabel = (cat) => {
    const labels = {
      breakfast: '🌅 早餐',
      lunch: '☀️ 午餐',
      dinner: '🌙 晚餐',
      snack: '🍟 小吃'
    };
    return labels[cat] || cat;
  };

  return (
    <div>
      <h2>🍜 今天吃啥</h2>

      {/* 随机推荐区域 */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px',
        borderRadius: '12px',
        color: 'white',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        {selectedFood ? (
          <div>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🍽️</div>
            <h3 style={{ fontSize: '32px', margin: '10px 0' }}>{selectedFood.name}</h3>
            <p style={{ opacity: 0.9 }}>
              {getCategoryLabel(selectedFood.category)} 
              {selectedFood.tags && ` · ${selectedFood.tags}`}
            </p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => markAsEaten(selectedFood)}
                style={{
                  background: '#28a745',
                  color: 'white',
                  padding: '12px 30px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                ✅ 就它了！
              </button>
              <button
                onClick={getRandomFood}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  padding: '12px 30px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                🔄 再换一个
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '64px', marginBottom: '10px' }}>🤔</div>
            <h3 style={{ fontSize: '28px', margin: '10px 0' }}>今天吃什么？</h3>
            <p style={{ opacity: 0.9, marginBottom: '20px' }}>让我帮你决定吧！</p>
            
            <div style={{ marginBottom: '15px' }}>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  padding: '10px 15px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '14px',
                  background: 'rgba(255,255,255,0.9)'
                }}
              >
                <option value="">不限制分类</option>
                <option value="breakfast">🌅 早餐</option>
                <option value="lunch">☀️ 午餐</option>
                <option value="dinner">🌙 晚餐</option>
                <option value="snack">🍟 小吃</option>
              </select>
            </div>

            <button
              onClick={getRandomFood}
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '15px 40px',
                border: '2px solid rgba(255,255,255,0.5)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              🎲 帮我选！
            </button>
          </div>
        )}
      </div>

      {/* 添加菜品按钮 */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: showForm ? '#dc3545' : '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          {showForm ? '❌ 取消' : '➕ 添加菜品'}
        </button>
      </div>

      {/* 添加/编辑表单 */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h3>{editingFood ? '编辑菜品' : '添加新菜品'}</h3>
          
          <input
            type="text"
            name="name"
            placeholder="菜名"
            value={formData.name}
            onChange={handleFormChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          
          <select
            name="category"
            value={formData.category}
            onChange={handleFormChange}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          >
            <option value="breakfast">🌅 早餐</option>
            <option value="lunch">☀️ 午餐</option>
            <option value="dinner">🌙 晚餐</option>
            <option value="snack">🍟 小吃</option>
          </select>
          
          <input
            type="text"
            name="tags"
            placeholder="标签（用逗号分隔，如：辣, 快, 素食）"
            value={formData.tags}
            onChange={handleFormChange}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          
          <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <input
              type="checkbox"
              name="enabled"
              checked={formData.enabled}
              onChange={handleFormChange}
              style={{ marginRight: '8px' }}
            />
            启用
          </label>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                background: '#007bff',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {editingFood ? '保存' : '添加'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              style={{
                background: '#6c757d',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              取消
            </button>
          </div>
        </form>
      )}

      {/* 菜品列表 */}
      <div style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>我的菜单库 ({foods.length} 个)</h3>
        {foods.length === 0 ? (
          <p style={{ color: '#999' }}>还没有菜品，快来添加第一个吧！</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
            {foods.map(food => (
              <div key={food.id} style={{
                padding: '15px',
                border: '1px solid #eee',
                borderRadius: '8px',
                background: '#fafafa'
              }}>
                <h4 style={{ margin: '0 0 8px 0' }}>{food.name}</h4>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                  <div>{getCategoryLabel(food.category)}</div>
                  {food.tags && <div>🏷️ {food.tags}</div>}
                  {food.eatenCount > 0 && <div>🍽️ 吃过 {food.eatenCount} 次</div>}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => editFood(food)}
                    style={{
                      background: '#ffc107',
                      color: '#333',
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => deleteFood(food.id)}
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodPage;
