import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalBackdrop, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = { children: PropTypes.node.isRequired };

  state = { show: true };

  toggleModal = () => {
    this.setState(prevState => ({ show: !prevState.show }));
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.setState({ show: false });
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.setState({ show: false });
    }
  };

  render() {
    if (this.state.show === true) {
      return createPortal(
        <ModalBackdrop onClick={this.handleBackdropClick}>
          <ModalContent>{this.props.children}</ModalContent>
        </ModalBackdrop>,
        modalRoot,
      );
    } else {
      return <></>;
    }
  }
}
