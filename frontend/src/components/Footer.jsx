import { FiCloud, FiGithub, FiGlobe, FiHeart } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <FiCloud />
          </div>

          <div>
            <h3>SkyCast</h3>
            <p>Premium Weather Dashboard</p>
          </div>
        </div>

        <div className="footer-right">
          <span className="footer-copy">© 2026 SkyCast</span>
        </div>
      </div>
    </footer>
  );
}
