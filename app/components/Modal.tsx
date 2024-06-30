"use client";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

/**
 * The Modal component is a functional component in TypeScript React that renders a modal box with a
 * close button and children components.
 * @param  - - `modalOpen`: a boolean value indicating whether the modal is open or not
 * @returns The Modal component is being returned.
 */
const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <label
          htmlFor="my-modal-3"
          onClick={() => setModalOpen(false)}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        {children}
      </div>
    </div>
  );
};

export default Modal;
