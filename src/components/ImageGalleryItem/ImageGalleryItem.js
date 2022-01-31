import { ImageGalleryItemLi, ImageGalleryItemImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { render } from '@testing-library/react';

function ImageGalleryItem({ preview, alt, img }) {
  return (
    <ImageGalleryItemLi>
      <ImageGalleryItemImage
        src={preview}
        alt={alt}
        onClick={() => {
          render(
            <Modal>
              <img src={img} alt={alt} />
            </Modal>,
          );
        }}
      />
    </ImageGalleryItemLi>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  preview: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
