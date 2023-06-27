import React from 'react';
import PropTypes from 'prop-types';
import style from '../Searchbar/Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const hendleSubmit = e => {
    e.preventDefault();
    onSubmit(e.currentTarget.name.value); // Значення з input
  };

  return (
    <header className={style.Searchbar}>
      <form className="form" onSubmit={hendleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          name="name"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
