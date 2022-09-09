import {
  StyledGalleryImage,
  StyledGalleryItem,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  return (
    <StyledGalleryItem>
      <StyledGalleryImage src={image.webformatURL} alt={image.tags} />
    </StyledGalleryItem>
  );
};
