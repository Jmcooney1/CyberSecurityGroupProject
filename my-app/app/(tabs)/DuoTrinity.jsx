import { useState } from "react";

const CANVAS_URL = "https://trinityu.login.duosecurity.com/";

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
    background: "linear-gradient(90deg, #6abb2e 60%, #8fd44e 100%)",
  },
  cardBody: {
    padding: "32px 36px 28px 36px",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 28,
  },
  duoCircle: {
    width: 42,
    height: 42,
    background: "#6abb2e",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  duoCircleText: {
    color: "#fff",
    fontWeight: 900,
    fontSize: 13,
    letterSpacing: "-0.5px",
  },
  duoWordmark: {
    fontSize: 22,
    fontWeight: 700,
    color: "#6abb2e",
    letterSpacing: "-0.5px",
  },
  signingInLabel: {
    fontSize: 11.5,
    fontWeight: 600,
    letterSpacing: "0.08em",
    color: "#999",
    textTransform: "uppercase",
    marginBottom: 3,
  },
  signingInTarget: {
    fontSize: 17,
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: 28,
  },
  mainQuestion: {
    fontSize: 26,
    fontWeight: 800,
    color: "#1a1a1a",
    marginBottom: 12,
    lineHeight: 1.2,
  },
  subtext: {
    fontSize: 14.5,
    color: "#555",
    lineHeight: 1.55,
    marginBottom: 28,
  },
  btn: {
    display: "block",
    width: "100%",
    padding: "15px 20px",
    borderRadius: 10,
    border: "1.5px solid #e2e2e2",
    background: "#fff",
    fontSize: 15,
    fontWeight: 500,
    color: "#888",
    cursor: "pointer",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: "0.01em",
    transition: "background 0.15s, border-color 0.15s, color 0.15s, box-shadow 0.15s",
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 36px 20px 36px",
    borderTop: "1px solid #f0f0f0",
  },
  needHelp: {
    fontSize: 14,
    color: "#3a7bd5",
    textDecoration: "none",
    fontWeight: 500,
  },
  secured: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    color: "#888",
  },
  securedDot: {
    width: 8,
    height: 8,
    background: "#6abb2e",
    borderRadius: "50%",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(240,240,240,0.92)",
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },
  overlayText: {
    fontSize: 16,
    color: "#444",
    fontWeight: 500,
  },
};

// Spinner component
function Spinner() {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        border: "4px solid #e0e0e0",
        borderTopColor: "#6abb2e",
        borderRadius: "50%",
        animation: "duo-spin 0.8s linear infinite",
      }}
    />
  );
}

export default function DuoTrinity() {
  const [redirecting, setRedirecting] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const handleChoice = (isMyDevice) => {
    setOverlayMessage(
      isMyDevice
        ? "Device remembered. Redirecting to Canvas…"
        : "Redirecting to Canvas…"
    );
    setRedirecting(true);
    setTimeout(() => {
      window.location.href = CANVAS_URL;
    }, 1200);
  };

  const getBtnStyle = (id, isPrimary) => ({
    ...styles.btn,
    marginBottom: id === "yes" ? 12 : 0,
    ...(hoveredBtn === id
      ? isPrimary
        ? { background: "#6abb2e", borderColor: "#6abb2e", color: "#fff" }
        : { background: "#f7fdf2", borderColor: "#6abb2e", color: "#3a8000", boxShadow: "0 2px 8px rgba(106,187,46,0.10)" }
      : {}),
  });

  return (
    <>
      {/* Keyframe injection */}
      <style>{`@keyframes duo-spin { to { transform: rotate(360deg); } }`}</style>

      <div style={styles.body}>
        <div style={styles.card}>
          <div style={styles.topBar} />

          <div style={styles.cardBody}>
            {/* Logo */}
            <div style={styles.logoRow}>
              <div style={styles.duoCircle}>
                <span style={styles.duoCircleText}>duo</span>
              </div>
              <span style={styles.duoWordmark}>duo</span>
            </div>

            {/* Signing in to */}
            <div style={styles.signingInLabel}>Signing in to</div>
            <div style={styles.signingInTarget}>Trinity University — Canvas LMS</div>

            {/* Main content */}
            <div style={styles.mainQuestion}>Is this your device?</div>
            <p style={styles.subtext}>
              If you're the only person who uses this device, Duo will remember it for future logins.
            </p>

            {/* Buttons */}
            <button
              style={getBtnStyle("yes", true)}
              onMouseEnter={() => setHoveredBtn("yes")}
              onMouseLeave={() => setHoveredBtn(null)}
              onClick={() => handleChoice(true)}
            >
              Yes, this is my device
            </button>
            <button
              style={getBtnStyle("no", false)}
              onMouseEnter={() => setHoveredBtn("no")}
              onMouseLeave={() => setHoveredBtn(null)}
              onClick={() => handleChoice(false)}
            >
              No, other people use this device
            </button>
          </div>

          {/* Footer */}
          <div style={styles.cardFooter}>
            <a
              href="https://guide.duo.com/"
              target="_blank"
              rel="noreferrer"
              style={styles.needHelp}
            >
              Need help?
            </a>
            <div style={styles.secured}>
              <div style={styles.securedDot} />
              <span>Secured by Duo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Redirect overlay */}
      {redirecting && (
        <div style={styles.overlay}>
          <Spinner />
          <div style={styles.overlayText}>{overlayMessage}</div>
        </div>
      )}
    </>
  );
}
