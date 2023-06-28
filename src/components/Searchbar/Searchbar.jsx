import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from '../Searchbar/Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const INITIAL_STATE = {
    searchValue: '',
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const hendleSubmit = e => {
    e.preventDefault();
    onSubmit(formData.searchValue);
    setFormData({ searchValue: '' }); // Значення з input
  };

  const heandleSearchValueChange = ({ target: { value, name } }) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <header className={style.Searchbar}>
      <form className="form" onSubmit={hendleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          onChange={heandleSearchValueChange}
          className="input"
          name="searchValue"
          type="text"
          value={formData.searchValue}
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
