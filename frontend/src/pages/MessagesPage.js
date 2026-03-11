import React, { useState, useEffect } from 'react';
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

  return (
    <div>
      <h2>💬 留言板</h2>

      <form onSubmit={sendMessage} style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
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
              borderBottom: '1px solid #eee'
            }}>
              <strong>{msg.author}:</strong> {msg.content}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MessagesPage;
