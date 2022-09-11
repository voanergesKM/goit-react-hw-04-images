import { Component } from 'react';

import { Modal } from 'components/Modal/Modal';
import {
  StyledGalleryImage,
  StyledGalleryItem,
} from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  handleToggleModal = () => {
    this.setState(prev => ({
      isModalOpen: !prev.isModalOpen,
    }));
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.handleToggleModal();
    }
  };

  render() {
    const { image } = this.props;
    return (
      <>
        <StyledGalleryItem onClick={this.handleToggleModal}>
          <StyledGalleryImage src={image.webformatURL} alt={image.tags} />
        </StyledGalleryItem>
        {this.state.isModalOpen && (
          <Modal onClose={this.handleToggleModal}>
            <img src={image.largeImageURL} alt={image.tags} />
          </Modal>
        )}
      </>
    );
  }
}
