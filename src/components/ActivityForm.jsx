import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import usePost from "../hooks/usePost";

const ActivityForm = ({ showModal, setShowModal, refetch, urlAPI }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const { postData, loading, error } = usePost(urlAPI);

  const handleClose = () => {
    setShowModal(false);
    setTitle("");
    setDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (title === "" || description === "") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Empty field',
        });
      } else {
        const response = await postData({ title, description });
        if (response){
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Activity added successfully',
          });
          handleClose();
          refetch();
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ActivityForm;