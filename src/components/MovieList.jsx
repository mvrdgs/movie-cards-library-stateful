import React from 'react';
import PropTypes from 'prop-types';

import MovieCard from './MovieCard';

class MovieList extends React.Component {
  render() {
    const { movies, searchText, bookmarkedOnly, selectedGenre } = this.props;
    let renderedMovies = movies;
    if (bookmarkedOnly) {
      renderedMovies = renderedMovies.filter((movie) => movie.bookmarked === true);
    }

    renderedMovies = renderedMovies.filter((movie) => {
      const { title, subtitle, storyline } = movie;
      if (title.includes(searchText)) return movie;
      if (subtitle.includes(searchText)) return movie;
      if (storyline.includes(searchText)) return movie;
    });
    renderedMovies = renderedMovies.filter((movie) => movie.genre.includes(
      selectedGenre,
    ));

    return (
      <div data-testid="movie-list" className="movie-list">
        { renderedMovies.map((movie) => (<MovieCard
          key={ movie.title }
          movie={ movie }
        />)) }
      </div>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  searchText: PropTypes.string.isRequired,
  bookmarkedOnly: PropTypes.bool.isRequired,
  selectedGenre: PropTypes.string.isRequired,
};

export default MovieList;
