import React, { useState, useCallback } from "react";
import Navbar from "./Navbar";
import "../css/Dashboard.css";
import axios from "axios";
import CourseCard from "./CourseCard";
import BookCard from "./BookCard"; // Import the BookCard component
import Footer from "./Footer";
import _ from "lodash";

interface DashboardProps {
  username: string;
}

interface Course {
  "Course Title": string;
  Partner: string;
  Rating: string;
  Link: string;
}

interface Book {
  volumeInfo: {
    title: string;
    authors?: string[];
    averageRating?: number;
    infoLink: string;
  };
}

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  link: string;
}

const Dashboard: React.FC<DashboardProps> = ({ username }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]); // State for YouTube videos
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // Flag to indicate if a search has been performed

  // Pagination states
  const [visibleCoursesCount, setVisibleCoursesCount] = useState(4);
  const [visibleBooksCount, setVisibleBooksCount] = useState(4);

  // Function to fetch both courses, books, and YouTube videos
  const searchResources = async (query: string) => {
    setLoading(true);
    try {
      const coursesRequest = axios.post("https://convex-api.onrender.com/search", { search: query });
      const booksRequest = axios.get("https://www.googleapis.com/books/v1/volumes", { params: { q: query } });
      const youtubeRequest = axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          q: query,
          key: import.meta.env.VITE_APP_ID,
          maxResults: 4,
          type: "video",
        },
      });
      // Execute all requests in parallel
      const [coursesResponse, booksResponse, youtubeResponse] = await Promise.all([coursesRequest, booksRequest, youtubeRequest]);
  
      setCourses(coursesResponse.data);
      setBooks(booksResponse.data.items);
      setVideos(
        youtubeResponse.data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }))
      );
    } catch (error) {
      console.error("Error Fetching Resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearchResources = useCallback(
    _.debounce((query: string) => searchResources(query), 300),
    []
  );
  // Form submission handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      debouncedSearchResources(searchQuery);
      setHasSearched(true); // Set hasSearched to true when a search is performed
    }
  };

  // Handle "View More" for courses
  const handleViewMoreCourses = () => {
    setVisibleCoursesCount((prevCount) => prevCount + 4);
  };

  // Handle "View More" for books
  const handleViewMoreBooks = () => {
    setVisibleBooksCount((prevCount) => prevCount + 4);
  };

  // Limit the number of courses and books displayed to the visible count
  const limitedCourses = courses.slice(0, visibleCoursesCount);
  const limitedBooks = books.slice(0, visibleBooksCount);


  return (
    <div className="dashboard">
      <Navbar username={username} />
      <div className="dashboard-content">
        <h2>Welcome back, {username}!</h2>

        <form onSubmit={handleSearch} className="course-search-form">
          <input
            type="text"
            placeholder="Search for resources (e.g. Python, ReactJs)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="course-search-input"
          />
          <button type="submit" className="course-search-button">
            Search
          </button>
        </form>

        {loading ? (
          <p>Loading Resources....</p>
        ) : (
          hasSearched && (
            <div className="resources-results">
              <div className="courses-section">
                <h2 style={{color:'white'}}>Courses</h2>
                {limitedCourses.length > 0 ? (
                  <div className="course-results">
                    {limitedCourses.map((course, index) => (
                      <CourseCard
                        key={index}
                        course={{
                          title: course["Course Title"],
                          partner: course.Partner,
                          rating: course.Rating,
                          link: course.Link,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <p>No Courses found. Try Searching Something else</p>
                )}
                {courses.length > visibleCoursesCount && (
                  <button
                    onClick={handleViewMoreCourses}
                    className="view-more-button"
                  >
                    View More Courses
                  </button>
                )}
              </div>
              <div className="youtube-section">
                <h2 style={{color:'white'}}>YouTube Videos</h2>
                {videos.length > 0 ? (
                  <div className="youtube-videos">
                    {videos.map((video, index) => (
                      <div key={index} className="youtube-video">
                        <a
                          href={video.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="youtube-thumbnail"
                          />
                          <p style={{marginTop:'10px'}}>{video.title}</p>
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No YouTube videos found. Try Searching Something else</p>
                )}
              </div>

              <div className="books-section">
                <h2 style={{color:'white'}}>Books</h2>
                {limitedBooks.length > 0 ? (
                  <div className="book-results">
                    {limitedBooks.map((book, index) => (
                      <BookCard
                        key={index}
                        book={{
                          title: book.volumeInfo.title,
                          authors: book.volumeInfo.authors || ["Unknown"],
                          rating: book.volumeInfo.averageRating || "N/A",
                          link: book.volumeInfo.infoLink,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <p>No Books found. Try Searching Something else</p>
                )}
                {books.length > visibleBooksCount && (
                  <button
                    onClick={handleViewMoreBooks}
                    className="view-more-button"
                  >
                    View More Books
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>
      <Footer/>
    </div>
  );
};
export default Dashboard;