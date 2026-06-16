import { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";

function WeatherNews() {
  const [news, setNews] = useState([]);
  const sliderRef = useRef(null);

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/news");

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
    <div className="news-section">
      <div className="news-header">
        <h2>Latest Weather News</h2>

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
            <p className="news-date">
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default WeatherNews;
