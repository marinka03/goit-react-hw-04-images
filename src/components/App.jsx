import { searchPhotoApi } from 'helpers/api';
import style from '../components/App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import { useEffect, useState } from 'react';

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFetching, setFetchingCheck] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, src: '', alt: '' });

  useEffect(() => {
    const requestImages = async (searchValue, currentPage) => {
      try {
        setFetchingCheck(true);
        const { hits } = await searchPhotoApi(searchValue, currentPage);
        if (currentPage === 1) {
          setImages(hits);
        } else {
          setImages(prevState => [...prevState, ...hits]);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage(error.message);
      } finally {
        setFetchingCheck(false);
      }
    };

    if (searchValue.length === 0 && currentPage === 1) return;

    requestImages(searchValue, currentPage);
  }, [searchValue, currentPage]);

  const hendleSubmitForm = searchValue => {
    setSearchValue(searchValue);
    setCurrentPage(1);
  };

  const heandleLoadMore = searchValue => {
    setCurrentPage(prevState => prevState + 1);
  };

  const handleOpenModal = (src, alt) => {
    setModal(() => ({ isOpen: true, src, alt }));
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, src: '', alt: '' });
  };

  return (
    <div className={style.App}>
      <Searchbar onSubmit={hendleSubmitForm} />
      <ImageGallery
        error={errorMessage}
        isFetching={isFetching}
        images={images}
        openFullScreenMode={handleOpenModal}
        currentPage={currentPage}
        handleLoadMoreBtn={heandleLoadMore}
      />

      {modal.isOpen && (
        <Modal closeModal={handleCloseModal} src={modal.src} alt={modal.alt} />
      )}
    </div>
  );
};

export default App;
