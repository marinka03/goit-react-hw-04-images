import React from 'react';
import PropTypes from 'prop-types';
import style from '../ImageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  tags = '',
  largeImageURL,
  openFullScreenMode,
}) => {
  return (
    <li className={style.ImageGalleryItem}>
      <img
        onClick={() => {
          openFullScreenMode(largeImageURL, tags);
        }}
        className={style.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  openFullScreenMode: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webformatWidth: PropTypes.number.isRequired,
  webformatHeight: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
