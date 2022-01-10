import Button from "@restart/ui/esm/Button";
import React from "react";
import Modal from "react-bootstrap/Modal";

function ModalWindow(props) {
  const { booleanValue, toggleBoolean, message } = props.modalValues;

  const handleClick = () => {
    toggleBoolean(false);
  };
  return (
    <>
      <Modal
        show={booleanValue}
        onHide={() => toggleBoolean(false)}
        animation={false}
      >
        <Modal.Body>
          <h5>{message.title}</h5>
          <p>{message.text}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => handleClick()}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalWindow;
