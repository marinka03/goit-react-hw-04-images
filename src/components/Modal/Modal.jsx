import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../Modal/Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress = e => {
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className={style.Overlay} onClick={this.props.closeModal}>
        <div className={style.Modal}>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
