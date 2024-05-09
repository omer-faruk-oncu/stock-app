import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";
import FirmModalForm, { firmSchema } from "./FirmModalForm";
import useStockRequest from "../services/useStockRequest";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditFirmModal = ({ firm, open, setOpen }) => {
  const { updateFirm } = useStockRequest();

  const initialValues = {
    name: firm.name,
    phone: firm.phone,
    address: firm.address,
    image: firm.image,
  };

  const handleSave = (values, actions) => {
    updateFirm(firm._id, values);
    actions.setSubmitting(false);
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="edit-firm-modal-title"
      aria-describedby="edit-firm-modal-description"
    >
      <Box sx={style}>
        <IconButton aria-label="close" onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
        <Formik
          initialValues={initialValues}
          validationSchema={firmSchema}
          onSubmit={handleSave}
          component={(props) => <FirmModalForm {...props} isEditing={true} />}
        />
      </Box>
    </Modal>
  );
};

export default EditFirmModal;
