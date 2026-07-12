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
            <p>Premium Weather Intelligence</p>
          </div>
        </div>

        <div className="footer-center">
          <span>Powered by OpenWeather</span>
          <span>•</span>
          <span>NewsAPI</span>
        </div>

        <div className="footer-right">
          <button className="footer-icon">
            <a href="https://github.com/durga-001/skycast" target="_blank">
              <FiGithub />
            </a>
          </button>

          <span className="footer-copy">© 2026 SkyCast</span>
        </div>
      </div>

      <div className="footer-bottom">
        <FiHeart />

        <span>Built with React • Express • MongoDB</span>
      </div>
    </footer>
  );
}
