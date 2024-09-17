import React from 'react';
import '../css/BookCard.css';

interface BookProps {
  book: {
    title: string;
    authors: string[];
    rating: string | number;
    link: string;
  };
}

const BookCard: React.FC<BookProps> = ({ book }) => {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Authors: {book.authors.join(', ')}</p>
      <p>Rating: {book.rating}</p>
      <a href={book.link} target="_blank" rel="noopener noreferrer">
        View Book
      </a>
    </div>
  );
};

export default BookCard;