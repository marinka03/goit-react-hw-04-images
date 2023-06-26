import React from 'react';
import PropTypes from 'prop-types';
import style from '../ImageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  tags = '',
  webformatWidth,
  webformatHeight,
  largeImageURL,
  openFullScreenMode,
}) => {
  return (
    <li className={style.ImageGalleryItem}>
      <img
        onClick={() => {
          openFullScreenMode(largeImageURL, tags);
        }}
        width={webformatWidth}
        height={webformatHeight}
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
