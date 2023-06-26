import React, { Component } from 'react';
import { searchPhotoApi } from 'helpers/api';
import style from '../components/App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    SearchValue: '',
    errorMessage: '',
    isFetching: false,
    modal: { isOpen: false, src: '', alt: '' },
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.SearchValue !== this.state.SearchValue
    ) {
      this.requestListImages(this.state.SearchValue, this.state.currentPage);
    }
  }

  requestListImages = async (SearchValue, currentPage) => {
    this.setState(() => ({ isFetching: true }));
    try {
      const { hits } = await searchPhotoApi(SearchValue, currentPage); //ЗАПИТ НА СЕРВЕР
      if (currentPage === 1) {
        this.setState(() => ({ images: hits }));
      } else {
        this.setState(state => ({
          images: [...state.images, ...hits],
        }));
      }
    } catch (error) {
      this.setState(() => ({ errorMessage: error.message }));
    } finally {
      this.setState(() => ({ isFetching: false }));
    }
  };

  hendleSubmitForm = nameFromForm => {
    this.setState({ SearchValue: nameFromForm }); //   CHANGE STATE
  };

  handleLoadMoreBtn = () => {
    this.setState(state => ({ currentPage: state.currentPage + 1 })); //PAGINATION
  };

  handleOpenModal = (src, alt) => {
    this.setState({ modal: { isOpen: true, src, alt } });
  };

  handleCloseModal = () => {
    this.setState(() => ({ modal: { isOpen: false, src: '', alt: '' } }));
  };

  render() {
    const {
      images,
      errorMessage,
      isFetching,
      currentPage,
      modal: { src, alt },
    } = this.state;

    return (
      <div className={style.App}>
        <Searchbar onSubmit={this.hendleSubmitForm} />
        <ImageGallery
          error={errorMessage}
          isFetching={isFetching}
          images={images}
          openFullScreenMode={this.handleOpenModal}
          currentPage={currentPage}
          handleLoadMoreBtn={this.handleLoadMoreBtn}
        />

        {this.state.modal.isOpen && (
          <Modal closeModal={this.handleCloseModal} src={src} alt={alt} />
        )}
      </div>
    );
  }
}

export default App;
