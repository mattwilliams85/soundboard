import React from 'react';
import styles from './styles.module.scss';

const Modal = props => {
  const { children, onOverlayClick } = props;

  return (
    <>
      <div className={styles.overlay} onClick={onOverlayClick} />
      <div className={styles.modal}>{children}</div>
    </>
  );
};

export default Modal;
