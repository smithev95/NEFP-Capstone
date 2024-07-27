import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';

function LoginModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return (
    <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <Form>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Username"
                        className="mb-3"
                        autoFocus
                    >
                        <Form.Control type="text" placeholder="Username" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" href="/admin" onClick={handleClose}>
                    Sign-in
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default LoginModal;