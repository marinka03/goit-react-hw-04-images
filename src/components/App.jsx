import { searchPhotoApi } from 'helpers/api';
import style from '../components/App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import { useCallback, useState } from 'react';

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [SearchValue, setSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFetching, setFetchingCheck] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, src: '', alt: '' });

  const hendleSubmitForm = useCallback(
    async value => {
      if (SearchValue === value) {
        return;
      }
      let inputValue = '';
      let page = 0;

      if (typeof value === 'string' && SearchValue !== value) {
        setCurrentPage(1);
        setSearchValue(value);
        page = 1;
        inputValue = value;
        console.log('inputValue', inputValue);
        console.log('page', page);
        console.log('currentPage ', currentPage);
      } else {
        page = currentPage;
        inputValue = SearchValue;
      }

      setFetchingCheck(true);
      try {
        const { hits } = await searchPhotoApi(inputValue, page);
        console.log('currentPage', currentPage); //ЗАПИТ НА СЕРВЕР

        if (page === 1) {
          setImages(hits);
        } else {
          setImages(prevState => [...prevState, ...hits]);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage(error.message);
      } finally {
        setCurrentPage(prevState => prevState + 1);
        setFetchingCheck(false);
      }
    },
    [SearchValue, currentPage]
  );

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
        handleLoadMoreBtn={hendleSubmitForm}
      />

      {modal.isOpen && (
        <Modal closeModal={handleCloseModal} src={modal.src} alt={modal.alt} />
      )}
    </div>
  );
};

export default App;
