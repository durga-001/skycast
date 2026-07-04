import { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";

function WeatherNews() {
  const [news, setNews] = useState([]);
  const sliderRef = useRef(null);

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/news");

      setNews(response.data);
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
          <button onClick={scrollLeft}>
            <FaChevronLeft />
          </button>

          <button onClick={scrollRight}>
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="news-slider" ref={sliderRef}>
        {news.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="news-card"
          >
            <img
              src={article.urlToImage || "/news-placeholder.jpg"}
              alt={article.title}
            />

            <h3>{article.title}</h3>

            <p>{article.description}</p>
            <div className="news-footer">
              <span className="news-date">
                {new Date(article.publishedAt).toLocaleDateString()}
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
