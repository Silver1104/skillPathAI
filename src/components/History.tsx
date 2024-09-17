import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import BookCard from './BookCard';
import '../css/History.css';

interface HistoryItem {
  type: 'course' | 'book' | 'video';
  data: any;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from local storage
  useEffect(() => {
    const storedHistory = localStorage.getItem('userHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Save history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('userHistory', JSON.stringify(history));
  }, [history]);

  // Handle viewing an item (example function)


  return (
    <div className="history">
      <h2>Access History</h2>
      <div className="history-content">
        {history.length > 0 ? (
          history.map((item, index) => (
            <div key={index} className="history-item">
              {item.type === 'course' && <CourseCard course={item.data} />}
              {item.type === 'book' && (
                <BookCard
                  book={{
                    title: item.data.title,
                    authors: item.data.authors,
                    rating: item.data.rating,
                    link: item.data.link,
                  }}
                />
              )}
              {item.type === 'video' && (
                <div className="youtube-video-card">
                  <a href={item.data.link} target="_blank" rel="noopener noreferrer">
                    <img src={item.data.thumbnail} alt={item.data.title} className="youtube-thumbnail" />
                    <p>{item.data.title}</p>
                  </a>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No history found.</p>
        )}
      </div>
    </div>
  );
};

export default History;