import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Formik } from "formik";
import FirmModalForm,{firmSchema} from "./FirmModalForm";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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

const FirmModal = () => {
  const { createFirm } = useStockRequest();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained"  onClick={handleOpen} sx={{boxShadow: "2px 2px 5px black" }}>New Firm</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         
          <IconButton aria-label="close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
          <Formik
            initialValues={{
              name: "",
              phone: "",
              address: "",
              image: "",
            }}
            validationSchema={firmSchema}
            onSubmit={(values, actions) => {
              createFirm(values);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
            component={(props) => <FirmModalForm {...props} />}
          ></Formik>
        </Box>
      </Modal>
    </div>
  );
};
export default FirmModal;
