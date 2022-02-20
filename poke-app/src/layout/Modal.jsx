import ReactDOM from "react-dom";
import styles from './Modal.module.css'

function Modal({ children, toggleModal }) {

    
  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={toggleModal}></div>
      <div className={styles.modal}>{children}</div>
    </>,
    document.getElementById("overlay")
  );
}

export default Modal;
