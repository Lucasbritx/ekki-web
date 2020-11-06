/* eslint-disable jsx-a11y/control-has-associated-label */
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';

interface IModal {
  title: string;
  text: string;
  showModal?: boolean;
  textButton: string;
  children: any;
}

const ModalBody = styled.div`
max-height: 85vh;
overflow-y: scroll;
`;

const ModalStructure = (props: IModal): JSX.Element => {
  const {
    title, text, children, textButton, showModal,
  } = props;

  const [show, setShow] = useState(false);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {textButton}
      </Button>

      <Modal
        size="sm"
        show={show || showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          {title}
        </Modal.Header>
        <ModalBody>
          {text}
          {children}
        </ModalBody>
      </Modal>
    </>
  );
};

ModalStructure.propTypes = {
  title: PropTypes.string.isRequired,
  showModal: PropTypes.bool,
  text: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object,
  textButton: PropTypes.string.isRequired,
};

ModalStructure.defaultProps = {
  text: '',
  children: null,
  showModal: false,
};

export default ModalStructure;