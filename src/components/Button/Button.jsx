import React from 'react';
import PropTypes from 'prop-types';
import style from '../Button/Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button className={style.Button} onClick={onClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
