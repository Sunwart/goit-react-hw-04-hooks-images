import PropTypes from 'prop-types';
import { ImageGalleryContainer } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import propTypes from 'prop-types';

function ImageGallery({ images }) {
  return (
    <ImageGalleryContainer>
      {images.map(({ id, preview, img, alt }) => (
        <ImageGalleryItem key={id} preview={preview} img={img} alt={alt} />
      ))}
    </ImageGalleryContainer>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      preview: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
  ),
};
