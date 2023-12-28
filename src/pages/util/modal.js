import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ children, titleModal, closeCustomModal, save }) {

  return ReactDOM.createPortal(
    <article className="modal">
      <section>        
        {children}
      </section>
      <div className="modal-bg">
      </div>
    </article>,
    document.getElementById('modal')
  );
}

export { Modal };
