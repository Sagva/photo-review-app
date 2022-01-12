import Button from "@restart/ui/esm/Button";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function ModalWindow(props) {
  const { booleanValue, toggleBoolean, message } = props.modalValues;
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const handleClick = () => {
    toggleBoolean(false);
    if (!currentUser) {
      //on close modal window after the client sends to the photographer chosen photos, redirect to login page
      navigate(`/login`);
    }
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
