import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import style from '../ImageGallery/ImageGallery.module.css';
import Loader from 'components/Loader';
import Button from 'components/Button';

const ImageGallery = ({
  images = ['https://cdn.pixabay.com/user/2019/04/11/22-45-05-994_250x250.jpg'],
  isFetching,
  error,
  openFullScreenMode,
  closeFullScreenMode,
  currentPage,
  handleLoadMoreBtn,
}) => {
  const showLoader = isFetching && images?.length !== 0;

  return (
    <>
      <ul className={style.ImageGallery}>
        {images?.length > 0 &&
          images.map(image => (
            <ImageGalleryItem
              openFullScreenMode={openFullScreenMode}
              key={image.id}
              {...image}
            />
          ))}
      </ul>
      {showLoader && <Loader />}
      {error && (
        <p className={style.ErrorMessage}>
          {'Oops😢 Something happened, try again later...'}
        </p>
      )}
      {images?.length > 0 && <Button onClick={handleLoadMoreBtn} />}
    </>
  );
};

ImageGallery.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ),
  openFullScreenMode: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleLoadMoreBtn: PropTypes.func.isRequired,
};

export default ImageGallery;
