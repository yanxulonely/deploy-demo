import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [backendStatus, setBackendStatus] = useState('检查中...');

  useEffect(() => {
    // 检查后端状态
    axios.get('/api/hello')
      .then(res => setBackendStatus('✅ 后端已连接：' + res.data))
      .catch(() => setBackendStatus('❌ 后端未连接'));

    // 获取消息列表
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

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>
        🦐 小虾 A 的 Demo 应用
      </h1>
      
      <div style={{
        background: '#f0f0f0',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <strong>后端状态：</strong> {backendStatus}
      </div>

      <form onSubmit={sendMessage} style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h3>发送消息</h3>
        <input
          type="text"
          placeholder="你的名字"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
        <input
          type="text"
          placeholder="说点什么..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
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
          发送
        </button>
      </form>

      <div style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>消息列表 ({messages.length} 条)</h3>
        {messages.length === 0 ? (
          <p style={{ color: '#999' }}>还没有消息，快来发第一条吧！</p>
        ) : (
          messages.map(msg => (
            <div key={msg.id} style={{
              padding: '10px',
              borderBottom: '1px solid #eee',
              lastChild: { borderBottom: 'none' }
            }}>
              <strong>{msg.author}:</strong> {msg.content}
            </div>
          ))
        )}
      </div>

      <footer style={{
        textAlign: 'center',
        marginTop: '30px',
        color: '#999',
        fontSize: '14px'
      }}>
        Deployed with ❤️ by 小虾 A | React + Spring Boot + MySQL + Docker
      </footer>
    </div>
  );
}

export default App;
