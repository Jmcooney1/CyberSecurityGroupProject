import { useState } from 'react';

const SendFakeEmail = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'

  const handleSendEmail = async () => {
    if (!email) return alert('Please enter an email address.');

    setStatus('loading');

    try {
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toEmail: email,
          recipientName: name,
        }),
      });

      const data = await response.json();
      console.log('Email response:', data);

      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Send a Link via Email</h2>

      <input
        type="text"
        placeholder="Recipient's name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <input
        type="email"
        placeholder="Recipient's email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <button
        onClick={handleSendEmail}
        disabled={status === 'loading'}
        style={{
          ...styles.button,
          backgroundColor: status === 'loading' ? '#aaa' : '#4A90E2',
        }}
      >
        {status === 'loading' ? 'Sending...' : 'Send Email'}
      </button>

      {status === 'success' && (
        <p style={{ color: 'green' }}>✅ Email sent successfully!</p>
      )}
      {status === 'error' && (
        <p style={{ color: 'red' }}>❌ Failed to send email. Try again.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '40px auto',
    gap: '12px',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    padding: '10px 14px',
    fontSize: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default SendFakeEmail;