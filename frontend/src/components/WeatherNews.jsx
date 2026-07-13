import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function WeatherNews() {
  const [news, setNews] = useState([]);
  const sliderRef = useRef(null);

  const fetchNews = async () => {
    try {
      const { data } = await API.get("/news");
      setNews(data);
    } catch (error) {
      console.error(error);
    }
  };

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <section className="news-section glass-card">
      <div className="news-header">
        <div>
          <p className="section-subtitle">LATEST UPDATES</p>
          <h2 className="section-title">Weather News</h2>
        </div>

        <div className="news-controls">
          <button type="button" onClick={scrollLeft}>
            <FaChevronLeft />
          </button>

          <button type="button" onClick={scrollRight}>
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="news-slider" ref={sliderRef}>
        {news.map((article) => (
          <a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="news-card"
          >
            <img
              src={article.urlToImage || "/news-placeholder.jpg"}
              alt={article.title}
              loading="lazy"
            />

            <h3>{article.title}</h3>

            <p>{article.description}</p>

            <div className="news-footer">
              <span className="news-date">
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString()
                  : ""}
              </span>

              <span className="news-read">Read →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default WeatherNews;
