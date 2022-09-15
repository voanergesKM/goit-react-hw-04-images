import { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import {
  StyledGalleryImage,
  StyledGalleryItem,
  ModalImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <StyledGalleryItem onClick={() => setIsModalOpen(true)}>
        <StyledGalleryImage src={image.webformatURL} alt={image.tags} />
      </StyledGalleryItem>
      {isModalOpen && (
        <Modal onToggle={() => setIsModalOpen(false)}>
          <ModalImage src={image.largeImageURL} alt={image.tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
