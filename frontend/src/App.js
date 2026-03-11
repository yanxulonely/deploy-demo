import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodPage from './pages/FoodPage';
import MessagesPage from './pages/MessagesPage';

function App() {
  const [activePage, setActivePage] = useState('food');
  const [backendStatus, setBackendStatus] = useState('检查中...');

  useEffect(() => {
    // 检查后端状态
    axios.get('/api/hello')
      .then(res => setBackendStatus('✅ 后端已连接：' + res.data))
      .catch(() => setBackendStatus('❌ 后端未连接'));
  }, []);

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>
          🦐 小虾 A 的工具箱
        </h1>
        <div style={{
          background: '#f0f0f0',
          padding: '10px',
          borderRadius: '8px',
          display: 'inline-block'
        }}>
          {backendStatus}
        </div>
      </header>

      {/* 导航栏 */}
      <nav style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        borderBottom: '2px solid #eee',
        paddingBottom: '10px'
      }}>
        <button
          onClick={() => setActivePage('food')}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            background: activePage === 'food' ? '#007bff' : '#f0f0f0',
            color: activePage === 'food' ? 'white' : '#333',
            fontWeight: activePage === 'food' ? 'bold' : 'normal'
          }}
        >
          🍜 今天吃啥
        </button>
        <button
          onClick={() => setActivePage('messages')}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            background: activePage === 'messages' ? '#007bff' : '#f0f0f0',
            color: activePage === 'messages' ? 'white' : '#333',
            fontWeight: activePage === 'messages' ? 'bold' : 'normal'
          }}
        >
          💬 留言板
        </button>
      </nav>

      {/* 页面内容 */}
      <main>
        {activePage === 'food' && <FoodPage />}
        {activePage === 'messages' && <MessagesPage />}
      </main>

      <footer style={{
        textAlign: 'center',
        marginTop: '40px',
        color: '#999',
        fontSize: '14px',
        borderTop: '1px solid #eee',
        paddingTop: '20px'
      }}>
        Built with ❤️ by 小虾 A | React + Spring Boot + MySQL + Docker
      </footer>
    </div>
  );
}

export default App;
