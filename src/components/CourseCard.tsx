import React from 'react';
import '../css/CourseCard.css';

interface CourseProps {
  course: {
    title: string;
    partner: string;
    rating: string;
    link: string;
  };
}

const CourseCard: React.FC<CourseProps> = ({ course }) => {
  return (
    <div className="course-card">
      <h3>Course Name:{course.title}</h3>
      <p>Partner: {course.partner}</p>
      <p>Rating: {course.rating}</p>
      <a href={course.link} target="_blank" rel="noopener noreferrer">
        View Course
      </a>
    </div>
  );
};

export default CourseCard;