import React from 'react';
import style from '../Button/Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button className={style.Button} onClick={onClick}>
      Load more
    </button>
  );
};
export default Button;
