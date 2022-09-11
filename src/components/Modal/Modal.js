import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, StyledModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscPress);
  }

  handleEscPress = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <StyledModal>{this.props.children}</StyledModal>
      </Backdrop>,
      modalRoot
    );
  }
}
