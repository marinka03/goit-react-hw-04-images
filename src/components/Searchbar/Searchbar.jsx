import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../Searchbar/Searchbar.module.css';

class Searchbar extends Component {
  hendleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(e.currentTarget.name.value); // Значення з input
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form className="form" onSubmit={this.hendleSubmit}>
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
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
