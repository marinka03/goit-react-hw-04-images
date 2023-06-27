import { searchPhotoApi } from 'helpers/api';
import style from '../components/App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import { useCallback, useState } from 'react';

const App = () => {
  const [images, isImages] = useState([]);
  const [currentPage, isCurrentPage] = useState(1);
  const [SearchValue, isSearchValue] = useState('');
  const [errorMessage, isErrorMessage] = useState('');
  const [isFetching, isFetchingCheck] = useState(false);
  const [modal, isModal] = useState({ isOpen: false, src: '', alt: '' });

  const hendleSubmitForm = useCallback(
    async value => {
      if (SearchValue === value) {
        return;
      }
      let inputValue = '';
      let page = 0;

      if (typeof value === 'string' && SearchValue !== value) {
        isCurrentPage(1);
        isSearchValue(value);
        page = 1;
        inputValue = value;
        console.log('inputValue', inputValue);
        console.log('page', page);
        console.log('currentPage ', currentPage);
      } else {
        page = currentPage;
        inputValue = SearchValue;
      }

      isFetchingCheck(true);
      try {
        const { hits } = await searchPhotoApi(inputValue, page);
        console.log('currentPage', currentPage); //ЗАПИТ НА СЕРВЕР

        if (page === 1) {
          isImages(hits);
        } else {
          isImages(prevState => [...prevState, ...hits]);
        }
      } catch (error) {
        console.log(error);
        isErrorMessage(error.message);
      } finally {
        isCurrentPage(prevState => prevState + 1);
        isFetchingCheck(false);
      }
    },
    [SearchValue, currentPage]
  );

  const handleOpenModal = (src, alt) => {
    isModal(() => ({ isOpen: true, src, alt }));
  };

  const handleCloseModal = () => {
    isModal({ isOpen: false, src: '', alt: '' });
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
        handleLoadMoreBtn={hendleSubmitForm}
      />

      {modal.isOpen && (
        <Modal closeModal={handleCloseModal} src={modal.src} alt={modal.alt} />
      )}
    </div>
  );
};

export default App;
