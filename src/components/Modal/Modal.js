import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalBackdrop, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [show]);

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      setShow(false);
    }
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      setShow(false);
    }
  };

  if (show === true) {
    return createPortal(
      <ModalBackdrop onClick={handleBackdropClick}>
        <ModalContent>{children}</ModalContent>
      </ModalBackdrop>,
      modalRoot
    );
  } else {
    return <></>;
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
