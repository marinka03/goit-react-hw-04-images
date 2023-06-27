import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

const Modal = ({ closeModal, src, alt }) => {
  const handleKeyPress = useCallback(e => {
    if (e.key === 'Escape') closeModal();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className={style.Overlay} onClick={closeModal}>
      <div className={style.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
